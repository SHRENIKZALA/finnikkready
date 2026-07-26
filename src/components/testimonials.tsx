"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "./scroll-view";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

const reviews = [
  { name: "Sureshbhai Patel", business: "SV Outdoors", area: "Income Tax & GST", initials: "SP", review: "FinniKK has supported our income-tax and GST work with a practical and responsive approach. The team helps us understand the compliance requirement, keeps the work organized and gives clear guidance whenever a tax matter needs attention." },
  { name: "Rameshbhai", business: "Shubhi Expo Media", area: "GST Advisory & Compliance", initials: "R", review: "Our GST work requires timely attention and clarity on day-to-day compliance. FinniKK has been dependable in handling the work, resolving questions and keeping the process structured so we can stay focused on the business." },
  { name: "Bharatbhai", business: "Business Client", area: "Tax Litigation Support", initials: "B", review: "During litigation-related work, FinniKK approached the matter carefully, reviewed the facts and documents in detail and explained the position in a clear way. Their structured support gave us better visibility over the matter and the next steps." },
  { name: "Dipakbhai", business: "Swaminarayan Temple", area: "Tax Advisory & Compliance", initials: "D", review: "FinniKK has assisted us with tax-related matters in a professional and organized manner. We value the clear communication, attention to documentation and practical support provided throughout the compliance process." },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32" id="testimonials">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollView><p className="text-sm font-medium uppercase tracking-[.22em] finnikk-gradient-text">Client Perspectives</p></ScrollView>
          <ScrollView delay={0.08}><h2 className="mt-4 text-4xl font-medium lg:text-5xl">Trusted for work that demands clarity and attention.</h2></ScrollView>
          <ScrollView delay={0.14}><p className="mt-6 text-muted-foreground">Relationships are built through consistent execution, clear communication and practical support across tax, GST, litigation and recurring business matters.</p></ScrollView>
        </div>
        <ScrollView stagger delay={0.04}>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {reviews.map((r, index) => (
              <motion.div key={r.name+r.business} variants={{hidden:{opacity:0,y:20,filter:"blur(8px)"},visible:{opacity:1,y:0,filter:"blur(0px)"}}} whileHover={{y:-5}}>
                <Card className="h-full rounded-[2rem]">
                  <CardContent className="flex h-full flex-col p-7 md:p-9">
                    <Quote className="size-8 text-cyan-500/70"/>
                    <blockquote className="mt-6 flex-1 text-lg leading-8">“{r.review}”</blockquote>
                    <div className="mt-8 flex items-center gap-4 border-t pt-6">
                      <div className="flex size-12 items-center justify-center rounded-full bg-foreground font-semibold text-background">{r.initials}</div>
                      <div><p className="font-semibold">{r.name}</p><p className="text-sm text-muted-foreground">{r.business} · {r.area}</p></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
