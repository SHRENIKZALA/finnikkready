create extension if not exists pgcrypto;

create table
  public."Tenants" (
    id uuid not null default gen_random_uuid (),
    name character varying(255) not null,
    subdomain character varying(100) not null,
    plan character varying(50) not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    is_active boolean not null default true,
    is_deleted boolean not null default false,
    constraint tenants_pkey primary key (id),
    constraint unique_subdomain unique (subdomain)
  ) tablespace pg_default;

create table
  public."UserTenants" (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null,
    tenant_id uuid not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint usertenants_pkey primary key (id),
    constraint unique_user_tenant unique (user_id, tenant_id),
    constraint UserTenants_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade,
    constraint UserTenants_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create table
  public."Employees" (
    id uuid not null default gen_random_uuid (),
    company_email character varying(200) not null,
    personal_email character varying(200) not null,
    given_name character varying(150) not null,
    surname character varying(100) null,
    citizenship character varying(2) null,
    tax_residence character varying(2) null,
    location character varying(2) null,
    mobile_number character varying(50) null,
    home_address character varying(250) null,
    birth_date date null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    is_active boolean not null default true,
    is_deleted boolean not null default false,
    tenant_id uuid not null,
    constraint employees_pkey primary key (id),
    constraint Employees_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "Employees_tenant_id_idx" on public."Employees" using btree (tenant_id) tablespace pg_default;

create unique index if not exists idx_company_email on public."Employees" using btree (company_email) tablespace pg_default;

create table
  public."Clients" (
    id uuid not null default gen_random_uuid (),
    name character varying(255) not null,
    client_code character varying(8) not null,
    address character varying(255) null,
    postal_code character varying(8) null,
    country_code_iso_2 character varying(2) null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    is_active boolean not null default true,
    is_deleted boolean not null default false,
    tenant_id uuid null,
    constraint clients_pkey primary key (id),
    constraint Clients_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "Clients_tenant_id_idx" on public."Clients" using btree (tenant_id) tablespace pg_default;

create unique index if not exists idx_client_code on public."Clients" using btree (client_code) tablespace pg_default;

create unique index if not exists idx_name_country_code on public."Clients" using btree (name, country_code_iso_2) tablespace pg_default;

create table
  public."Projects" (
    id uuid not null default gen_random_uuid (),
    code character varying(50) not null,
    client_id uuid not null,
    currency character varying(6) null,
    contract_owner character varying(50) not null,
    start_date date null,
    end_date date null,
    name character varying(255) not null,
    deal_status text not null,
    billable boolean not null default false,
    engagement_manager_email character varying(255) not null,
    note text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    tenant_id uuid not null,
    constraint projects_pkey primary key (id),
    constraint Projects_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade,
    constraint client_fk foreign key (client_id) references "Clients" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "Projects_tenant_id_idx" on public."Projects" using btree (tenant_id) tablespace pg_default;

create unique index if not exists idx_code on public."Projects" using btree (code) tablespace pg_default;

create table
  public."Departments" (
    id uuid not null default gen_random_uuid (),
    name character varying(255) not null,
    parent_department_id uuid null,
    tenant_id uuid not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    is_active boolean not null default true,
    is_deleted boolean not null default false,
    constraint departments_pkey primary key (id),
    constraint unique_department_name_per_tenant unique (name, tenant_id),
    constraint departments_parent_department_id_fkey foreign key (parent_department_id) references "Departments" (id) on delete cascade,
    constraint departments_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "Departments_tenant_id_idx" on public."Departments" using btree (tenant_id) tablespace pg_default;

create index if not exists "Departments_parent_department_id_idx" on public."Departments" using btree (parent_department_id) tablespace pg_default;

create table
  public."EmployeeDepartments" (
    employee_id uuid not null,
    department_id uuid not null,
    assigned_at timestamp with time zone not null default now(),
    constraint employee_departments_pkey primary key (employee_id, department_id),
    constraint employee_departments_department_id_fkey foreign key (department_id) references "Departments" (id) on delete cascade,
    constraint employee_departments_employee_id_fkey foreign key (employee_id) references "Employees" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "EmployeeDepartments_department_id_idx" on public."EmployeeDepartments" using btree (department_id) tablespace pg_default;

create index if not exists "EmployeeDepartments_employee_id_idx" on public."EmployeeDepartments" using btree (employee_id) tablespace pg_default;

create table
  public."Knowledges" (
    id uuid not null default gen_random_uuid (),
    title character varying(255) not null,
    description text null,
    tenant_id uuid not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    is_active boolean not null default true,
    is_deleted boolean not null default false,
    constraint knowledges_pkey primary key (id),
    constraint unique_knowledge_title_per_tenant unique (title, tenant_id),
    constraint knowledges_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "Knowledges_tenant_id_idx" on public."Knowledges" using btree (tenant_id) tablespace pg_default;

create table
  public."EmployeeKnowledges" (
    employee_id uuid not null,
    knowledge_id uuid not null,
    acquired_at timestamp with time zone not null default now(),
    constraint employee_knowledges_pkey primary key (employee_id, knowledge_id),
    constraint employee_knowledges_employee_id_fkey foreign key (employee_id) references "Employees" (id) on delete cascade,
    constraint employee_knowledges_knowledge_id_fkey foreign key (knowledge_id) references "Knowledges" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "EmployeeKnowledges_employee_id_idx" on public."EmployeeKnowledges" using btree (employee_id) tablespace pg_default;

create index if not exists "EmployeeKnowledges_knowledge_id_idx" on public."EmployeeKnowledges" using btree (knowledge_id) tablespace pg_default;

create table
  public."ProjectKnowledges" (
    project_id uuid not null,
    knowledge_id uuid not null,
    assigned_at timestamp with time zone not null default now(),
    constraint project_knowledges_pkey primary key (project_id, knowledge_id),
    constraint project_knowledges_knowledge_id_fkey foreign key (knowledge_id) references "Knowledges" (id) on delete cascade,
    constraint project_knowledges_project_id_fkey foreign key (project_id) references "Projects" (id) on delete cascade
  ) tablespace pg_default;

create index if not exists "ProjectKnowledges_project_id_idx" on public."ProjectKnowledges" using btree (project_id) tablespace pg_default;

create index if not exists "ProjectKnowledges_knowledge_id_idx" on public."ProjectKnowledges" using btree (knowledge_id) tablespace pg_default;

create table
  public."Allocations" (
    id uuid not null default gen_random_uuid (),
    employee_id uuid not null,
    project_id uuid not null,
    start_date date not null,
    end_date date not null,
    allocation_percentage numeric(5, 2) not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    is_deleted boolean not null default false,
    tenant_id uuid not null,
    constraint allocations_pkey primary key (id),
    constraint Allocations_tenant_id_fkey foreign key (tenant_id) references "Tenants" (id) on delete cascade,
    constraint employee_fk foreign key (employee_id) references "Employees" (id) on delete cascade,
    constraint project_fk foreign key (project_id) references "Projects" (id) on delete cascade,
    constraint Allocations_allocation_percentage_check check (
      (
        (allocation_percentage > (0)::numeric)
        and (allocation_percentage <= (100)::numeric)
      )
    )
  ) tablespace pg_default;

create index if not exists "Allocations_tenant_id_idx" on public."Allocations" using btree (tenant_id) tablespace pg_default;

create index if not exists idx_employee_allocation on public."Allocations" using btree (employee_id, start_date, end_date) tablespace pg_default;

create index if not exists idx_project_allocation on public."Allocations" using btree (project_id, start_date, end_date) tablespace pg_default;


CREATE TABLE public."Positions" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  department_id uuid,
  level VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT true,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT positions_pkey PRIMARY KEY (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id),
  CONSTRAINT department_fk FOREIGN KEY (department_id) REFERENCES "Departments" (id)
);

CREATE TABLE public."ContractTypes" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  payment_type VARCHAR(20) NOT NULL, -- monthly, hourly, one_time
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT contract_types_pkey PRIMARY KEY (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

CREATE TABLE public."EmployeeContracts" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL,
  contract_type_id uuid NOT NULL,
  position_id uuid NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  base_salary DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  working_hours INTEGER, -- weekly working hours
  overtime_rate DECIMAL(4,2), -- e.g., 1.5 for 150%
  weekend_rate DECIMAL(4,2),
  holiday_rate DECIMAL(4,2),
  probation_period INTEGER, -- in months
  notice_period INTEGER, -- in months
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT employee_contracts_pkey PRIMARY KEY (id),
  CONSTRAINT employee_fk FOREIGN KEY (employee_id) REFERENCES "Employees" (id),
  CONSTRAINT contract_type_fk FOREIGN KEY (contract_type_id) REFERENCES "ContractTypes" (id),
  CONSTRAINT position_fk FOREIGN KEY (position_id) REFERENCES "Positions" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

CREATE TABLE public."PublicHolidays" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  name VARCHAR(100) NOT NULL,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT public_holidays_pkey PRIMARY KEY (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);


CREATE TABLE public."WorkScheduleTypes" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL, -- regular, weekend, holiday
  multiplier DECIMAL(4,2) NOT NULL, -- 1.0 for regular, 1.5 for overtime, 2.0 for holiday
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT work_schedule_types_pkey PRIMARY KEY (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

CREATE TABLE public."WorkLogs" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL,
  schedule_type_id uuid NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_duration INTEGER NOT NULL DEFAULT 0, -- in minutes
  description TEXT,
  status VARCHAR(20) NOT NULL, -- pending, approved, rejected
  approved_by uuid,
  approved_at TIMESTAMPTZ,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT work_logs_pkey PRIMARY KEY (id),
  CONSTRAINT employee_fk FOREIGN KEY (employee_id) REFERENCES "Employees" (id),
  CONSTRAINT schedule_type_fk FOREIGN KEY (schedule_type_id) REFERENCES "WorkScheduleTypes" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

CREATE TABLE public."Payslips" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  contract_id uuid NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  base_salary DECIMAL(12,2) NOT NULL,
  total_allowances DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_overtime DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_deductions DECIMAL(12,2) NOT NULL DEFAULT 0,
  net_salary DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL, -- draft, approved, paid
  payment_date DATE,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT payslips_pkey PRIMARY KEY (id),
  CONSTRAINT contract_fk FOREIGN KEY (contract_id) REFERENCES "EmployeeContracts" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

-- Lead Sources reference table
CREATE TABLE public."LeadSources" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT lead_sources_pkey PRIMARY KEY (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id),
  CONSTRAINT unique_lead_source_name UNIQUE (name, tenant_id)
);

-- Lead Stages for pipeline management
CREATE TABLE public."LeadStages" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT lead_stages_pkey PRIMARY KEY (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id),
  CONSTRAINT unique_stage_name UNIQUE (name, tenant_id),
  CONSTRAINT unique_stage_order UNIQUE (order_index, tenant_id)
);

-- Main Leads table
CREATE TABLE public."Leads" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  -- Company Information
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  website VARCHAR(255),
  employee_count_range VARCHAR(50),
  annual_revenue_range VARCHAR(50),
  
  -- Primary Contact
  contact_name VARCHAR(255) NOT NULL,
  contact_title VARCHAR(100),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  
  -- Lead Details
  source_id uuid NOT NULL,
  current_stage_id uuid NOT NULL,
  status VARCHAR(50) NOT NULL, -- new, contacted, qualified, unqualified
  score INTEGER DEFAULT 0,
  
  -- Assignment
  assigned_to uuid,
  last_contacted_at TIMESTAMPTZ,
  next_follow_up DATE,
  
  -- Additional Info
  notes TEXT,
  tags VARCHAR(255)[],
  
  -- System Fields
  is_converted BOOLEAN NOT NULL DEFAULT false,
  converted_to_client_id uuid,
  converted_at TIMESTAMPTZ,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  CONSTRAINT leads_pkey PRIMARY KEY (id),
  CONSTRAINT source_fk FOREIGN KEY (source_id) REFERENCES "LeadSources" (id),
  CONSTRAINT stage_fk FOREIGN KEY (current_stage_id) REFERENCES "LeadStages" (id),
  CONSTRAINT assigned_to_fk FOREIGN KEY (assigned_to) REFERENCES "Employees" (id),
  CONSTRAINT converted_to_client_fk FOREIGN KEY (converted_to_client_id) REFERENCES "Clients" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

-- Lead Stage History
CREATE TABLE public."LeadStageHistory" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL,
  from_stage_id uuid,
  to_stage_id uuid NOT NULL,
  changed_by uuid NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  time_in_previous_stage INTERVAL,
  notes TEXT,
  tenant_id uuid NOT NULL,
  
  CONSTRAINT lead_stage_history_pkey PRIMARY KEY (id),
  CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES "Leads" (id),
  CONSTRAINT from_stage_fk FOREIGN KEY (from_stage_id) REFERENCES "LeadStages" (id),
  CONSTRAINT to_stage_fk FOREIGN KEY (to_stage_id) REFERENCES "LeadStages" (id),
  -- CONSTRAINT changed_by_fk FOREIGN KEY (changed_by) REFERENCES "Employees" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);


-- Lead Activities
CREATE TABLE public."LeadActivities" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL,
  type VARCHAR(50) NOT NULL, -- email, call, meeting, note, task
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  activity_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  status VARCHAR(50), -- planned, completed, cancelled
  performed_by uuid NOT NULL,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  CONSTRAINT lead_activities_pkey PRIMARY KEY (id),
  CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES "Leads" (id),
  CONSTRAINT performed_by_fk FOREIGN KEY (performed_by) REFERENCES "Employees" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

-- Lead Documents
CREATE TABLE public."LeadDocuments" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL,
  name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_by uuid NOT NULL,
  tenant_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  CONSTRAINT lead_documents_pkey PRIMARY KEY (id),
  CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES "Leads" (id),
  CONSTRAINT uploaded_by_fk FOREIGN KEY (uploaded_by) REFERENCES "Employees" (id),
  CONSTRAINT tenant_fk FOREIGN KEY (tenant_id) REFERENCES "Tenants" (id)
);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'lead-documents');

-- Allow authenticated users to read files
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'lead-documents');

-- Allow authenticated users to delete files
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'lead-documents');

-- Lead follow-up workflow
CREATE TABLE public."LeadFollowUps" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES "Leads"(id) ON DELETE CASCADE,
  due_date TIMESTAMPTZ NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'overdue')),
  description TEXT NOT NULL,
  assigned_to UUID NOT NULL REFERENCES "Employees"(id),
  completed_at TIMESTAMPTZ,
  tenant_id UUID NOT NULL REFERENCES "Tenants"(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public."LeadConversions" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES "Leads"(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES "Clients"(id) ON DELETE CASCADE,
  converted_at TIMESTAMPTZ NOT NULL,
  converted_by UUID NOT NULL,
  deal_value DECIMAL(10,2),
  conversion_notes TEXT,
  tenant_id UUID NOT NULL REFERENCES "Tenants"(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lead_followups_lead_id ON "LeadFollowUps"(lead_id);
CREATE INDEX idx_lead_followups_assigned_to ON "LeadFollowUps"(assigned_to);
CREATE INDEX idx_lead_conversions_lead_id ON "LeadConversions"(lead_id);

-- Secure storage setup for lead documents.
INSERT INTO storage.buckets (id, name, public)
VALUES ('lead-documents', 'lead-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Tenant-aware authorization helper. SECURITY DEFINER prevents policy recursion.
CREATE OR REPLACE FUNCTION public.has_tenant_access(target_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public."UserTenants" membership
    WHERE membership.user_id = auth.uid()
      AND membership.tenant_id = target_tenant_id
  );
$$;

ALTER FUNCTION public.has_tenant_access(uuid) OWNER TO postgres;

-- RLS protects every HRM record by the tenant membership assigned to the signed-in user.
ALTER TABLE public."Tenants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."UserTenants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Employees" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Clients" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Projects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Departments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."EmployeeDepartments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Knowledges" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."EmployeeKnowledges" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProjectKnowledges" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Allocations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Positions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ContractTypes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."EmployeeContracts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."PublicHolidays" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."WorkScheduleTypes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."WorkLogs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Payslips" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadSources" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadStages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadStageHistory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadActivities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadDocuments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadFollowUps" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LeadConversions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenant members can view tenants" ON public."Tenants"
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public."UserTenants" membership WHERE membership.user_id = auth.uid() AND membership.tenant_id = id));

CREATE POLICY "users can view their memberships" ON public."UserTenants"
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "tenant members can manage employees" ON public."Employees"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage clients" ON public."Clients"
  FOR ALL TO authenticated USING (tenant_id IS NOT NULL AND public.has_tenant_access(tenant_id)) WITH CHECK (tenant_id IS NULL OR public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage projects" ON public."Projects"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage departments" ON public."Departments"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage knowledges" ON public."Knowledges"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage allocations" ON public."Allocations"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage positions" ON public."Positions"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage contract types" ON public."ContractTypes"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage employee contracts" ON public."EmployeeContracts"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage public holidays" ON public."PublicHolidays"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage work schedules" ON public."WorkScheduleTypes"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage work logs" ON public."WorkLogs"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage payslips" ON public."Payslips"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead sources" ON public."LeadSources"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead stages" ON public."LeadStages"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage leads" ON public."Leads"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead histories" ON public."LeadStageHistory"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead activities" ON public."LeadActivities"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead documents" ON public."LeadDocuments"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead followups" ON public."LeadFollowUps"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));
CREATE POLICY "tenant members can manage lead conversions" ON public."LeadConversions"
  FOR ALL TO authenticated USING (public.has_tenant_access(tenant_id)) WITH CHECK (public.has_tenant_access(tenant_id));

CREATE POLICY "tenant members can manage employee departments" ON public."EmployeeDepartments"
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public."Employees" e WHERE e.id = employee_id AND public.has_tenant_access(e.tenant_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM public."Employees" e WHERE e.id = employee_id AND public.has_tenant_access(e.tenant_id)));
CREATE POLICY "tenant members can manage employee knowledges" ON public."EmployeeKnowledges"
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public."Employees" e WHERE e.id = employee_id AND public.has_tenant_access(e.tenant_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM public."Employees" e WHERE e.id = employee_id AND public.has_tenant_access(e.tenant_id)));
CREATE POLICY "tenant members can manage project knowledges" ON public."ProjectKnowledges"
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public."Projects" p WHERE p.id = project_id AND public.has_tenant_access(p.tenant_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM public."Projects" p WHERE p.id = project_id AND public.has_tenant_access(p.tenant_id)));

CREATE POLICY "authenticated staff can manage lead files" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'lead-documents')
  WITH CHECK (bucket_id = 'lead-documents'); 