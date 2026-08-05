"use client";
import React, { useState, useEffect } from "react";
import { ScrollView } from "@/components/scroll-view";
import { motion } from "motion/react";
import { Search, Layers3, ShieldCheck, Activity, Zap, BarChart } from "lucide-react";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import { InView } from "@/components/motion-primitives/in-view";

const pillars = [
  { icon: Search, title: "Understand the Business", text: "We begin with the commercial context, transaction flows, regulatory environment and the decision management is trying to make." },
  { icon: Layers3, title: "Connect the Workstreams", text: "Finance, tax, GST, governance, regulatory and legal issues are considered together so one solution does not create another problem." },
  { icon: ShieldCheck, title: "Execute with Control", text: "Clear ownership, documented review, reconciled information and practical action plans keep engagements disciplined and defensible." },
];

const stats = [
  { label: "Compliance Accuracy", value: 99.9, suffix: "%", icon: ShieldCheck },
  { label: "Turnaround Speed", value: 45, suffix: "% Faster", icon: Zap },
  { label: "Client Growth", value: 120, suffix: "+", icon: Activity },
];

export default function StatsSection() {
  const [inView, setInView] = useState(false);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="approach">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(8,124,255,0.03),transparent_70%)]" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <ScrollView>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-primary mb-4">
                The FinniKK Advantage
              </p>
            </ScrollView>
            <ScrollView delay={0.08}>
              <h2 className="text-4xl font-medium lg:text-6xl tracking-tight leading-[1.1]">
                Business context first. <br />
                <span className="text-muted-foreground text-3xl lg:text-5xl">Technical depth throughout.</span>
              </h2>
            </ScrollView>
            <ScrollView delay={0.14}>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Our work is designed around the real business behind the compliance. We connect analysis, documentation, execution and management visibility so complex matters become structured and actionable.
              </p>
            </ScrollView>
          </div>
          
          {/* Advanced Data Visualization Component */}
          <div className="relative aspect-square max-w-md mx-auto w-full lg:max-w-none">
            <InView
              onStatusChange={(status) => setInView(status)}
              className="size-full flex items-center justify-center"
            >
              <div className="relative size-full glass rounded-[3rem] p-8 flex items-center justify-center overflow-hidden">
                {/* Abstract Data Nodes */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="size-full" viewBox="0 0 400 400">
                    <motion.circle 
                      cx="200" cy="200" r="150" 
                      fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="200" cy="200" r="100" 
                      fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-6 w-full relative z-10">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="p-6 rounded-3xl bg-background/50 border border-white/10 shadow-xl">
                      <stat.icon className="size-6 text-primary mb-4" />
                      <div className="flex items-baseline gap-1 text-3xl font-bold tracking-tighter">
                        {inView ? (
                          <SlidingNumber value={stat.value} />
                        ) : (
                          <span>0</span>
                        )}
                        <span className="text-lg font-medium text-muted-foreground">{stat.suffix}</span>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                  <div className="p-6 rounded-3xl bg-primary text-primary-foreground shadow-xl flex flex-col justify-center items-center text-center">
                    <BarChart className="size-8 mb-2" />
                    <p className="text-sm font-bold leading-tight">Data-Driven <br /> Precision</p>
                  </div>
                </div>
              </div>
            </InView>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-[2.5rem] border bg-card p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="size-6" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                    PHASE 0{index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-4">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{item.text}</p>
                
                {/* Decorative background number */}
                <span className="absolute bottom-6 right-10 text-8xl font-black text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                  0{index + 1}
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
