"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Building2, Factory, Globe2, Landmark, Rocket, Scale } from "lucide-react";
import { ScrollView } from "@/components/scroll-view";
import { InView } from "@/components/motion-primitives/in-view";

const sectors = [
  { icon: Rocket, title: "Startups & Founders", text: "Entity setup, fundraising readiness, and scalable finance processes for the next generation of builders." },
  { icon: Factory, title: "Manufacturing", text: "GST, customs, and working capital optimization across complex operating locations and supply chains." },
  { icon: Globe2, title: "International Business", text: "India entry, transfer pricing, and FEMA/RBI reporting for cross-border structuring support." },
  { icon: Building2, title: "Growing Enterprises", text: "Virtual CFO, internal controls, and decision support as operational complexity increases." },
  { icon: Landmark, title: "Institutions", text: "Accounting, tax, and recurring compliance support tailored to institutional operating requirements." },
  { icon: Scale, title: "Dispute Defense", text: "Assessment readiness, GST notices, and regulatory defense strategy for high-stakes litigation." },
];

export default function PortfolioSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="industries">
      {/* Decorative background circle */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] -z-10 rounded-full translate-y-1/2 -translate-x-1/4" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <ScrollView>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-primary mb-4">
                Where We Create Value
              </p>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h2 className="text-4xl font-medium lg:text-6xl tracking-tight leading-[1.1]">
                Advisory built around <br />
                <span className="text-muted-foreground">real-world operations.</span>
              </h2>
            </ScrollView>
          </div>
          <ScrollView delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Different businesses face different combinations of challenges. FinniKK brings those workstreams together around your operating reality.
            </p>
          </ScrollView>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((item, index) => {
            const Icon = item.icon;
            return (
              <InView
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewOptions={{ once: true }}
              >
                <motion.article 
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col rounded-[2.5rem] border bg-card p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                      <Icon className="size-6" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowUpRight className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold tracking-tight mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Sector Expertise</span>
                    <span className="group-hover:text-primary transition-colors">0{index + 1}</span>
                  </div>
                </motion.article>
              </InView>
            );
          })}
        </div>

        <ScrollView delay={0.3}>
          <div className="mt-16 text-center">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-primary/20 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-lg hover:shadow-primary/20"
            >
              Explore our detailed capabilities 
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
