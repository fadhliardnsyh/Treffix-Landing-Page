import { Activity, ArrowRight, Boxes, Check, Truck } from "lucide-react";
import type { Copy } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function IndustriesSection({ content, contactLink }: { content: Copy; contactLink?: string }) {
  const industries = [
    { name: content.logistics, description: content.logisticsText, icon: Boxes, number: "01" },
    { name: content.mobility, description: content.mobilityText, icon: Truck, number: "02" },
    { name: content.mining, description: content.miningText, icon: Activity, number: "03" },
  ];

  return (
    <section id="industries" className="bg-white py-20 sm:py-28">
      <div className="container-wide">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(260px,.7fr)] md:items-end md:gap-12">
            <SectionHeading eyebrow={content.industriesEyebrow} title={content.industriesTitle} className="max-w-[700px]" />
            <p className="max-w-[390px] pb-1 text-[15px] leading-7 text-slate-600 md:justify-self-end">{content.industriesText}</p>
          </div>
        </Reveal>
        <div className="mt-10 grid items-stretch gap-5 md:mt-12 md:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal key={industry.number} delay={index * 0.08} className="h-full">
              <IndustryCard industry={industry} needs={content.needs} content={content} contactLink={contactLink} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  needs,
  content,
  contactLink,
}: {
  industry: { name: string; description: string; icon: typeof Boxes | typeof Truck | typeof Activity; number: string };
  needs: string[];
  content: Copy;
  contactLink?: string;
}) {
  const Icon = industry.icon;

  return (
    <article className="group flex h-full min-h-[408px] flex-col rounded-[22px] border border-[#e5edf8] bg-[#f7faff] p-6 shadow-[0_3px_14px_rgba(16,43,82,.025)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#cbdcf3] hover:bg-[#f5f9ff] hover:shadow-[0_12px_32px_rgba(16,43,82,.075)] sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium tracking-[.12em] text-slate-500">{industry.number}<span className="mx-2 text-slate-300">/</span>03</span>
        <span className="grid h-12 w-12 place-items-center rounded-[15px] border border-blue-100 bg-white text-blue-600 shadow-[0_2px_7px_rgba(17,58,117,.06)]"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
      </div>
      <div className="mt-7">
        <h3 className="min-h-[3.5rem] max-w-[300px] text-[21px] font-semibold leading-[1.28] tracking-[-.03em] text-[#071a35] sm:text-[22px]">{industry.name}</h3>
        <p className="mt-2 min-h-[4.75rem] max-w-[34ch] text-[14px] leading-[1.7] text-slate-600">{industry.description}</p>
        <ul className="mt-5 border-t border-[#dce6f3] pt-4">
          {needs.map((need) => <li key={need} className="flex items-start gap-2.5 py-1.5 text-[13px] leading-5 text-slate-700"><Check size={15} className="mt-0.5 shrink-0 text-blue-600" strokeWidth={2.2} aria-hidden="true" />{need}</li>)}
        </ul>
      </div>
      <ButtonLink href={contactLink || "#solutions"} variant="text" className="group/link mt-auto w-fit gap-2 pt-3 text-[13px]">
        {contactLink ? content.talk : content.explore}<ArrowRight size={15} className="transition-transform duration-200 group-hover/link:translate-x-1" />
      </ButtonLink>
    </article>
  );
}
