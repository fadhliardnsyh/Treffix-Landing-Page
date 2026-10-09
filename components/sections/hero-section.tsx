import { ArrowDown, ArrowRight, Globe2 } from "lucide-react";
import type { Copy, Lang } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { HeroVideo } from "@/components/sections/hero-video";

export function HeroSection({ content, language }: { content: Copy; language: Lang }) {
  return (
    <section id="top" className="hero-section relative overflow-hidden bg-black text-white">
      <HeroVideo />
      <div aria-hidden="true" className="hero-video-overlay absolute inset-0" />

      <div className="hero-content container-wide relative z-10 flex items-center justify-center text-center">
        <div className="relative mx-auto max-w-[860px]">
          <Reveal>
            <div className="mb-7 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-2 text-[9px] font-semibold tracking-[.17em] text-white/85 backdrop-blur-sm sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {content.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto max-w-[850px] text-[clamp(2.7rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-[-.055em] [text-wrap:balance]">
              {content.heroA}
              <br />
              <span className="text-[var(--blue)]">{content.heroB}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[680px] text-[15px] leading-7 text-white/80 sm:text-[16px] sm:leading-8">
              {content.heroText}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="#solutions" className="group min-h-12 px-6 text-[13px]">
                {content.explore}
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="#about" variant="secondary" className="min-h-12 bg-black/25 px-5 text-[13px] backdrop-blur-sm hover:bg-black/40">
                {language === "id" ? "Kenali Treffix" : "Meet Treffix"}
                <ArrowDown size={14} />
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.29}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-center text-[11px] text-white/75">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                {content.heroProof}
              </span>
              <span className="hidden h-3 w-px bg-white/25 sm:block" />
              <span className="flex items-center gap-2">
                <Globe2 size={13} className="text-white/75" />
                {content.coverage}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="hero-trust container-wide relative z-10 flex items-center justify-center gap-5 border-t border-white/[.12] py-5 text-center text-[9px] font-semibold tracking-[.17em] text-white/70 sm:text-[10px]">
        <span className="h-px w-8 shrink-0 bg-white/70" />
        {content.trust}
        <span className="h-px w-8 shrink-0 bg-white/70" />
      </div>
    </section>
  );
}
