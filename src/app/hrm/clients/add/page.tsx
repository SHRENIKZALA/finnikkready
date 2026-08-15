import AddClientForm from '@/components/hrm/misc/AddClientForm';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function AddClient() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <DashboardLayout user={user}>
      <AddClientForm clientId={null} />
    </DashboardLayout>
  );
}