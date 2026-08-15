import AddWorkLogForm from '@/components/hrm/misc/AddWorkLogForm';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function AddWorkLog() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <DashboardLayout user={user}>
      <AddWorkLogForm workLogId={null} user={user} />
    </DashboardLayout>
  );
} 