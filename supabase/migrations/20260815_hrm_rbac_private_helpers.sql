-- Keep RLS authorization helpers out of the exposed public API schema.
-- Policies continue to use the same function objects after SET SCHEMA.

CREATE SCHEMA IF NOT EXISTS private;
ALTER SCHEMA private OWNER TO postgres;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

ALTER FUNCTION public.has_tenant_access(uuid) SET SCHEMA private;
ALTER FUNCTION public.is_tenant_admin(uuid) SET SCHEMA private;
ALTER FUNCTION public.get_tenant_employee_id(uuid) SET SCHEMA private;
ALTER FUNCTION public.is_any_tenant_admin() SET SCHEMA private;

REVOKE ALL ON FUNCTION private.has_tenant_access(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_tenant_admin(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.get_tenant_employee_id(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_any_tenant_admin() FROM PUBLIC;

GRANT EXECUTE ON FUNCTION private.has_tenant_access(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_tenant_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION private.get_tenant_employee_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_any_tenant_admin() TO authenticated;
