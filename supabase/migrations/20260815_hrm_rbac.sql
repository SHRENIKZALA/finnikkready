-- FinniKK HRM role-based access control
-- This migration changes authorization metadata and policies only.
-- Existing HRM records are not updated or deleted here.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'hrm_member_role'
  ) THEN
    CREATE TYPE public.hrm_member_role AS ENUM ('admin', 'staff');
  END IF;
END
$$;

ALTER TABLE public."UserTenants"
  ADD COLUMN IF NOT EXISTS role public.hrm_member_role NOT NULL DEFAULT 'staff';

ALTER TABLE public."UserTenants"
  ADD COLUMN IF NOT EXISTS employee_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public."UserTenants"'::regclass
      AND conname = 'UserTenants_employee_id_fkey'
  ) THEN
    ALTER TABLE public."UserTenants"
      ADD CONSTRAINT "UserTenants_employee_id_fkey"
      FOREIGN KEY (employee_id)
      REFERENCES public."Employees" (id)
      ON DELETE SET NULL;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS "UserTenants_tenant_id_idx"
  ON public."UserTenants" (tenant_id);

CREATE INDEX IF NOT EXISTS "UserTenants_employee_id_idx"
  ON public."UserTenants" (employee_id)
  WHERE employee_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "UserTenants_tenant_employee_unique_idx"
  ON public."UserTenants" (tenant_id, employee_id)
  WHERE employee_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.has_tenant_access(target_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public."UserTenants" membership
    WHERE membership.user_id = auth.uid()
      AND membership.tenant_id = target_tenant_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_tenant_admin(target_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public."UserTenants" membership
    WHERE membership.user_id = auth.uid()
      AND membership.tenant_id = target_tenant_id
      AND membership.role = 'admin'::public.hrm_member_role
  );
$$;

CREATE OR REPLACE FUNCTION public.get_tenant_employee_id(target_tenant_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT membership.employee_id
  FROM public."UserTenants" membership
  WHERE membership.user_id = auth.uid()
    AND membership.tenant_id = target_tenant_id
    AND membership.role = 'staff'::public.hrm_member_role
    AND membership.employee_id IS NOT NULL
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_any_tenant_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public."UserTenants" membership
    WHERE membership.user_id = auth.uid()
      AND membership.role = 'admin'::public.hrm_member_role
  );
$$;

ALTER FUNCTION public.has_tenant_access(uuid) OWNER TO postgres;
ALTER FUNCTION public.is_tenant_admin(uuid) OWNER TO postgres;
ALTER FUNCTION public.get_tenant_employee_id(uuid) OWNER TO postgres;
ALTER FUNCTION public.is_any_tenant_admin() OWNER TO postgres;

REVOKE ALL ON FUNCTION public.has_tenant_access(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.is_tenant_admin(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.get_tenant_employee_id(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.is_any_tenant_admin() FROM anon;

GRANT EXECUTE ON FUNCTION public.has_tenant_access(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_tenant_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tenant_employee_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_any_tenant_admin() TO authenticated;

-- Remove the original tenant-member CRUD policies from all HRM tables.
DO $$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'Tenants', 'UserTenants', 'Employees', 'Clients', 'Projects',
        'Departments', 'EmployeeDepartments', 'Knowledges',
        'EmployeeKnowledges', 'ProjectKnowledges', 'Allocations',
        'Positions', 'ContractTypes', 'EmployeeContracts',
        'PublicHolidays', 'WorkScheduleTypes', 'WorkLogs', 'Payslips',
        'LeadSources', 'LeadStages', 'Leads', 'LeadStageHistory',
        'LeadActivities', 'LeadDocuments', 'LeadFollowUps',
        'LeadConversions'
      )
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  END LOOP;
END
$$;

-- Memberships: users see their own membership; administrators manage their tenant memberships.
CREATE POLICY "hrm members view own membership"
  ON public."UserTenants"
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "hrm admins manage memberships"
  ON public."UserTenants"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

-- Tenant directory is visible only to members of that tenant.
CREATE POLICY "hrm members view their tenants"
  ON public."Tenants"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(id));

-- Employee records: administrators see all; staff see only their linked profile.
CREATE POLICY "hrm admins manage employees"
  ON public."Employees"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view own employee"
  ON public."Employees"
  FOR SELECT TO authenticated
  USING (id = public.get_tenant_employee_id(tenant_id));

-- Reference data: staff may read only records belonging to a tenant they belong to.
CREATE POLICY "hrm admins manage clients"
  ON public."Clients"
  FOR ALL TO authenticated
  USING (tenant_id IS NOT NULL AND public.is_tenant_admin(tenant_id))
  WITH CHECK (tenant_id IS NOT NULL AND public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view clients"
  ON public."Clients"
  FOR SELECT TO authenticated
  USING (tenant_id IS NOT NULL AND public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage projects"
  ON public."Projects"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view projects"
  ON public."Projects"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage departments"
  ON public."Departments"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view departments"
  ON public."Departments"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage knowledges"
  ON public."Knowledges"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view knowledges"
  ON public."Knowledges"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage positions"
  ON public."Positions"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view positions"
  ON public."Positions"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage contract types"
  ON public."ContractTypes"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view contract types"
  ON public."ContractTypes"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage public holidays"
  ON public."PublicHolidays"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view public holidays"
  ON public."PublicHolidays"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

CREATE POLICY "hrm admins manage work schedules"
  ON public."WorkScheduleTypes"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view work schedules"
  ON public."WorkScheduleTypes"
  FOR SELECT TO authenticated
  USING (public.has_tenant_access(tenant_id));

-- Relationship tables: staff can inspect only their own employee relationships.
CREATE POLICY "hrm admins manage employee departments"
  ON public."EmployeeDepartments"
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public."Employees" employee
    WHERE employee.id = employee_id
      AND public.is_tenant_admin(employee.tenant_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public."Employees" employee
    WHERE employee.id = employee_id
      AND public.is_tenant_admin(employee.tenant_id)
  ));

CREATE POLICY "hrm staff view own employee departments"
  ON public."EmployeeDepartments"
  FOR SELECT TO authenticated
  USING (employee_id = public.get_tenant_employee_id((
    SELECT employee.tenant_id FROM public."Employees" employee WHERE employee.id = employee_id
  )));

CREATE POLICY "hrm admins manage employee knowledges"
  ON public."EmployeeKnowledges"
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public."Employees" employee
    WHERE employee.id = employee_id
      AND public.is_tenant_admin(employee.tenant_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public."Employees" employee
    WHERE employee.id = employee_id
      AND public.is_tenant_admin(employee.tenant_id)
  ));

CREATE POLICY "hrm staff view own employee knowledges"
  ON public."EmployeeKnowledges"
  FOR SELECT TO authenticated
  USING (employee_id = public.get_tenant_employee_id((
    SELECT employee.tenant_id FROM public."Employees" employee WHERE employee.id = employee_id
  )));

CREATE POLICY "hrm admins manage project knowledges"
  ON public."ProjectKnowledges"
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public."Projects" project
    WHERE project.id = project_id
      AND public.is_tenant_admin(project.tenant_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public."Projects" project
    WHERE project.id = project_id
      AND public.is_tenant_admin(project.tenant_id)
  ));

CREATE POLICY "hrm staff view project knowledges"
  ON public."ProjectKnowledges"
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public."Projects" project
    WHERE project.id = project_id
      AND public.has_tenant_access(project.tenant_id)
  ));

