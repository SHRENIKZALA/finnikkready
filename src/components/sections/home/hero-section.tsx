"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const wa = "https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services.";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-2 -z-20 overflow-hidden rounded-[2rem] border lg:rounded-[3rem]">
        <video autoPlay loop muted playsInline preload="metadata" className="size-full object-cover opacity-45 dark:opacity-25 dark:invert">
          <source src="/hero-light.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(8,124,255,.10),transparent_38%),radial-gradient(circle_at_75%_60%,rgba(17,201,189,.08),transparent_30%)]" />

      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.55}} className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground sm:text-sm">
            Integrated Business Advisory
          </motion.p>

          <motion.h1
            initial={{opacity:0,y:28,filter:"blur(10px)"}}
            animate={{opacity:1,y:0,filter:"blur(0px)"}}
            transition={{duration:.9,ease:[.22,1,.36,1]}}
            className="finnikk-hero-title mt-6 text-balance text-[clamp(2.65rem,8vw,6.7rem)] font-semibold leading-[.95] tracking-[-.055em]"
          >
            <span>Scaling Possibilities.</span>
            <span className="mt-2 block">Accelerating Growth.</span>
          </motion.h1>

          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.28}} className="mx-auto mt-8 max-w-3xl text-pretty text-base leading-7 text-foreground/80 sm:text-lg md:text-xl md:leading-8">
            FinniKK is a full-service financial advisory, tax consulting, litigation and corporate legal firm helping businesses build, protect and optimize their operations.
          </motion.p>

          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.42}} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full rounded-xl px-7 sm:w-auto">
              <a href={wa} target="_blank" rel="noopener noreferrer">Consult FinniKK</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="w-full rounded-xl px-7 sm:w-auto">
              <Link href="#services">Explore Services</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
