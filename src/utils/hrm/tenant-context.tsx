'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/utils/hrm/supabase/client';
import { getUserTenants } from '@/utils/hrm/supabase/queries';
import type { HrmMemberRole, Tenant, UserTenant } from './types';

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  userTenants: Tenant[];
  setUserTenants: (tenants: Tenant[]) => void;
  userRole: HrmMemberRole | null;
  employeeId: string | null;
  isLoading: boolean;
  refreshMembership: (preferredTenantId?: string) => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

function clearStoredTenantState() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentTenant');
  localStorage.removeItem('userTenants');
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenantState] = useState<Tenant | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentTenant');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const [userTenants, setUserTenantsState] = useState<Tenant[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userTenants');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [memberships, setMemberships] = useState<UserTenant[]>([]);
  const [userRole, setUserRole] = useState<HrmMemberRole | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applyMembership = (membership: UserTenant) => {
    const tenant = membership.tenant as Tenant | undefined;
    if (!tenant) {
      throw new Error('Your workspace membership is missing its tenant record.');
    }

    setCurrentTenantState(tenant);
    setUserRole(membership.role);
    setEmployeeId(membership.employee_id ?? null);
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
  };

  const refreshMembership = async (preferredTenantId?: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMemberships([]);
      setCurrentTenantState(null);
      setUserTenantsState([]);
      setUserRole(null);
      setEmployeeId(null);
      clearStoredTenantState();
      return;
    }

    const nextMemberships = (await getUserTenants(supabase, user.id)) as UserTenant[] | null;
    if (!nextMemberships || nextMemberships.length === 0) {
      await supabase.auth.signOut();
      throw new Error('No tenant access. Please contact your administrator.');
    }

    const tenants = nextMemberships
      .map((membership) => membership.tenant)
      .filter((tenant): tenant is Tenant => Boolean(tenant));
    const storedTenantRaw = localStorage.getItem('currentTenant');
    const storedTenantId = storedTenantRaw ? JSON.parse(storedTenantRaw)?.id : undefined;
    const selectedMembership = nextMemberships.find(
      (membership) => membership.tenant?.id === (preferredTenantId ?? currentTenant?.id ?? storedTenantId),
    ) ?? nextMemberships[0];

    setMemberships(nextMemberships);
    setUserTenantsState(tenants);
    localStorage.setItem('userTenants', JSON.stringify(tenants));
    applyMembership(selectedMembership);
  };

  const setCurrentTenant = (tenant: Tenant | null) => {
    if (!tenant) {
      setCurrentTenantState(null);
      setUserRole(null);
      setEmployeeId(null);
      localStorage.removeItem('currentTenant');
      return;
    }

    const membership = memberships.find((candidate) => candidate.tenant_id === tenant.id);
    setCurrentTenantState(tenant);
    setUserRole(membership?.role ?? null);
    setEmployeeId(membership?.employee_id ?? null);
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
  };

  const setUserTenants = (tenants: Tenant[]) => {
    setUserTenantsState(tenants);
    localStorage.setItem('userTenants', JSON.stringify(tenants));
  };

  useEffect(() => {
    let mounted = true;

    const initializeTenant = async () => {
      try {
        await refreshMembership();
      } catch (error) {
        console.error('Error initializing tenant:', error);
        if (mounted) {
          setCurrentTenantState(null);
          setUserTenantsState([]);
          setMemberships([]);
          setUserRole(null);
          setEmployeeId(null);
          clearStoredTenantState();
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeTenant();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <TenantContext.Provider value={{
      currentTenant,
      setCurrentTenant,
      userTenants,
      setUserTenants,
      userRole,
      employeeId,
      isLoading,
      refreshMembership,
    }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
