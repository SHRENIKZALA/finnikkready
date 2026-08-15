import AccountPage from '@/components/hrm/misc/AccountPage';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/hrm/supabase/queries';

export default async function Account() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return redirect('/hrm/auth/signin');
  }

  return <AccountPage user={user} />;
}