-- Staff may read only their own sensitive employment records.
CREATE POLICY "hrm admins manage employee contracts"
  ON public."EmployeeContracts"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view own employee contracts"
  ON public."EmployeeContracts"
  FOR SELECT TO authenticated
  USING (employee_id = public.get_tenant_employee_id(tenant_id));

CREATE POLICY "hrm admins manage allocations"
  ON public."Allocations"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view own allocations"
  ON public."Allocations"
  FOR SELECT TO authenticated
  USING (employee_id = public.get_tenant_employee_id(tenant_id));

CREATE POLICY "hrm admins manage work logs"
  ON public."WorkLogs"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view own work logs"
  ON public."WorkLogs"
  FOR SELECT TO authenticated
  USING (employee_id = public.get_tenant_employee_id(tenant_id));

CREATE POLICY "hrm staff submit own pending work logs"
  ON public."WorkLogs"
  FOR INSERT TO authenticated
  WITH CHECK (
    employee_id = public.get_tenant_employee_id(tenant_id)
    AND public.has_tenant_access(tenant_id)
    AND status = 'pending'
    AND approved_by IS NULL
    AND approved_at IS NULL
  );

CREATE POLICY "hrm admins manage payslips"
  ON public."Payslips"
  FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm staff view own payslips"
  ON public."Payslips"
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1
    FROM public."EmployeeContracts" contract
    WHERE contract.id = contract_id
      AND contract.tenant_id = tenant_id
      AND contract.employee_id = public.get_tenant_employee_id(tenant_id)
  ));

-- CRM and its reference/audit tables are administrator-only.
CREATE POLICY "hrm admins manage lead sources"
  ON public."LeadSources" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage lead stages"
  ON public."LeadStages" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage leads"
  ON public."Leads" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage lead histories"
  ON public."LeadStageHistory" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage lead activities"
  ON public."LeadActivities" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage lead documents"
  ON public."LeadDocuments" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage lead followups"
  ON public."LeadFollowUps" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

CREATE POLICY "hrm admins manage lead conversions"
  ON public."LeadConversions" FOR ALL TO authenticated
  USING (public.is_tenant_admin(tenant_id))
  WITH CHECK (public.is_tenant_admin(tenant_id));

-- Lead document storage is restricted to administrator accounts. Existing objects remain intact.
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "authenticated staff can manage lead files" ON storage.objects;

CREATE POLICY "hrm admins manage lead file storage"
  ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'lead-documents' AND public.is_any_tenant_admin())
  WITH CHECK (bucket_id = 'lead-documents' AND public.is_any_tenant_admin());
