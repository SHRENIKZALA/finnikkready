import AddPublicHolidayForm from '@/components/hrm/misc/AddPublicHolidayForm';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function AddPublicHoliday() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <DashboardLayout user={user}>
      <AddPublicHolidayForm holidayId={null} />
    </DashboardLayout>
  );
} 