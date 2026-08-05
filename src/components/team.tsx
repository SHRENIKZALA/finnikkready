"use client";
import { motion } from "motion/react";
import { ScrollView } from "./scroll-view";
import { Check, Linkedin, Mail, ShieldCheck } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="leadership">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <ScrollView>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4">
              Leadership
            </div>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h2 className="text-4xl font-medium lg:text-6xl tracking-tight">Strategic Vision.</h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Driven by commercial understanding, disciplined execution, and a commitment to creating lasting value for every client.
            </p>
          </ScrollView>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Bio Column */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight">Managing Partner</h3>
                  <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Excellence in Business Advisory</p>
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The Managing Partner leads FinniKK with a sharp understanding of business realities and a hands-on approach to complex financial, taxation, and legal matters.
                  </p>
                  <p>
                    The focus is on turning complexity into clear action—anticipating risks, strengthening decision-making, and creating measurable enterprise value.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Strategic thinker, business-first approach",
                    "Trusted advisor for scaling enterprises",
                    "Commitment to integrity and excellence",
                    "Expertise in complex litigation defense"
                  ].map((item, i) => (
                    <motion.div 
                      key={item} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-4 rounded-2xl border bg-card/50"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={14} />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">
                    <Linkedin size={18} />
                    Connect
                  </a>
                  <div className="w-px h-4 bg-border" />
                  <a href="mailto:zalashrenik1811@gmail.com" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    <Mail size={18} />
                    Contact
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Decorative elements around image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-teal-500/20 blur-[100px] -z-10 rounded-full" />
                
                <div className="relative rounded-[3rem] overflow-hidden border-8 border-background shadow-2xl bg-card">
                  <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                    <img
                      src="/images/leader-final.png"
                      alt="Shrenik Zala"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-8 bg-card text-center relative overflow-hidden">
                    {/* Animated background lines for data-feel */}
                    <div className="absolute inset-0 opacity-5">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 50 Q 25 45, 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M0 60 Q 25 55, 50 60 T 100 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>
                    
                    <h3 className="text-3xl font-bold tracking-tight">Shrenik Zala</h3>
                    <p className="text-muted-foreground font-medium mt-1">Managing Partner</p>
                    
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                      <ShieldCheck size={14} />
                      Strategic Leadership
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
