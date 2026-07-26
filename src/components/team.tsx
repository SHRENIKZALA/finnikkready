"use client";
import { motion } from "motion/react";
import { ScrollView } from "./scroll-view";
import { Check } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent overflow-hidden" id="leadership">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          Leadership
        </span>

        <ScrollView>
          <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
            <div className="sm:w-4/5">
              <h2 className="text-3xl font-bold sm:text-4xl">Managing Partner</h2>
            </div>
            <div className="mt-6 sm:mt-0">
              <p>
                Leadership at FinniKK is driven by strategic thinking, commercial
                understanding, disciplined execution, and a commitment to creating
                lasting value for every client we serve.
              </p>
            </div>
          </div>
        </ScrollView>

        <div className="mt-12 md:mt-20">
          <ScrollView stagger delay={0.02}>
            <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="space-y-7"
              >
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.22em] finnikk-gradient-text">
                    Excellence in Business Advisory
                  </p>
                  <h3 className="mt-3 text-3xl font-medium">
                    Business-first leadership. Long-term perspective.
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  The Managing Partner leads FinniKK with a sharp understanding of
                  business realities and a hands-on approach to complex financial,
                  taxation, regulatory, litigation, and corporate matters.
                </p>
                <p className="text-muted-foreground">
                  The focus is on turning complexity into clear action—anticipating
                  risks, strengthening decision-making, building lasting client
                  relationships, and creating measurable enterprise value.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    "Strategic thinker with a business-first approach",
                    "Trusted advisory mindset for entrepreneurs and enterprises",
                    "Commitment to integrity, excellence and long-term value",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-400/10">
                        <Check className="size-3.5 text-cyan-500" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="flex min-h-[500px] items-end justify-center"
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/leader-final.png"
                    alt="Shrenik Zala, Managing Partner at FinniKK"
                    className="block max-h-[560px] w-auto max-w-full object-contain object-bottom"
                  />
                  <div className="mt-5 text-center">
                    <h3 className="text-2xl font-semibold">Shrenik Zala</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Managing Partner</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollView>
        </div>
      </div>
    </section>
  );
}
