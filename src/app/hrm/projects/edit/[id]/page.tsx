import { createClient } from '@/utils/hrm/supabase/server';
import { getUser } from '@/utils/hrm/supabase/queries';
import AddProjectForm from '@/components/hrm/misc/AddProjectForm';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProject({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <DashboardLayout user={user}>
      <AddProjectForm projectId={id} />
    </DashboardLayout>
  );
}