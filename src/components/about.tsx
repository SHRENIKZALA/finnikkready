import { Circle } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";

const ourPrinciples = [
  { title: "Strategic Growth", description: "Commercially grounded advice aligned with long-term enterprise value." },
  { title: "Integrated Advisory", description: "Finance, tax, regulatory and corporate matters viewed as one connected business picture." },
  { title: "Compliance Focus", description: "Structured processes designed to support strong, reliable regulatory compliance." },
  { title: "Tax Efficiency", description: "Thoughtful planning and execution focused on efficient, sustainable business outcomes." },
];

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-3xl space-y-6 text-center md:space-y-12">
          <ScrollView><h2 className="text-balance text-4xl font-medium lg:text-5xl">About Us</h2></ScrollView>
          <ScrollView>
            <div className="space-y-5">
              <p>FinniKK is a full-service financial advisory, tax consulting, litigation, and corporate legal firm. We partner with ambitious entrepreneurs, scaling enterprises, and established multinationals to build, protect, and optimize their business operations.</p>
              <p>We do more than just manage books and file returns—we serve as strategic growth partners. By bridging the gap between complex regulatory frameworks and commercial ambitions, FinniKK delivers integrated corporate solutions that ensure bulletproof compliance, tax efficiency, and long-term enterprise value.</p>
            </div>
          </ScrollView>
        </div>
        <ScrollView>
          <Image className="rounded-(--radius) grayscale-75 object-cover aspect-[16/9] w-full" src="/images/finnikk-meeting.png" alt="FinniKK" height="480" width="720" loading="lazy" />
        </ScrollView>
        <ScrollView>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {ourPrinciples.map((principle,index)=><div className="space-y-3" key={index}><div className="flex items-center gap-2"><Circle className="size-4"/><h3 className="text-sm font-medium">{principle.title}</h3></div><p className="text-muted-foreground text-sm">{principle.description}</p></div>)}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
