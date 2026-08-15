import { createClient } from '@/utils/hrm/supabase/server';
import { getUser } from '@/utils/hrm/supabase/queries';
import AddPayslipForm from '@/components/hrm/misc/AddPayslipForm';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/hrm/layout/DashboardLayout';

interface PageProps {
  params: Promise<{ month: string; contractId: string }>;
}

export default async function EditPayslip({ params }: PageProps) {
  const { month, contractId } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  
  if (!user) {
    redirect('/hrm/auth/signin');
  }

  // Check if payslip exists for this month and contract
  const { data: existingPayslip } = await supabase
    .from('Payslips')
    .select('id')
    .eq('contract_id', contractId)
    .eq('period_start', `${month.substring(0, 4)}-${month.substring(4, 6)}-01`)
    .maybeSingle();

  return (
    <DashboardLayout user={user}>
      <AddPayslipForm 
        payslipId={existingPayslip?.id || null} 
        periodMonth={month} 
        contractId={contractId}
      />
    </DashboardLayout>
  );
} 