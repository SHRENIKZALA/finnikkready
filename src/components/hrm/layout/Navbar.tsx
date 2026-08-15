'use client';

import { NavigationMenu, NavigationMenuList } from '@/components/hrm/ui/navigation-menu';
import { Button } from '@/components/hrm/ui/button';
import { Menu } from 'lucide-react';
import { ModeToggle } from '../landing/mode-toggle';
import { User } from '@supabase/supabase-js';
import { createApiClient } from '@/utils/hrm/supabase/api';
import { createClient } from '@/utils/hrm/supabase/client';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/utils/hrm/tenant-context';

interface NavbarProps {
  user: User | null;
  onMenuClick: () => void;
}

export function Navbar({ user, onMenuClick }: NavbarProps) {
  const router = useRouter();
  const api = createApiClient(createClient());
  const { currentTenant } = useTenant();
  
  const handleAuth = async () => {
    if (user) {
      return router.push('/hrm/account');
    }
    return router.push('/hrm/auth/signin');
  };

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <div className="h-14 px-4 flex items-center justify-between lg:justify-end">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex gap-2 items-center">
          {currentTenant && (
            <span className="text-sm font-medium">
              {currentTenant.name}
            </span>
          )}
          <Button
            onClick={handleAuth}
            className="border"
            variant="secondary"
          >
            {user ? 'Account' : 'Sign In'}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
} 