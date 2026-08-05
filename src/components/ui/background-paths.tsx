"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function FloatingPath({ path, duration, delay }: { path: string; duration: number; delay: number }) {
    return (
        <motion.path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            }}
        />
    );
}

export function BackgroundPaths({ className }: { className?: string }) {
    return (
        <div className={cn("fixed inset-0 -z-50 pointer-events-none overflow-hidden", className)}>
            <svg className="w-full h-full text-primary" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <FloatingPath 
                    path="M0,200 Q250,100 500,200 T1000,200" 
                    duration={10} 
                    delay={0} 
                />
                <FloatingPath 
                    path="M0,500 Q250,600 500,500 T1000,500" 
                    duration={12} 
                    delay={2} 
                />
                <FloatingPath 
                    path="M0,800 Q250,700 500,800 T1000,800" 
                    duration={15} 
                    delay={4} 
                />
                
                {/* Vertical lines */}
                <FloatingPath 
                    path="M200,0 Q100,250 200,500 T200,1000" 
                    duration={14} 
                    delay={1} 
                />
                <FloatingPath 
                    path="M800,0 Q900,250 800,500 T800,1000" 
                    duration={16} 
                    delay={3} 
                />
            </svg>
        </div>
    );
}
