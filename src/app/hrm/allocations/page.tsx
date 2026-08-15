import AllocationsPage from '@/components/hrm/misc/AllocationsPage';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function Allocations() {
  const supabase = await createClient();
  const user = await await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <div className="h-screen">
      <DashboardLayout user={user}>
        <AllocationsPage user={user} />
      </DashboardLayout>
    </div>
  );
} 