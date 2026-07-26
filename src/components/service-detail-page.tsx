"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { ScrollView } from "@/components/scroll-view";
import { Button } from "@/components/ui/button";

const whatsapp="https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services.";

export default function ServiceDetailPage({service,related}:{service:any;related:any[]}) {
 return <main className="overflow-hidden">
  <section className="relative min-h-[82vh] flex items-center pt-28">
   <div className="absolute inset-3 -z-10 overflow-hidden rounded-[2rem] border bg-[radial-gradient(circle_at_75%_30%,rgba(17,201,189,.13),transparent_30%),radial-gradient(circle_at_15%_70%,rgba(8,124,255,.12),transparent_32%)]"/>
   <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
    <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
     <Link href="/#services" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4"/>All services</Link>
     <p className="text-sm font-semibold uppercase tracking-[.22em] finnikk-gradient-text">{service.eyebrow}</p>
     <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">{service.title}</h1>
     <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{service.intro}</p>
     <div className="mt-9 flex flex-wrap gap-3"><Button size="lg" asChild><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle/>Discuss this service</a></Button><Button size="lg" variant="outline" asChild><a href="#capabilities">Explore capabilities</a></Button></div>
    </motion.div>
    <motion.div initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:.75,delay:.1}} className="relative flex min-h-[460px] items-center justify-center">
      <div className="absolute size-[380px] rounded-full border border-blue-500/10 bg-blue-500/5"/>
      <div className="absolute size-[280px] rounded-full border border-teal-500/15"/>
      <img src={service.img} alt={service.title} className="relative z-10 max-h-[440px] max-w-full object-contain"/>
    </motion.div>
   </div>
  </section>

  <section className="py-20 md:py-28"><div className="mx-auto max-w-7xl px-6">
   <ScrollView><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm uppercase tracking-[.2em] text-muted-foreground">The FinniKK approach</p><h2 className="mt-4 text-4xl font-semibold md:text-5xl">From obligation to operating advantage.</h2></div><div className="space-y-5 text-lg leading-8 text-muted-foreground"><p>Complex professional work is rarely solved by completing one isolated filing or report. We start with the business context, understand how information moves through the organization, identify dependencies, and build a work plan that connects compliance, controls, documentation and management decisions.</p><p>Our objective is to create an engagement that management can actually use: clear ownership, visible deadlines, defensible records, practical recommendations and a reliable path from issue identification to execution.</p></div></div></ScrollView>
  </div></section>

  <section id="capabilities" className="bg-zinc-50 py-20 dark:bg-zinc-950 md:py-28"><div className="mx-auto max-w-7xl px-6">
   <ScrollView><p className="text-sm uppercase tracking-[.2em] text-muted-foreground">What we can deliver</p><h2 className="mt-4 max-w-4xl text-4xl font-semibold md:text-6xl">Deep capability across the service lifecycle.</h2></ScrollView>
   <div className="mt-12 grid gap-5 md:grid-cols-2">{service.areas.map((a:any,i:number)=><ScrollView key={a[0]} delay={i*.02}><motion.article whileHover={{y:-5}} className="group h-full rounded-3xl border bg-background p-7 md:p-9"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{String(i+1).padStart(2,"0")}</span><Sparkles className="size-4 text-cyan-500 opacity-60"/></div><h3 className="mt-5 text-2xl font-semibold">{a[0]}</h3><p className="mt-4 leading-7 text-muted-foreground">{a[1]}</p></motion.article></ScrollView>)}</div>
  </div></section>

  <section className="py-20 md:py-28"><div className="mx-auto max-w-7xl px-6">
   <div className="grid gap-14 lg:grid-cols-2">
    <ScrollView><div><p className="text-sm uppercase tracking-[.2em] text-muted-foreground">Typical deliverables</p><h2 className="mt-4 text-4xl font-semibold">Work products designed for action.</h2><div className="mt-8 space-y-4">{service.deliver.map((x:string)=><div key={x} className="flex gap-3 rounded-2xl border p-4"><CheckCircle2 className="mt-1 size-5 shrink-0 text-cyan-500"/><span>{x}</span></div>)}</div></div></ScrollView>
    <ScrollView><div className="rounded-[2rem] bg-foreground p-8 text-background md:p-10"><p className="text-sm uppercase tracking-[.2em] opacity-60">How an engagement moves</p><div className="mt-8 space-y-7">{service.process.map((x:string,i:number)=><div key={x} className="flex gap-5"><div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-background/25 text-sm">{i+1}</div><div><h3 className="font-medium">{x}</h3><p className="mt-1 text-sm leading-6 opacity-60">A structured stage with defined inputs, ownership, review and documented outputs.</p></div></div>)}</div></div></ScrollView>
   </div>
  </div></section>

  <section className="bg-zinc-50 py-20 dark:bg-zinc-950 md:py-28"><div className="mx-auto max-w-7xl px-6">
   <ScrollView><div className="grid gap-10 lg:grid-cols-3"><div><p className="text-sm uppercase tracking-[.2em] text-muted-foreground">Built for complexity</p><h2 className="mt-4 text-4xl font-semibold">Where this service creates value.</h2></div><div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">{["Growing businesses formalizing processes","Multi-entity and multi-location operations","Founder-led companies preparing to scale","Businesses facing regulatory complexity","Cross-border and investor-backed enterprises","Management teams seeking stronger visibility"].map(x=><div key={x} className="rounded-2xl border bg-background p-6">{x}</div>)}</div></div></ScrollView>
  </div></section>

  <section className="py-20 md:py-28"><div className="mx-auto max-w-7xl px-6">
   <ScrollView><div className="rounded-[2.5rem] border bg-[radial-gradient(circle_at_90%_10%,rgba(17,201,189,.15),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(8,124,255,.14),transparent_28%)] p-8 md:p-14"><div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="text-sm uppercase tracking-[.2em] text-muted-foreground">Talk to FinniKK</p><h2 className="mt-4 text-4xl font-semibold md:text-6xl">Turn the next business challenge into a structured plan.</h2><p className="mt-5 max-w-2xl text-muted-foreground">Share the situation, timeline and outcome you are working toward. We can discuss the relevant workstreams and an appropriate engagement approach.</p></div><div className="lg:text-right"><Button size="lg" asChild><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle/>Start on WhatsApp</a></Button></div></div></div></ScrollView>
  </div></section>

  <section className="pb-24"><div className="mx-auto max-w-7xl px-6"><h2 className="text-3xl font-semibold">Related services</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{related.map(r=><Link key={r.slug} href={`/services/${r.slug}`} className="group rounded-2xl border p-6 transition hover:-translate-y-1"><p className="text-sm text-muted-foreground">{r.eyebrow}</p><h3 className="mt-2 text-xl font-semibold">{r.title}</h3><span className="mt-5 flex items-center gap-2 text-sm">View service <ArrowRight className="size-4 transition group-hover:translate-x-1"/></span></Link>)}</div></div></section>
 </main>
}
