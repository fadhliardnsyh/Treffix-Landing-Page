"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Copy, Lang } from "@/components/content";
import { PartnerLogoStrip, type PartnerLogo } from "@/components/sections/partner-logo-strip";

const partnerWordmarks: PartnerLogo[] = [
  { name: "B-Log", src: "/client-logos/b-log-logo.webp" },
  { name: "Simpan Sini Aja", src: "/client-logos/ssa-logo.webp" },
  { name: "Fleetify", src: "/client-logos/fleetify-logo-bold.webp" },
  { name: "Sembilan Sejahtera", src: "/client-logos/sembilan-sejahtera-logo.webp" },
  { name: "Paus", src: "/client-logos/paus-logo.webp" },
  { name: "IBU", src: "/client-logos/ibu-logo-bold.webp" },
  { name: "KON", src: "/client-logos/kon-logo.webp" },
  { name: "DOM", src: "/client-logos/dom-logo-bold.webp" },
  { name: "GPB", src: "/client-logos/gpb-logo.webp" },
];

export function AboutSection({ content, language }: { content: Copy; language: Lang }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const partnerAreaRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [scrollPinned, setScrollPinned] = useState(false);
  const [revealReady, setRevealReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [partnerAreaInView, setPartnerAreaInView] = useState(false);
  const [mobileTextReady, setMobileTextReady] = useState(false);
  const [partnerAreaReady, setPartnerAreaReady] = useState(false);
  const titleLines = useMeasuredLines(titleRef, content.aboutTitle);
  const descriptionLines = useMeasuredLines(descriptionRef, content.aboutText);
  const reduceMotion = useReducedMotion() ?? false;
  const offset: ("start 85%" | "end end" | "start end" | "end start")[] = scrollPinned
    ? ["start 85%", "end end"]
    : ["start end", "end start"];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset });
  const revealProgress = useTransform(scrollYProgress, [0, isMobile ? 0.24 : 0.72], [0, 1], { clamp: true });
  const partnerAreaOpacity = useTransform(revealProgress, [0.78, 0.94], [0, 1]);
  const partnerAreaY = useTransform(revealProgress, [0.78, 0.94], [22, 0]);

  useMotionValueEvent(revealProgress, "change", (latest) => {
    const textReady = latest >= 0.9;
    setMobileTextReady((current) => current === textReady ? current : textReady);
    const isReady = latest >= (isMobile ? 0.05 : 0.94);
    setPartnerAreaReady((current) => current === isReady ? current : isReady);
  });

  useEffect(() => {
    setPartnerAreaReady(revealProgress.get() >= (isMobile ? 0.05 : 0.94));
  }, [isMobile, revealProgress]);

  useEffect(() => {
    if (!isMobile || partnerAreaInView) return;
    const target = partnerAreaRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setPartnerAreaInView(true);
      observer.disconnect();
    }, { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobile, partnerAreaInView]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 760px) and (hover: hover) and (pointer: fine)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setScrollPinned(query.matches && !reduceMotion);
      setIsMobile(mobileQuery.matches);
      setRevealReady(!reduceMotion);
    };
    update();
    query.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, [reduceMotion]);

  const titleParts = content.aboutTitle.match(/\S+|\s+/g) ?? [];
  const descriptionParts = content.aboutText.match(/\S+|\s+/g) ?? [];
  let titleWordIndex = 0;
  let descriptionWordIndex = 0;
  const totalLines = titleLines.count + descriptionLines.count;
  const linesMeasured = titleLines.measured && descriptionLines.measured;

  return (
    <section id="about" ref={sectionRef} className="about-reveal-section relative overflow-clip bg-white">
      <div className="about-reveal-stage flex min-h-[680px] items-center py-20 sm:py-24 lg:min-h-screen lg:py-16">
        <div className="container-wide relative mx-auto w-full">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[min(75vw,680px)] w-[min(75vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--blue)_5.5%,transparent),transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-[1120px] text-center">
            <h2
              ref={titleRef}
              aria-label={content.aboutTitle}
              className="mx-auto max-w-[1100px] text-[clamp(2.35rem,5.2vw,4.65rem)] font-medium leading-[1.12] tracking-[-.052em] [text-wrap:balance]"
            >
              {titleParts.map((part, index) => {
                if (/^\s+$/.test(part)) return <Fragment key={`title-space-${index}`}>{part}</Fragment>;
                const wordIndex = titleWordIndex++;
                return (
                  <ScrollWord
                    key={`title-word-${index}`}
                    className={wordIndex < 2 ? "text-[var(--blue)]" : undefined}
                    progress={revealProgress}
                    wordIndex={wordIndex}
                    lineIndex={titleLines.indexes[wordIndex] ?? 0}
                    totalLines={totalLines}
                    reduceMotion={reduceMotion}
                    revealReady={revealReady && linesMeasured}
                  >{part}</ScrollWord>
                );
              })}
            </h2>

            <p ref={descriptionRef} aria-label={content.aboutText} className="mx-auto mt-7 max-w-[810px] text-[14px] leading-7 text-slate-600 sm:mt-8 sm:text-[16px] sm:leading-8">
              {descriptionParts.map((part, index) => {
                if (/^\s+$/.test(part)) return <Fragment key={`description-space-${index}`}>{part}</Fragment>;
                const wordIndex = descriptionWordIndex++;
                return (
                  <ScrollWord
                    key={`description-word-${index}`}
                    progress={revealProgress}
                    wordIndex={wordIndex}
                    lineIndex={titleLines.count + (descriptionLines.indexes[wordIndex] ?? 0)}
                    totalLines={totalLines}
                    reduceMotion={reduceMotion}
                    revealReady={revealReady && linesMeasured}
                  >{part}</ScrollWord>
                );
              })}
            </p>

            <motion.div
              ref={partnerAreaRef}
              className="mx-auto mt-12 max-w-[1040px] sm:mt-16"
              style={isMobile
                ? undefined
                : reduceMotion || !revealReady || !linesMeasured
                  ? { opacity: 1, y: 0 }
                  : { opacity: partnerAreaOpacity, y: partnerAreaY }}
              animate={isMobile
                ? { opacity: partnerAreaInView && mobileTextReady ? 1 : 0, y: partnerAreaInView && mobileTextReady ? 0 : 8 }
                : undefined}
              transition={isMobile
                ? { duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }
                : undefined}
            >
              <h3 className="mb-6 text-center text-sm font-medium tracking-[-.02em] text-slate-600 sm:mb-7 sm:text-base">
                {content.partnersTitle}
              </h3>
              <PartnerLogoStrip logos={partnerWordmarks} language={language} active={partnerAreaReady} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useMeasuredLines<T extends HTMLElement>(
  containerRef: { current: T | null },
  text: string,
) {
  const [layout, setLayout] = useState<{ indexes: number[]; count: number; measured: boolean }>({
    indexes: [],
    count: 1,
    measured: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setLayout((current) => ({ ...current, measured: false }));

    let frame = 0;
    const measureLines = () => {
      const wordElements = Array.from(container.querySelectorAll<HTMLElement>("[data-about-word]"));
      const lineTops: number[] = [];
      const indexes = wordElements.map((element) => {
        const top = element.getBoundingClientRect().top;
        let lineIndex = lineTops.findIndex((lineTop) => Math.abs(lineTop - top) < 2);
        if (lineIndex < 0) {
          lineTops.push(top);
          lineIndex = lineTops.length - 1;
        }
        return lineIndex;
      });

      setLayout((current) => {
        const count = Math.max(1, lineTops.length);
        const unchanged = current.count === count
          && current.indexes.length === indexes.length
          && current.indexes.every((lineIndex, index) => lineIndex === indexes[index]);
        return unchanged && current.measured ? current : { indexes, count, measured: true };
      });
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measureLines);
    };

    scheduleMeasure();
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(container);
    window.addEventListener("resize", scheduleMeasure);
    document.fonts?.ready.then(scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [containerRef, text]);

  return layout;
}

function ScrollWord({
  children,
  className,
  progress,
  wordIndex,
  lineIndex,
  totalLines,
  reduceMotion,
  revealReady,
}: {
  children: string;
  className?: string;
  progress: MotionValue<number>;
  wordIndex: number;
  lineIndex: number;
  totalLines: number;
  reduceMotion: boolean;
  revealReady: boolean;
}) {
  const lineStep = 0.78 / Math.max(1, totalLines);
  const start = 0.08 + lineIndex * lineStep;
  const finish = Math.min(1, start + lineStep * 1.08);
  const opacity = useTransform(progress, [start, finish], [0, 1]);

  return (
    <motion.span
      data-about-word={wordIndex}
      className={`about-reveal-word inline-block align-baseline ${className ?? ""}`}
      style={{ opacity: reduceMotion || !revealReady ? 1 : opacity }}
    >
      {children}
    </motion.span>
  );
}
