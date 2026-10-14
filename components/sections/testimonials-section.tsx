"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star, UserRound } from "lucide-react";
import type { Copy } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";

const testimonialColumns = [
  {
    offset: "xl:pt-14",
    order: "order-2 xl:order-1",
    cards: [
      { company: "B-Log", logo: "/client-logos/b-log-logo.webp", height: "xl:min-h-[260px]" },
      { company: "Simpan Sini Aja", logo: "/client-logos/ssa-logo.webp", height: "xl:min-h-[236px]" },
    ],
  },
  {
    offset: "xl:pt-32",
    order: "order-3 xl:order-2",
    cards: [
      { company: "Fleetify", logo: "/client-logos/fleetify-logo-bold.webp", height: "xl:min-h-[228px]" },
      { company: "Paus", logo: "/client-logos/paus-logo.webp", height: "xl:min-h-[274px]" },
    ],
  },
  {
    offset: "xl:pt-24",
    order: "order-4 xl:order-4",
    cards: [
      { company: "KON", logo: "/client-logos/kon-logo.webp", height: "xl:min-h-[272px]" },
      { company: "IBU", logo: "/client-logos/ibu-logo-bold.webp", height: "xl:min-h-[226px]" },
    ],
  },
  {
    offset: "xl:pt-8",
    order: "order-5 xl:order-5",
    cards: [
      { company: "DOM", logo: "/client-logos/dom-logo-bold.webp", height: "xl:min-h-[236px]" },
      { company: "GPB", logo: "/client-logos/gpb-logo.webp", height: "xl:min-h-[266px]" },
    ],
  },
] as const;

export function TestimonialsSection({
  content,
  contactLink,
}: {
  content: Copy;
  contactLink?: string;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden bg-[#111214] text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--blue)_8%,transparent),transparent_52%)]" />
      <div className="container-wide relative mx-auto grid grid-cols-2 items-start gap-3 py-20 sm:gap-4 sm:py-24 md:grid-cols-3 xl:min-h-[940px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(380px,2.15fr)_minmax(0,1fr)_minmax(0,1fr)] xl:gap-4 xl:py-24">
        <div className="relative z-10 order-1 col-span-2 mx-auto flex max-w-[650px] flex-col items-center justify-center py-5 text-center md:col-span-3 xl:order-3 xl:col-span-1 xl:min-h-[760px] xl:py-0">
          <p className="section-eyebrow text-[10px] font-semibold uppercase tracking-[.2em] sm:text-[11px]">
            {content.testimonialsEyebrow}
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-.055em] [text-wrap:balance]"
          >
            {content.testimonialsTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-[530px] text-sm leading-6 text-white/65 sm:mt-6 sm:text-base sm:leading-7">
            {content.testimonialsText}
          </p>
          <ButtonLink
            href={contactLink || "#contact"}
            className="group mt-7 min-h-12 gap-2 px-5 text-xs sm:mt-8"
          >
            {content.testimonialsCta}
            <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ButtonLink>
          <p className="mt-5 max-w-[320px] text-[10px] leading-4 text-white/35">
            {content.testimonialsSampleTag}
          </p>
        </div>

        {testimonialColumns.map((column) => (
          <div
            key={column.cards[0].company}
            className={`relative flex flex-col gap-4 sm:gap-5 xl:min-w-0 ${column.offset} ${column.order}`}
          >
            {column.cards.map((card) => (
              <TestimonialCard
                key={card.company}
                company={card.company}
                logo={card.logo}
                height={card.height}
                activeCardId={activeCardId}
                onActiveChange={(id, active) => {
                  setActiveCardId((current) => active ? id : current === id ? null : current);
                }}
                content={content}
                reducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  company,
  logo,
  height,
  activeCardId,
  onActiveChange,
  content,
  reducedMotion,
}: {
  company: string;
  logo: string;
  height: string;
  activeCardId: string | null;
  onActiveChange: (id: string, active: boolean) => void;
  content: Copy;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const id = `testimonial-${company.toLowerCase().replace(/\s+/g, "-")}`;
  const flipped = hovered || focused || tapped;
  const subdued = activeCardId !== null && activeCardId !== id;

  useEffect(() => {
    onActiveChange(id, flipped);
  }, [flipped, id, onActiveChange]);

  return (
    <motion.button
      type="button"
      aria-pressed={flipped}
      aria-label={`${company}. ${content.testimonialsFlipHint}.`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={(event) => {
        if (event.detail === 0) return;
        setTapped((current) => !current);
      }}
      animate={{ opacity: subdued ? 0.48 : 1, scale: subdued ? 0.975 : 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block w-full min-h-[244px] ${height} rounded-[20px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]`}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block rounded-[20px]"
        animate={{ rotateY: flipped && !reducedMotion ? 180 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span aria-hidden={flipped} className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[20px] border border-white/[.07] bg-[#090a0c] px-4 py-4 text-center shadow-[0_16px_42px_rgba(0,0,0,.38)] [backface-visibility:hidden] sm:px-5 sm:py-5">
          <span className="flex h-10 w-full items-center justify-center px-2">
            <Image src={logo} alt={`${company} logo`} width={150} height={60} className="max-h-9 w-full object-contain opacity-80" style={{ filter: "brightness(0) invert(1)" }} />
          </span>
          <span className="mt-1 min-h-8 max-w-full text-center text-[11px] font-semibold leading-4 text-white/75 [text-wrap:balance]">
            {company}
          </span>
          <span className="mt-auto flex flex-col items-center text-center">
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-[var(--blue)]/15 bg-[var(--blue)]/[.08] text-[var(--blue)]">
              <UserRound size={19} strokeWidth={1.5} />
            </span>
            <span className="mt-2 block max-w-full text-[10px] font-semibold leading-4 text-white/85 [text-wrap:balance]">{content.testimonialsReviewerPlaceholder}</span>
            <span className="mt-0.5 block text-[9px] leading-4 text-white/45">{content.testimonialsRolePlaceholder}</span>
          </span>
        </span>

        <span aria-hidden={!flipped} className="absolute inset-0 flex flex-col overflow-hidden rounded-[20px] border border-[var(--blue)]/25 bg-[#f4f6fb] p-4 text-[#172033] shadow-[0_20px_50px_rgba(0,0,0,.45)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5">
          <span className="flex flex-col items-center gap-1">
            <span className="flex gap-0.5 text-[var(--blue)]" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill="currentColor" strokeWidth={1.4} />)}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[.1em] text-slate-500">{content.testimonialsSampleRating}</span>
          </span>
          <span className="my-auto py-3 text-center text-[12px] font-medium leading-[1.35rem] text-slate-700 sm:text-[13px]">
            “{content.testimonialsQuotePlaceholder}”
          </span>
          <span className="flex w-full flex-col items-center border-t border-slate-200 pt-2 text-center">
            <span className="text-[10px] font-semibold leading-4 text-slate-800">{content.testimonialsReviewerPlaceholder}</span>
            <span className="mt-0.5 text-[9px] leading-4 text-slate-500">{content.testimonialsRolePlaceholder}</span>
            <span className="mt-0.5 text-[9px] font-medium text-slate-600">{company}</span>
          </span>
        </span>
      </motion.span>
    </motion.button>
  );
}
