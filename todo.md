# Product Extension TODO

- [x] Inspect the existing Finnikkready Next.js routes, public navigation, Supabase integration, and HRM boundaries before merging the finance product.
- [x] Define a conflict-free `/products/finance` public route and `/finance` authenticated application namespace that preserve existing `/hrm` behavior.
- [x] Reuse the existing Finnikk brand system while creating original finance-product landing content inspired only by the reference site’s section structure.
- [ ] Port the FinniKK finance product interface, GST invoice workflow, contacts, catalog, expenses, reports, and onboarding screens into the Finnikkready codebase.
- [x] Align authentication, tenant provisioning, and data isolation with the existing Finnikkready Supabase architecture without exposing or altering HRM data.
- [x] Use the existing Supabase PostgreSQL project as the sole finance-product database, with finance data isolated from HRM tables through separate schemas and row-level security.
- [x] Retain Supabase PostgreSQL rather than add Neon, so the Finance extension uses the existing Finnikkready authentication and tenant-security architecture.
- [x] Restyle all Finance marketing and workspace surfaces to use the original Finnikkready visual language, including its navy-blue-teal palette, typography, spacing, navigation behavior, and branded composition.
- [x] Add a public Finnikk navigation link and product CTA path for the Finance product extension.
- [x] Validate production builds, finance routes, existing public pages, and HRM routes after the merge.
- [ ] Publish the merged FinniKK Finance extension to `SHRENIKZALA/finnikkready` and trigger the associated live-site deployment.
