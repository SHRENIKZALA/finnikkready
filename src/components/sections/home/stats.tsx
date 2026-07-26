"use client";
import { ScrollView } from "@/components/scroll-view";
import { motion } from "motion/react";
import { Search, Layers3, ShieldCheck } from "lucide-react";

const pillars = [
  { icon: Search, title: "Understand the Business", text: "We begin with the commercial context, transaction flows, regulatory environment and the decision management is trying to make." },
  { icon: Layers3, title: "Connect the Workstreams", text: "Finance, tax, GST, governance, regulatory and legal issues are considered together so one solution does not create another problem." },
  { icon: ShieldCheck, title: "Execute with Control", text: "Clear ownership, documented review, reconciled information and practical action plans keep engagements disciplined and defensible." },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-28" id="approach">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollView><p className="text-sm font-medium uppercase tracking-[.22em] finnikk-gradient-text">How FinniKK Works</p></ScrollView>
          <ScrollView delay={0.08}><h2 className="mt-4 text-4xl font-medium lg:text-5xl">Business context first. Technical depth throughout.</h2></ScrollView>
          <ScrollView delay={0.14}><p className="mt-6 text-muted-foreground">Our work is designed around the real business behind the compliance. We connect analysis, documentation, execution and management visibility so complex matters become structured and actionable.</p></ScrollView>
        </div>
        <ScrollView stagger delay={0.04}>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((item, index) => {
              const Icon=item.icon;
              return <motion.article key={item.title} variants={{hidden:{opacity:0,y:24,filter:"blur(8px)"},visible:{opacity:1,y:0,filter:"blur(0px)"}}} whileHover={{y:-6}} className="group rounded-[2rem] border bg-background p-7 shadow-sm md:p-9">
                <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/50"><Icon className="size-5"/></div>
                <p className="mt-7 text-sm text-muted-foreground">0{index+1}</p>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{item.text}</p>
              </motion.article>
            })}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
