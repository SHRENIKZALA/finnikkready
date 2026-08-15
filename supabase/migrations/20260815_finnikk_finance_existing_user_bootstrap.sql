create or replace function public.ensure_finance_workspace()
returns uuid language plpgsql security definer set search_path = public as $$
declare tenant uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select tenant_id into tenant from public.finance_memberships where user_id = auth.uid() limit 1;
  if tenant is not null then return tenant; end if;
  insert into public.finance_tenants (owner_user_id, name)
  values (auth.uid(), coalesce(nullif(auth.jwt()->'user_metadata'->>'full_name',''), split_part(auth.jwt()->>'email','@',1)) || ' Business')
  on conflict (owner_user_id) do update set updated_at = now()
  returning id into tenant;
  insert into public.finance_memberships (tenant_id, user_id, role) values (tenant, auth.uid(), 'owner') on conflict do nothing;
  return tenant;
end;
$$;
revoke all on function public.ensure_finance_workspace() from public;
grant execute on function public.ensure_finance_workspace() to authenticated;
