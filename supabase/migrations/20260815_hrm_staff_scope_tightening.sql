-- Tighten staff visibility to only assigned project/client context.
-- No existing records are altered.

DROP POLICY IF EXISTS "hrm staff view projects" ON public."Projects";
CREATE POLICY "hrm staff view assigned projects"
  ON public."Projects"
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1
    FROM public."Allocations" allocation
    WHERE allocation.project_id = "Projects".id
      AND allocation.tenant_id = "Projects".tenant_id
      AND allocation.employee_id = public.get_tenant_employee_id("Projects".tenant_id)
      AND allocation.is_deleted = false
  ));

DROP POLICY IF EXISTS "hrm staff view clients" ON public."Clients";
CREATE POLICY "hrm staff view assigned clients"
  ON public."Clients"
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1
    FROM public."Projects" project
    JOIN public."Allocations" allocation ON allocation.project_id = project.id
    WHERE project.client_id = "Clients".id
      AND project.tenant_id = "Clients".tenant_id
      AND allocation.tenant_id = "Clients".tenant_id
      AND allocation.employee_id = public.get_tenant_employee_id("Clients".tenant_id)
      AND allocation.is_deleted = false
  ));
