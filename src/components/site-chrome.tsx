"use client";

import { usePathname } from "next/navigation";
import { HeroHeader } from "@/components/header";
import FinniKKNavigationLoader from "@/components/finnikk-navigation-loader";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStaffPortal = pathname.startsWith('/hrm') || pathname.startsWith('/finance/app');

  if (isStaffPortal) return <>{children}</>;

  return (
    <>
      <BackgroundPaths />
      <HeroHeader />
      <FinniKKNavigationLoader />
      {children}
    </>
  );
}
