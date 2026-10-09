"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Copy, Lang } from "@/components/content";

const partnersPerBatch = 5;
const partnerWordmarks: PartnerWordmark[] = [
  { id: "b-log", name: "B-Log", logoSrc: "/client-logos/b-log-logo.webp" },
  { id: "simpan-sini", name: "Simpan Sini Aja", logoSrc: "/client-logos/ssa-logo.webp" },
  { id: "fleetify", name: "Fleetify", logoSrc: "/client-logos/fleetify-logo-bold.webp" },
  { id: "sembilan-sejahtera", name: "Sembilan Sejahtera", logoSrc: "/client-logos/sembilan-sejahtera-logo.webp" },
  { id: "paus", name: "Paus", logoSrc: "/client-logos/paus-logo.webp" },
  { id: "ibu", name: "IBU", logoSrc: "/client-logos/ibu-logo-bold.webp" },
  { id: "kon", name: "KON", logoSrc: "/client-logos/kon-logo.webp" },
  { id: "dom", name: "DOM", logoSrc: "/client-logos/dom-logo-bold.webp" },
  { id: "gpb", name: "GPB", logoSrc: "/client-logos/gpb-logo.webp" },
];

type PartnerWordmark = {
  id: string;
  name: string;
  logoSrc: string;
};

export function AboutSection({ content, language }: { content: Copy; language: Lang }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [scrollPinned, setScrollPinned] = useState(false);
  const [revealReady, setRevealReady] = useState(false);
  const [partnerAreaReady, setPartnerAreaReady] = useState(false);
  const [partnerBatchIndex, setPartnerBatchIndex] = useState(0);
  const titleLines = useMeasuredLines(titleRef, content.aboutTitle);
  const descriptionLines = useMeasuredLines(descriptionRef, content.aboutText);
  const reduceMotion = useReducedMotion() ?? false;
  const offset: ("start start" | "end end" | "start end" | "end start")[] = scrollPinned
    ? ["start start", "end end"]
    : ["start end", "end start"];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset });
  const revealProgress = useTransform(scrollYProgress, [0, 0.72], [0, 1], { clamp: true });
  const partnerAreaOpacity = useTransform(revealProgress, [0.78, 0.94], [0, 1]);
  const partnerAreaY = useTransform(revealProgress, [0.78, 0.94], [22, 0]);
  const partnerBatchCount = Math.ceil(partnerWordmarks.length / partnersPerBatch);
  const currentBatchSize = Math.min(partnersPerBatch, partnerWordmarks.length - partnerBatchIndex * partnersPerBatch);

  useMotionValueEvent(revealProgress, "change", (latest) => {
    const isReady = latest >= 0.94;
    setPartnerAreaReady((current) => current === isReady ? current : isReady);
  });

  useEffect(() => {
    setPartnerAreaReady(revealProgress.get() >= 0.94);
  }, [revealProgress]);

  useEffect(() => {
    if (reduceMotion || !partnerAreaReady || partnerBatchCount < 2) return;
    const interval = window.setInterval(() => {
      setPartnerBatchIndex((current) => (current + 1) % partnerBatchCount);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [partnerAreaReady, partnerBatchCount, reduceMotion]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 760px) and (hover: hover) and (pointer: fine)");
    const update = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setScrollPinned(query.matches && !reduceMotion && !prefersReducedMotion);
      setRevealReady(!reduceMotion && !prefersReducedMotion);
    };
    update();
    query.addEventListener("change", update);
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionQuery.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      reducedMotionQuery.removeEventListener("change", update);
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
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[min(75vw,680px)] w-[min(75vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(11,117,255,.055),transparent_70%)]" />
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
              className="mx-auto mt-12 max-w-[1040px] sm:mt-16"
              style={reduceMotion || !revealReady || !linesMeasured
                ? { opacity: 1, y: 0 }
                : { opacity: partnerAreaOpacity, y: partnerAreaY }}
            >
              <div className="relative h-[160px] overflow-hidden sm:h-[100px] lg:h-10">
                <AnimatePresence initial={false} mode="sync">
                  <motion.ul
                    key={partnerBatchIndex}
                    aria-label={language === "id" ? "Logo mitra Treffix" : "Treffix client logos"}
                    className={`absolute inset-0 grid grid-cols-2 items-center justify-items-center gap-x-5 gap-y-5 lg:gap-8 ${currentBatchSize < partnersPerBatch ? "sm:grid-cols-4 lg:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-5"}`}
                    initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {partnerWordmarks
                      .slice(partnerBatchIndex * partnersPerBatch, (partnerBatchIndex + 1) * partnersPerBatch)
                      .map((partner) => {
                        return (
                          <li key={partner.id} className="flex min-h-10 w-full items-center justify-center">
                            <img
                              src={partner.logoSrc}
                              alt={partner.name}
                              decoding="async"
                              className="max-h-9 max-w-[160px] object-contain grayscale opacity-75"
                            />
                          </li>
                        );
                      })}
                  </motion.ul>
                </AnimatePresence>
              </div>
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
  progress,
  wordIndex,
  lineIndex,
  totalLines,
  reduceMotion,
  revealReady,
}: {
  children: string;
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
      className="about-reveal-word inline-block align-baseline"
      style={{ opacity: reduceMotion || !revealReady ? 1 : opacity }}
    >
      {children}
    </motion.span>
  );
}
