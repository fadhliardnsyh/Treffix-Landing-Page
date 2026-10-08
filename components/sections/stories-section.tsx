import { ArrowUpRight } from "lucide-react";
import type { Copy } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function StoriesSection({ content }: { content: Copy }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-wide grid gap-10 lg:grid-cols-[.74fr_1.26fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={content.storiesEyebrow} title={content.storiesTitle} description={content.storiesText} />
        </Reveal>
        <Reveal delay={0.1}><StoryCard content={content} /></Reveal>
      </div>
    </section>
  );
}

function StoryCard({ content }: { content: Copy }) {
  return (
    <article className="relative overflow-hidden rounded-[22px] bg-[#071a35] p-6 text-white sm:p-9">
      <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-blue-600/20 blur-[70px]" />
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[11px] font-black tracking-[-.08em] text-[#071a35]">F</span>
          <div>
            <p className="text-sm font-semibold">{content.storyName}</p>
            <p className="mt-1 text-[9px] font-semibold tracking-[.15em] text-blue-200/65">{content.storyType}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] text-white/60">{content.storyTag}</span>
      </div>
      <div className="relative grid gap-8 pt-7 sm:grid-cols-[.9fr_1.1fr] sm:items-end">
        <div>
          <h3 className="text-[25px] font-semibold leading-tight tracking-[-.04em] sm:text-[30px]">{content.storyTitle}</h3>
          <ButtonLink href="#solutions" variant="secondary" className="mt-6 min-h-11 px-4 text-[11px]">
            {content.storyLink}<ArrowUpRight size={13} />
          </ButtonLink>
        </div>
        <p className="text-[12px] leading-6 text-blue-50/70">{content.storyDesc}</p>
      </div>
    </article>
  );
}
