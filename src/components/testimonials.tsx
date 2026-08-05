"use client";
import { ScrollView } from "./scroll-view";
import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { InView } from "@/components/motion-primitives/in-view";

const reviews = [
  { name: "Sureshbhai Patel", business: "SV Outdoors", area: "Income Tax & GST", initials: "SP", review: "FinniKK has supported our income-tax and GST work with a practical and responsive approach. The team helps us understand the compliance requirement, keeps the work organized and gives clear guidance." },
  { name: "Rameshbhai", business: "Shubhi Expo Media", area: "GST Advisory", initials: "R", review: "Our GST work requires timely attention and clarity. FinniKK has been dependable in handling the work, resolving questions and keeping the process structured so we can stay focused on the business." },
  { name: "Bharatbhai", business: "Business Client", area: "Tax Litigation", initials: "B", review: "During litigation-related work, FinniKK approached the matter carefully, reviewed the facts in detail and explained the position clearly. Their support gave us better visibility over the matter." },
  { name: "Dipakbhai", business: "Swaminarayan Temple", area: "Tax Advisory", initials: "D", review: "FinniKK has assisted us with tax-related matters in a professional and organized manner. We value the clear communication, attention to documentation and practical support provided throughout." },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="testimonials">
      {/* Decorative background grid */}
      <div className="absolute inset-0 -z-10 grid-overlay opacity-10" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <ScrollView>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-primary mb-4">
              Client Perspectives
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h2 className="text-4xl font-medium lg:text-6xl tracking-tight leading-[1.1] max-w-3xl">
              Trusted for work that demands <br />
              <span className="text-muted-foreground">clarity and attention.</span>
            </h2>
          </ScrollView>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((r, index) => (
            <InView
              key={r.name + r.business}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewOptions={{ once: true }}
            >
              <motion.div 
                whileHover={{ y: -8 }}
                className="group relative flex h-full flex-col rounded-[2.5rem] border bg-card p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Quote size={24} />
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="flex-1 text-xl leading-relaxed font-medium tracking-tight mb-10">
                  “{r.review}”
                </blockquote>
                
                <div className="flex items-center gap-5 pt-8 border-t border-border/50">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg shadow-primary/20">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-lg font-bold tracking-tight">{r.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {r.business} · {r.area}
                    </p>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <Quote size={80} />
                </div>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
