import { Camera, Route, Users } from "lucide-react";
import type { Copy } from "@/components/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [Route, Users, Camera];

export function WhySection({ content }: { content: Copy }) {
  return (
    <section className="bg-[#f4f8ff] py-24 sm:py-32">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow={content.whyEyebrow}
            title={content.whyTitle}
            description={content.whyText}
            className="max-w-[670px]"
          />
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.why.map((reason, index) => (
            <Reveal key={reason} delay={index * 0.06}>
              <WhyCard title={reason} description={content.whyDesc[index]} icon={reasons[index]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: (typeof reasons)[number];
}) {
  return (
    <article className="h-full rounded-2xl border border-blue-100/80 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(12,36,72,.08)]">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={17} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-[14px] font-semibold leading-5 text-[#10213d]">{title}</h3>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{description}</p>
    </article>
  );
}
