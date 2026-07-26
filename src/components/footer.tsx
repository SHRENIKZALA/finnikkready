"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { ScrollView } from "./scroll-view";

const wa="https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services.";

export default function FooterSection() {
  return (
    <footer className="border-t bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollView>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr_.9fr]">
            <div>
              <Image src="/brand/finnikk-logo.png" alt="FinniKK" width={300} height={100} className="h-14 w-auto object-contain dark:brightness-0 dark:invert"/>
              <p className="mt-6 max-w-md leading-7 text-muted-foreground">Integrated financial advisory, tax consulting, litigation, regulatory and corporate services for businesses navigating growth and complexity.</p>
              <a href={wa} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border bg-background px-5 py-3 text-sm font-medium transition hover:bg-muted"><MessageCircle className="size-4"/>Consult FinniKK</a>
            </div>
            <div>
              <p className="font-semibold">Explore</p>
              <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                <Link href="/#about" className="hover:text-foreground">About</Link><Link href="/services" className="hover:text-foreground">Services</Link><Link href="/#industries" className="hover:text-foreground">Industries</Link><Link href="/#leadership" className="hover:text-foreground">Leadership</Link><Link href="/#testimonials" className="hover:text-foreground">Client Perspectives</Link><Link href="/#contact" className="hover:text-foreground">Contact</Link>
              </div>
            </div>
            <div>
              <p className="font-semibold">Ahmedabad Office</p>
              <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0"/><span>Ahmedabad, Gujarat 382481, India</span></div>
                <a href="mailto:zalashrenik1811@gmail.com" className="flex gap-3 hover:text-foreground"><Mail className="mt-0.5 size-4 shrink-0"/><span>zalashrenik1811@gmail.com</span></a>
                <a href={wa} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-foreground"><MessageCircle className="mt-0.5 size-4 shrink-0"/><span>+91 74360 06208</span></a>
                <a href="https://www.google.com/maps/search/?api=1&query=Ahmedabad%20Gujarat%20382481" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-foreground">Open location in Maps <ArrowUpRight className="size-4"/></a>
              </div>
            </div>
          </div>
        </ScrollView>
        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} FinniKK. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Scaling Possibilities. Accelerating Growth.</p>
        </div>
      </div>
    </footer>
  );
}
