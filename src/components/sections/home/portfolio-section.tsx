"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Building2, Factory, Globe2, Landmark, Rocket, Scale } from "lucide-react";
import { ScrollView } from "@/components/scroll-view";

const sectors = [
  { icon: Rocket, title: "Startups & Founder-led Businesses", text: "Entity setup, accounting foundations, tax compliance, fundraising readiness, governance and scalable finance processes." },
  { icon: Factory, title: "Manufacturing & Trading", text: "GST, customs, working capital, inventory accounting, controls, tax positions and regulatory coordination across operating locations." },
  { icon: Globe2, title: "Cross-border & International Business", text: "India entry, international taxation, transfer pricing, FEMA/RBI reporting and cross-border structuring support." },
  { icon: Building2, title: "Growing Enterprises", text: "Virtual CFO, MIS, internal controls, corporate compliance, restructuring and decision support as operational complexity increases." },
  { icon: Landmark, title: "Institutions & Not-for-profit Organizations", text: "Accounting, tax, governance, reporting and recurring compliance support tailored to institutional operating requirements." },
  { icon: Scale, title: "Businesses Facing Disputes", text: "Assessment readiness, GST and tax notices, litigation support, evidence organization, reconciliations and regulatory defense strategy." },
];

export default function PortfolioSection() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-transparent md:py-32" id="industries">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollView>
          <div className="grid gap-8 md:grid-cols-[1fr_.85fr] md:items-end">
            <div><p className="text-sm font-medium uppercase tracking-[.22em] finnikk-gradient-text">Where We Create Value</p><h2 className="mt-4 text-4xl font-semibold md:text-6xl">Advisory built around the way businesses actually operate.</h2></div>
            <p className="text-lg leading-8 text-muted-foreground">Different businesses face different combinations of finance, tax, governance, regulatory and transaction challenges. FinniKK brings those workstreams together around the operating reality.</p>
          </div>
        </ScrollView>
        <ScrollView stagger delay={0.03}>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((item) => { const Icon=item.icon; return (
              <motion.article key={item.title} variants={{hidden:{opacity:0,scale:.96,y:18},visible:{opacity:1,scale:1,y:0}}} whileHover={{y:-6}} className="group flex min-h-[300px] flex-col rounded-[2rem] border bg-background p-7 md:p-8">
                <div className="flex items-center justify-between"><div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/50"><Icon className="size-5"/></div><ArrowUpRight className="size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1"/></div>
                <h3 className="mt-10 text-2xl font-semibold">{item.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{item.text}</p>
              </motion.article>
            )})}
          </div>
        </ScrollView>
        <ScrollView delay={0.12}><div className="mt-10 text-center"><Link href="/services" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition hover:bg-muted">Explore our detailed capabilities <ArrowUpRight className="size-4"/></Link></div></ScrollView>
      </div>
    </section>
  );
}
