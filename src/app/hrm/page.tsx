import { redirect } from 'next/navigation';
import { createClient } from '@/utils/hrm/supabase/server';
import HomePage from '@/components/hrm/home/HomePage';

export default async function HRMHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return <HomePage user={user} />;
}
