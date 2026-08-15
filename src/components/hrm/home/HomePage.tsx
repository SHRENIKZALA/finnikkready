'use client'

import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import EmployeesPage from "@/components/hrm/misc/EmployeesPage"
import ClientsPage from "@/components/hrm/misc/ClientsPage"
import ProjectsPage from "@/components/hrm/misc/ProjectsPage"
import KnowledgePage from "@/components/hrm/misc/KnowledgePage"
import AllocationsPage from "@/components/hrm/misc/AllocationsPage"
import { DashboardLayout } from "@/components/hrm/layout/DashboardLayout"

export default function HomePage({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState('allocations');

  return (
    <DashboardLayout user={user}>
      {activeTab === 'allocations' && <AllocationsPage user={user} />}
      {activeTab === 'employees' && <EmployeesPage user={user} />}
      {activeTab === 'clients' && <ClientsPage user={user} />}
      {activeTab === 'projects' && <ProjectsPage user={user} />}
      {activeTab === 'knowledge' && <KnowledgePage user={user} />}
    </DashboardLayout>
  );
} 