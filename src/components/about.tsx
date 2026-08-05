"use client";
import { Circle, Target, Users, Shield, TrendingUp } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";
import { motion } from "motion/react";

const ourPrinciples = [
  { icon: Target, title: "Strategic Growth", description: "Commercially grounded advice aligned with long-term enterprise value." },
  { icon: Users, title: "Integrated Advisory", description: "Finance, tax, regulatory and corporate matters viewed as one connected picture." },
  { icon: Shield, title: "Compliance Focus", description: "Structured processes designed to support strong, reliable regulatory compliance." },
  { icon: TrendingUp, title: "Tax Efficiency", description: "Thoughtful planning and execution focused on efficient, sustainable outcomes." },
];

export default function ContentSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="about">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <ScrollView>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4">
                Our Story
              </div>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h2 className="text-4xl font-medium lg:text-6xl tracking-tight leading-[1.1]">
                More than just <br />
                <span className="text-muted-foreground">managing books.</span>
              </h2>
            </ScrollView>
            <ScrollView delay={0.2}>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  FinniKK is a full-service financial advisory, tax consulting, litigation, and corporate legal firm. We partner with ambitious entrepreneurs and scaling enterprises to build, protect, and optimize their business operations.
                </p>
                <p>
                  We serve as strategic growth partners, bridging the gap between complex regulatory frameworks and commercial ambitions to deliver integrated corporate solutions.
                </p>
              </div>
            </ScrollView>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              {ourPrinciples.map((principle, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-3xl border bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    <principle.icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <ScrollView delay={0.4}>
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[700px] shadow-2xl">
                <Image 
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105" 
                  src="/images/finnikk-meeting.png" 
                  alt="FinniKK Meeting" 
                  height={1200} 
                  width={800} 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl"
                >
                  <p className="text-sm font-medium text-foreground italic">
                    "Bridging the gap between complex regulatory frameworks and commercial ambitions."
                  </p>
                </motion.div>
              </div>
            </ScrollView>
            
            {/* Background decoration */}
            <div className="absolute -top-12 -right-12 size-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -left-12 size-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
