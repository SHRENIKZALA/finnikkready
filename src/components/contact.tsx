"use client";
import { FormEvent } from "react";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { ScrollView } from "./scroll-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const services = [
  "Accounting & Financial Management",
  "Direct Taxation",
  "Indirect Taxation (GST & Customs)",
  "Litigation, Dispute Resolution & Regulatory Defense",
  "Business Setups & Incorporation",
  "Secretarial & Corporate Governance (ROC Compliance)",
  "Licenses, Registrations & Regulatory Filings",
  "Financial Advisory & Corporate Finance",
];

export default function Contact() {
  const submitWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello FinniKK, I would like to submit a consultation request.",
      "",
      `Name: ${form.get("name") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Service: ${form.get("service") || ""}`,
      `Message: ${form.get("message") || ""}`,
    ].join("\n");
    window.open(`https://wa.me/917436006208?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 md:py-32" id="contact">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollView>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
              <h2 className="mt-4 text-4xl font-medium">Start a conversation with FinniKK.</h2>
              <p className="mt-5 text-muted-foreground">Tell us what your business needs. Your request will open directly in WhatsApp so you can communicate with FinniKK.</p>
              <div className="mt-8 space-y-5">
                <a href="https://wa.me/917436006208" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><PhoneCall className="size-5"/>+91 74360 06208</a>
                <a href="mailto:zalashrenik1811@gmail.com" className="flex items-center gap-3"><Mail className="size-5"/>zalashrenik1811@gmail.com</a>
                <div className="flex items-center gap-3"><MapPin className="size-5"/>Ahmedabad, Gujarat 382481, India</div>
              </div>
            </div>
            <Card className="p-6 md:p-8">
              <form onSubmit={submitWhatsApp} className="space-y-5">
                <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required className="mt-2"/></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" required className="mt-2"/></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required className="mt-2"/></div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <select id="service" name="service" required defaultValue="" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </div>
                <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={5} required className="mt-2"/></div>
                <Button type="submit" className="w-full">Continue on WhatsApp</Button>
              </form>
            </Card>
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
