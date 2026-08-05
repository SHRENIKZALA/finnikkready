"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";
import { TextEffect } from "@/components/motion-primitives/text-effect";

const wa = "https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services.";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 md:pt-32 mesh-gradient">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 -z-10 grid-overlay opacity-20 dark:opacity-10" />
      
      {/* Animated Background Circles */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] size-[50%] rounded-full bg-primary/20 blur-[120px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[20%] -right-[10%] size-[40%] rounded-full bg-teal-500/10 blur-[100px]" 
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 md:py-24 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-8"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Integrated Business Advisory
          </motion.div>

          <TextEffect
            per="word"
            preset="fade-in-blur"
            className="finnikk-hero-title text-balance text-[clamp(2.65rem,8vw,6.7rem)] font-semibold leading-[.95] tracking-[-.055em]"
          >
            Scaling Possibilities. Accelerating Growth.
          </TextEffect>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-8 max-w-3xl text-pretty text-base leading-7 text-foreground/80 sm:text-lg md:text-xl md:leading-8"
          >
            FinniKK is a full-service financial advisory, tax consulting, litigation and corporate legal firm helping businesses build, protect and optimize their operations.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="w-full rounded-2xl px-8 py-7 text-lg font-medium shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 sm:w-auto glow-primary">
              <a href={wa} target="_blank" rel="noopener noreferrer">Consult FinniKK</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-2xl px-8 py-7 text-lg font-medium border-2 hover:bg-primary/5 transition-all duration-300 sm:w-auto glass">
              <Link href="#services">Explore Services</Link>
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent relative overflow-hidden">
                <motion.div 
                  animate={{ y: [0, 48] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-white/50"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
