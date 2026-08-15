import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mesh-gradient min-h-screen overflow-hidden">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_460px] lg:px-12">
        <section className="hidden space-y-8 lg:block">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/brand/finnikk-logo.png" alt="FinniKK" width={210} height={70} className="h-14 w-auto object-contain brightness-0 invert" priority />
          </Link>
          <div className="max-w-xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-300">FinniKK staff workspace</p>
            <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-white xl:text-6xl">One clear view of the people and work that move your business forward.</h1>
            <p className="max-w-lg text-lg leading-8 text-slate-300">Manage employees, contracts, projects, allocations, work logs, payroll, and client relationships from a single controlled workspace.</p>
          </div>
          <div className="grid max-w-xl gap-3 sm:grid-cols-2">
            {['Staff-only access', 'Workspace-based data', 'Responsive operations', 'Finnikk support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-teal-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 transition hover:text-teal-200">Return to public website <ArrowUpRight className="h-4 w-4" /></Link>
        </section>
        <section className="w-full">{children}</section>
      </div>
    </div>
  );
}
