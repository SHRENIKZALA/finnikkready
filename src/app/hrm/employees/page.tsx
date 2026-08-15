import EmployeesPage from '@/components/hrm/misc/EmployeesPage';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function Employees() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <div className="h-screen">
      <DashboardLayout user={user}>
        <EmployeesPage user={user} />
      </DashboardLayout>
    </div>
  );
}