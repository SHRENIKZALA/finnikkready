import LandingPage from '@/components/hrm/landing/LandingPage';
import { createClient } from '@/utils/hrm/supabase/server';

export default async function Landing() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <LandingPage user={user} />;
} 