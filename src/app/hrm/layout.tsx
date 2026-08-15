import { TenantProvider } from '@/utils/hrm/tenant-context';
import { RoleGuard } from '@/components/hrm/layout/RoleGuard';
import { Toaster } from '@/components/hrm/ui/toaster';

export default function HRMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TenantProvider>
      <RoleGuard>
        <div className="hrm-portal min-h-screen bg-background text-foreground">
          {children}
        </div>
      </RoleGuard>
      <Toaster />
    </TenantProvider>
  );
}
