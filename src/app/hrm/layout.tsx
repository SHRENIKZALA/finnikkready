import { TenantProvider } from '@/utils/hrm/tenant-context';
import { Toaster } from '@/components/hrm/ui/toaster';

export default function HRMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TenantProvider>
      <div className="hrm-portal min-h-screen bg-background text-foreground">
        {children}
      </div>
      <Toaster />
    </TenantProvider>
  );
}
