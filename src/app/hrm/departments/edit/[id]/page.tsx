import { createClient } from '@/utils/hrm/supabase/server';
import { getUser } from '@/utils/hrm/supabase/queries';
import AddDepartmentForm from '@/components/hrm/misc/AddDepartmentForm';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDepartment({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  return (
    <DashboardLayout user={user}>
      <AddDepartmentForm departmentId={id} />
    </DashboardLayout>
  );
} 