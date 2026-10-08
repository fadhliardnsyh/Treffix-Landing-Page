import { Activity, Globe2 } from "lucide-react";
import type { Copy } from "@/components/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection({ content }: { content: Copy }) {
  return (
    <section id="about" className="relative bg-white py-24 sm:py-32">
      <div className="container-wide grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow={content.aboutEyebrow} title={content.aboutTitle} />
          <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-slate-500">{content.aboutText}</p>
          <blockquote className="mt-9 border-l-2 border-blue-500 pl-5">
            <p className="text-[18px] font-medium leading-7 tracking-[-.02em] text-[#0a1c37] sm:text-[21px]">
              “{content.quote}”
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.12} className="flex items-center">
          <AboutSnapshot content={content} />
        </Reveal>
      </div>
    </section>
  );
}

function AboutSnapshot({ content }: { content: Copy }) {
  const stats = [
    { value: "2023", label: content.founded },
    { value: "4", label: content.solutions },
    { value: "ID", label: content.coverageStat },
  ];

  return (
    <div className="w-full rounded-[24px] border border-blue-100 bg-[#f4f8ff] p-6 sm:p-9">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-blue-600">TREFFIX</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-.03em] text-[#0a1c37]">{content.atGlance}</h3>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
          <Activity size={19} aria-hidden="true" />
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-blue-100">
        {stats.map((stat) => (
          <div key={stat.label} className="px-3 first:pl-0 last:pr-0 sm:px-6">
            <p className="text-[23px] font-semibold tracking-[-.06em] text-[#0a1c37] sm:text-[29px]">{stat.value}</p>
            <p className="mt-2 text-[10px] leading-4 text-slate-500 sm:text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between rounded-xl bg-white px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
            <Globe2 size={16} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-[#0a1c37]">Indonesia</p>
            <p className="mt-0.5 text-[10px] text-slate-500">{content.coverage}</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">{content.network}</span>
      </div>
    </div>
  );
}
