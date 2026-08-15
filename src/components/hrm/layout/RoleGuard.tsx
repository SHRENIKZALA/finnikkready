'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTenant } from '@/utils/hrm/tenant-context';

const ADMIN_ONLY_PREFIXES = [
  '/hrm/clients',
  '/hrm/departments',
  '/hrm/employees',
  '/hrm/leads',
  '/hrm/master',
  '/hrm/allocations/add',
  '/hrm/allocations/edit',
  '/hrm/contracts/add',
  '/hrm/contracts/edit',
  '/hrm/work-logs/edit',
  '/hrm/payslips/add',
  '/hrm/payslips/edit',
  '/hrm/projects/add',
  '/hrm/projects/edit',
];

function isAdminOnlyPath(pathname: string) {
  return ADMIN_ONLY_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userRole, isLoading } = useTenant();

  useEffect(() => {
    if (!isLoading && userRole === 'staff' && isAdminOnlyPath(pathname)) {
      router.replace('/hrm');
    }
  }, [isLoading, pathname, router, userRole]);

  if (!isLoading && userRole === 'staff' && isAdminOnlyPath(pathname)) {
    return null;
  }

  return <>{children}</>;
}
