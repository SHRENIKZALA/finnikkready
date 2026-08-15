create schema if not exists private;

create table if not exists public.finance_tenants (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  business_state_code text not null default '24' check (business_state_code ~ '^[0-9]{2}$'),
  gstin text,
  pan text,
  address jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_memberships (
  tenant_id uuid not null references public.finance_tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','member')),
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create table if not exists public.finance_contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.finance_tenants(id) on delete cascade,
  name text not null,
  contact_type text not null check (contact_type in ('client','vendor','both')),
  gstin text,
  pan text,
  email text,
  phone text,
  address jsonb not null default '{}'::jsonb,
  state_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists public.finance_products (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.finance_tenants(id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('product','service')),
  hsn_sac text,
  unit text not null default 'Unit',
  unit_price numeric(14,2) not null default 0,
  gst_rate numeric(5,2) not null default 0 check (gst_rate between 0 and 40),
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists public.finance_invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.finance_tenants(id) on delete cascade,
  client_id uuid references public.finance_contacts(id) on delete set null,
  invoice_number text not null,
  invoice_date date not null default current_date,
  place_of_supply text not null,
  status text not null default 'draft' check (status in ('draft','sent','paid')),
  taxable_amount numeric(14,2) not null default 0,
  cgst_amount numeric(14,2) not null default 0,
  sgst_amount numeric(14,2) not null default 0,
  igst_amount numeric(14,2) not null default 0,
  total_amount numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  unique (tenant_id, invoice_number)
);

create table if not exists public.finance_invoice_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.finance_tenants(id) on delete cascade,
  invoice_id uuid not null references public.finance_invoices(id) on delete cascade,
  product_id uuid references public.finance_products(id) on delete set null,
  description text not null,
  hsn_sac text,
  quantity numeric(14,2) not null default 1,
  unit text not null default 'Unit',
  unit_price numeric(14,2) not null default 0,
  gst_rate numeric(5,2) not null default 0,
  taxable_amount numeric(14,2) not null default 0,
  cgst_amount numeric(14,2) not null default 0,
  sgst_amount numeric(14,2) not null default 0,
  igst_amount numeric(14,2) not null default 0,
  total_amount numeric(14,2) not null default 0
);

create table if not exists public.finance_expenses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.finance_tenants(id) on delete cascade,
  vendor_id uuid references public.finance_contacts(id) on delete set null,
  expense_date date not null default current_date,
  category text not null,
  description text not null,
  amount numeric(14,2) not null,
  gst_rate numeric(5,2) not null default 0,
  input_cgst numeric(14,2) not null default 0,
  input_sgst numeric(14,2) not null default 0,
  input_igst numeric(14,2) not null default 0,
  receipt_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function private.finance_tenant_id()
returns uuid language sql stable security definer set search_path = public, private as $$
  select tenant_id from public.finance_memberships where user_id = auth.uid() order by created_at asc limit 1
$$;

revoke all on function private.finance_tenant_id() from public;
grant usage on schema private to authenticated;
grant execute on function private.finance_tenant_id() to authenticated;

create or replace function public.provision_finance_workspace()
returns trigger language plpgsql security definer set search_path = public as $$
declare new_tenant uuid;
begin
  insert into public.finance_tenants (owner_user_id, name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(new.email,'@',1)) || ' Business')
  on conflict (owner_user_id) do update set updated_at = now()
  returning id into new_tenant;
  insert into public.finance_memberships (tenant_id, user_id, role)
  values (new_tenant, new.id, 'owner') on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists provision_finance_workspace_on_auth_user on auth.users;
create trigger provision_finance_workspace_on_auth_user after insert on auth.users for each row execute function public.provision_finance_workspace();

do $$ declare tbl text;
begin
  foreach tbl in array array['finance_memberships','finance_contacts','finance_products','finance_invoices','finance_invoice_items','finance_expenses'] loop
    execute format('alter table public.%I enable row level security', tbl);
    execute format('drop policy if exists finance_tenant_access on public.%I', tbl);
    execute format('create policy finance_tenant_access on public.%I for all to authenticated using (tenant_id = private.finance_tenant_id()) with check (tenant_id = private.finance_tenant_id())', tbl);
  end loop;
end $$;

drop policy if exists finance_tenants_access on public.finance_tenants;
create policy finance_tenants_access on public.finance_tenants for all to authenticated using (id = private.finance_tenant_id()) with check (id = private.finance_tenant_id());
