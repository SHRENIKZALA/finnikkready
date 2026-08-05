"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, MessageCircle, ArrowUpRight, Linkedin, Twitter, Github } from "lucide-react";
import { ScrollView } from "./scroll-view";
import { motion } from "motion/react";

const wa = "https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services.";

export default function FooterSection() {
  return (
    <footer className="relative border-t bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent blur-3xl -z-10" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <Image 
                src="/brand/finnikk-logo.png" 
                alt="FinniKK" 
                width={200} 
                height={60} 
                className="h-12 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Precision-engineered financial advisory, tax consulting, and corporate legal services for businesses navigating global complexity.
            </p>
            <div className="flex items-center gap-4">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                <MessageCircle size={18} />
                Consult FinniKK
              </a>
              <div className="flex items-center gap-2">
                {[Linkedin, Twitter, Github].map((Icon, i) => (
                  <a key={i} href="#" className="size-10 flex items-center justify-center rounded-xl border hover:bg-muted transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Expertise</Link></li>
                <li><Link href="/#leadership" className="hover:text-primary transition-colors">Leadership</Link></li>
                <li><Link href="/#approach" className="hover:text-primary transition-colors">Our Approach</Link></li>
                <li><Link href="/#contact" className="hover:text-primary transition-colors">Connect</Link></li>
              </ul>
            </div>
            
            <div className="sm:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Ahmedabad Office</h4>
              <div className="space-y-6 text-sm text-muted-foreground">
                <div className="flex gap-4">
                  <div className="size-10 shrink-0 flex items-center justify-center rounded-xl bg-muted">
                    <MapPin size={18} />
                  </div>
                  <p className="leading-relaxed">
                    Ahmedabad, Gujarat 382481, <br /> India
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 shrink-0 flex items-center justify-center rounded-xl bg-muted">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:zalashrenik1811@gmail.com" className="hover:text-primary transition-colors break-all">
                    zalashrenik1811@gmail.com
                  </a>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Ahmedabad%20Gujarat%20382481" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-primary group">
                  View on Map
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <p>© {new Date().getFullYear()} FinniKK. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
          <p className="text-primary">Scaling Possibilities. Accelerating Growth.</p>
        </div>
      </div>
    </footer>
  );
}
