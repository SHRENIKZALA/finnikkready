import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/service-detail-page";
import { SERVICE_DETAILS } from "@/content/service-details";

export function generateStaticParams(){ return SERVICE_DETAILS.map((service)=>({slug:service.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const service=SERVICE_DETAILS.find(s=>s.slug===slug);
 return service ? {title:`${service.title} | FinniKK`,description:service.intro} : {};
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const service=SERVICE_DETAILS.find(s=>s.slug===slug);
 if(!service) notFound();
 const related=SERVICE_DETAILS.filter(s=>s.slug!==slug).slice(0,3);
 return <ServiceDetailPage service={service} related={related}/>;
}
