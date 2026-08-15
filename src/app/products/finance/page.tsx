"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, FileText, ReceiptText, ShieldCheck, Users } from "lucide-react";

const cards: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  { Icon: FileText, title: "GST invoices", body: "Create tax-aware invoices with HSN/SAC line items and transparent CGST, SGST, or IGST totals." },
  { Icon: ReceiptText, title: "Spend control", body: "Capture operational expenses, vendor details, input tax, and receipt metadata in one workspace." },
  { Icon: Users, title: "Business contacts", body: "Keep GSTIN, PAN, place of supply, and contact details ready for every billable relationship." },
  { Icon: BarChart3, title: "GST review", body: "Use tenant-private outward-supply and liability views before you export or share a summary." },
];

export default function FinanceProductPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden pt-28 mesh-gradient">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-20" />
        <div className="absolute -left-32 top-0 -z-10 size-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold tracking-[.12em] text-primary">FINNIKK FINANCE</p>
          <h1 className="finnikk-hero-title mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[.95] tracking-[-.055em] sm:text-7xl">Run your business.<br /><span className="text-primary">Know your numbers.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/80">A calm, GST-ready finance workspace for Indian businesses—built into FinniKK for invoices, expenses, contacts, and business review.</p>
          <div className="mt-10 flex flex-wrap gap-4"><Link href="/finance/app" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-2xl shadow-primary/20 transition hover:scale-[1.02] hover:shadow-primary/40">Get started free <ArrowRight className="h-4 w-4" /></Link><a href="#features" className="rounded-2xl border-2 border-primary/20 bg-background/50 px-7 py-4 font-semibold transition hover:bg-primary/5">See the workflow</a></div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground/70"><span>✓ No card required</span><span>✓ Private workspace</span><span>✓ GST calculations included</span></div>
        </div>
        <div className="rounded-[2rem] bg-primary p-5 shadow-2xl shadow-primary/25"><div className="glass rounded-2xl bg-background/95 p-5"><div className="flex items-center justify-between"><strong>FinniKK workspace</strong><span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-700">GST ready</span></div><div className="mt-5 grid grid-cols-3 gap-3">{[["Sales", "₹1,84,500", "#087cff"], ["Outstanding", "₹42,600", "#e3a128"], ["GST review", "₹9,480", "#11c9bd"]].map(([label, value, color]) => <div className="rounded-xl border border-primary/10 bg-background p-3" key={label}><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 font-bold" style={{ color }}>{value}</p></div>)}</div><div className="mt-5 grid gap-3 rounded-xl bg-primary/5 p-4"><p className="text-xs font-bold tracking-[.12em] text-primary">FINANCE ROUTINE</p><p className="text-2xl font-bold tracking-tight">Issue, record, review.</p><p className="text-sm leading-6 text-foreground/70">Invoices and expenses stay organized in an isolated workspace that belongs only to your business.</p></div></div></div>
        </div>
      </section>
      <section id="features" className="border-y border-primary/10 bg-primary px-6 py-24 text-primary-foreground"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold tracking-[.14em] text-teal-300">ONE CLEAR WORKFLOW</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-.04em]">The product structure you need—without the finance noise.</h2><div className="mt-12 grid gap-5 md:grid-cols-2">{cards.map(({ Icon, title, body }) => <article className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm" key={title}><Icon className="h-6 w-6 text-teal-300" /><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-primary-foreground/75">{body}</p></article>)}</div></div></section>
      <section className="relative overflow-hidden px-6 py-24 mesh-gradient"><div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-15" /><div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-background/70 p-10 text-center shadow-xl shadow-primary/10 backdrop-blur"><ShieldCheck className="mx-auto h-8 w-8 text-primary" /><h2 className="mt-5 text-4xl font-semibold tracking-tight">Your finance data stays with your business.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-foreground/75">Each FinniKK Finance sign-in receives a dedicated tenant workspace. Finance records are filtered at the database layer so another business cannot open them.</p><Link href="/finance/app" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-xl shadow-primary/20">Open FinniKK Finance <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
  );
}
