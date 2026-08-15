import { createClient } from '@/utils/hrm/supabase/server';
import { redirect } from 'next/navigation';
import AuthForm, { AuthState } from '@/components/hrm/misc/AuthForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Auth({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/hrm');
  }

  const currState = id as AuthState;
  if (!['signin', 'signup', 'forgot_password'].includes(currState)) {
    return redirect('/hrm/auth/signin');
  }

  return <AuthForm state={currState} />;
}
