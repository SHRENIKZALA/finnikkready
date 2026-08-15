-- Restrict security-definer authorization helpers to signed-in sessions.
-- PUBLIC has default EXECUTE on functions unless explicitly revoked.

REVOKE ALL ON FUNCTION public.has_tenant_access(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_tenant_admin(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_tenant_employee_id(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_any_tenant_admin() FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.has_tenant_access(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_tenant_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tenant_employee_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_any_tenant_admin() TO authenticated;
