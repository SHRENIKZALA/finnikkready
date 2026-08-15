import DepartmentsPage from '@/components/hrm/misc/DepartmentsPage';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function Departments() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <div className="h-screen">
      <DashboardLayout user={user}>
        <DepartmentsPage user={user} />
      </DashboardLayout>
    </div>
  );
} 