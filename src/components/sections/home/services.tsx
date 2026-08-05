"use client";
import { motion } from "motion/react";
import { InView } from "@/components/motion-primitives/in-view";
import { SERVICES_LIST } from "@/content/services";
import Image from "next/image";
import Link from "next/link";
import { 
  BarChart3, 
  FileText, 
  Globe, 
  ShieldAlert, 
  Rocket, 
  BookOpen, 
  Key, 
  TrendingUp, 
  Layers,
  ArrowUpRight
} from "lucide-react";

const icons = [
  BarChart3, FileText, Globe, ShieldAlert, Rocket, BookOpen, Key, TrendingUp, Layers
];

export default function ServicesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="services">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[.2em] text-primary mb-4"
            >
              Our Expertise
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-medium lg:text-6xl tracking-tight"
            >
              Precision Engineered <br />
              <span className="text-muted-foreground">Business Solutions.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="text-muted-foreground leading-relaxed">
              We connect financial, tax, and legal expertise into a unified framework designed for growth, compliance, and strategic defense.
            </p>
          </motion.div>
        </div>

        <div className="bento-grid">
          {SERVICES_LIST.map((service, index) => {
            const Icon = icons[index % icons.length];
            const isLarge = index === 0 || index === 4 || index === 7;
            
            return (
              <InView
                key={service.name}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewOptions={{ once: true, margin: "0px 0px -100px 0px" }}
                className={isLarge ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1 lg:row-span-1"}
              >
                <Link href={service.url} className="group relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] border bg-card p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                  {/* Glass Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Icon & Link Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={28} />
                    </div>
                    <div className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold tracking-tight mb-3">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                      {service.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {service.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Overlay for Large Cards */}
                  {isLarge && (
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 -mb-8 -mr-8 opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110">
                       <Image 
                        src={service.img} 
                        alt="" 
                        width={300} 
                        height={300} 
                        className="object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/0 transition-colors duration-500 group-hover:border-primary/20" />
                </Link>
              </InView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
