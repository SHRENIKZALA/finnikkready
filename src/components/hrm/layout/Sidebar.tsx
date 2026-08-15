'use client'

import { Button } from "@/components/hrm/ui/button";
import { Users, Briefcase, X, ChevronLeft, ChevronRight, Calendar, BookOpen, FileText, Network, Clock, ClipboardList, Database } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useState } from 'react';
import { useTenant } from '@/utils/hrm/tenant-context';

interface SidebarProps {
  onClose?: () => void;
}

const NAVIGATION_ITEMS = [
  { title: "Allocations", href: "/hrm/allocations", icon: Calendar },
  { title: "Projects", href: "/hrm/projects", icon: Briefcase },
  { title: "Clients", href: "/hrm/clients", icon: Users, adminOnly: true },
  {
    title: "HR",
    icon: Users,
    children: [
      { title: "Departments", href: "/hrm/departments", icon: Network, adminOnly: true },
      { title: "Employees", href: "/hrm/employees", icon: Users, adminOnly: true },
      { title: "Employee Contracts", href: "/hrm/contracts", icon: FileText, adminOnly: false },
      { title: "Work Logs", href: "/hrm/work-logs", icon: ClipboardList, adminOnly: false },
      { title: "Payslips", href: "/hrm/payslips", icon: FileText, adminOnly: false },
    ],
  },
  {
    title: "CRM",
    icon: Users,
    adminOnly: true,
    children: [
      { title: "Leads", href: "/hrm/leads", icon: Network, adminOnly: false },
      { title: "Opportunities", href: "/opportunities", icon: Briefcase, adminOnly: false },
    ],
  },
  {
    title: "Master",
    icon: Database,
    adminOnly: true,
    children: [
      { title: "Contract Types", href: "/hrm/master/contract-types", icon: FileText, adminOnly: false },
      { title: "Work Schedules", href: "/hrm/master/schedules", icon: Clock, adminOnly: false },
      { title: "Public Holidays", href: "/hrm/master/holidays", icon: Calendar, adminOnly: false },
      { title: "Positions", href: "/hrm/master/positions", icon: Briefcase, adminOnly: false },
      { title: "Knowledge", href: "/hrm/master/knowledge", icon: BookOpen, adminOnly: false },
    ],
  },
];

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { userRole, isLoading } = useTenant();
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const isAdmin = userRole === 'admin';

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const toggleSection = (title: string) => {
    if (!isExpanded) {
      setIsExpanded(true);
      setExpandedSection(title);
    } else {
      setExpandedSection(expandedSection === title ? null : title);
    }
  };

  const isActiveLink = (href: string) => pathname.startsWith(href);

  return (
    <aside className={`bg-card shadow-md flex flex-col h-full transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <div className="mb-5 flex items-center justify-between">
          <Logo iconOnly={!isExpanded} />
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden lg:flex">
              {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            {onClose && (
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {isExpanded && !isLoading && (
          <div className={`mb-5 rounded-lg border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${isAdmin ? 'border-blue-500/20 bg-blue-500/10 text-blue-600' : 'border-teal-500/20 bg-teal-500/10 text-teal-700'}`}>
            {isAdmin ? 'Admin workspace' : 'Staff workspace'}
          </div>
        )}

        <nav className="space-y-2">
          {!isLoading && NAVIGATION_ITEMS.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const visibleChildren = item.children?.filter((child) => !child.adminOnly || isAdmin);
            if (item.children && visibleChildren?.length === 0) return null;

            return (
              <div key={item.title}>
                {item.children ? (
                  <div className="space-y-1">
                    <Button
                      variant={expandedSection === item.title ? "secondary" : "ghost"}
                      className={`w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}
                      onClick={() => toggleSection(item.title)}
                      title={item.title}
                    >
                      <item.icon className="h-4 w-4" />
                      {isExpanded && <span className="ml-2">{item.title}</span>}
                    </Button>
                    {isExpanded && expandedSection === item.title && (
                      <div className="ml-4 space-y-1">
                        {visibleChildren?.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <Button variant={isActiveLink(child.href) ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
                              <child.icon className="h-4 w-4" />
                              <span className="ml-2">{child.title}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <Button variant={isActiveLink(item.href) ? "secondary" : "ghost"} className={`w-full ${isExpanded ? 'justify-start' : 'justify-center'}`} title={item.title}>
                      <item.icon className="h-4 w-4" />
                      {isExpanded && <span className="ml-2">{item.title}</span>}
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
