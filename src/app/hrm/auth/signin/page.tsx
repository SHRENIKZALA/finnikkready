import AuthForm from '@/components/hrm/misc/AuthForm';
import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Staff sign in | FinniKK',
  description: 'Secure staff access to the FinniKK HRM workspace.',
};

export default async function SignIn() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/hrm');

  return <AuthForm />;
}
