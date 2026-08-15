# FinniKK Website and HRM Staff Workspace

FinniKK is a Next.js website for financial advisory, tax consulting, litigation, corporate governance, and business advisory services. The repository also contains a protected human-resource-management workspace for authorized staff.

## What is included

The public website remains available at `/` with the existing FinniKK visual language, service pages, leadership content, contact journeys, and responsive navigation. The public navigation includes a **Staff Login** entry that opens `/hrm/auth/signin`.

The protected HRM portal is available under `/hrm`. It includes employee, department, contract, work-log, payslip, project, client, lead, allocation, knowledge, position, work-schedule, and public-holiday management. All HRM routes require a Supabase-authenticated staff account that belongs to a tenant workspace.

## Technology

The application uses Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Supabase Auth, Supabase PostgreSQL, and Supabase Storage. The HRM code is isolated under `src/app/hrm`, `src/components/hrm`, and `src/utils/hrm` so it can extend the public website without replacing the Finnikk site shell.

## Local development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Create `.env.local` from `.env.example` and provide the Supabase project URL and public anon or publishable key. The local environment file is ignored by Git and must never be committed.

## Staff access

Use `/hrm/auth/signup` to create a staff account or `/hrm/auth/signin` to access the portal. New accounts must confirm their email before signing in. The first FinniKK staff account is linked to the free `FinniKK` tenant by the database provisioning migration. Additional staff users must be inserted into `UserTenants` by an administrator after their Supabase Auth account is confirmed.

## Supabase database

The migration files in `supabase/migrations` create the HRM schema, the `lead-documents` storage bucket, tenant membership, helper functions, and row-level security policies. The primary migration is `20260815_finnikk_hrm_schema.sql`; `20260815_fix_tenant_rls.sql` corrects tenant visibility for authenticated memberships.

The schema is tenant-scoped. Staff can only read or change HRM records belonging to a tenant listed in `UserTenants` for their authenticated Supabase user. The free Supabase tier is sufficient for the current setup; no paid-only Supabase feature is required by the application.

## Production deployment

Configure these variables in the deployment provider:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-or-publishable-key
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

Set the Supabase Auth Site URL and redirect URLs to the production domain, including `/hrm/auth/signin` and the password reset callback `/hrm/auth/reset-password`. Do not add service-role keys to frontend or public repository variables.

## Repository structure

```text
src/app/                  Public Next.js routes and the /hrm portal routes
src/components/           Public FinniKK components
src/components/hrm/       HRM dashboard, forms, navigation, and UI primitives
src/utils/hrm/            Supabase clients, tenant context, queries, and helpers
supabase/migrations/      HRM schema and RLS migrations
public/                   Existing FinniKK visual assets and brand files
```

## License

MIT
