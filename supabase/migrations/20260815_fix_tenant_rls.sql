DROP POLICY IF EXISTS "tenant members can view tenants" ON public."Tenants";

CREATE POLICY "tenant members can view tenants"
ON public."Tenants"
FOR SELECT
TO authenticated
USING (public.has_tenant_access(id));

GRANT EXECUTE ON FUNCTION public.has_tenant_access(uuid) TO authenticated;
