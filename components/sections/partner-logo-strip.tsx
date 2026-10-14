"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/components/content";

const logosPerBatch = 5;

export type PartnerLogo = {
  name: string;
  src: string;
};

export function PartnerLogoStrip({
  logos,
  language,
  active,
  ariaLabel,
}: {
  logos: PartnerLogo[];
  language: Lang;
  active?: boolean;
  ariaLabel?: string;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const batchCount = Math.ceil(logos.length / logosPerBatch);
  const currentBatchSize = Math.min(logosPerBatch, logos.length - batchIndex * logosPerBatch);
  const animationActive = active ?? isInView;
  const logoLabel = ariaLabel ?? (language === "id" ? "Logo mitra Treffix" : "Treffix client logos");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mobileQuery.matches);
    update();
    mobileQuery.addEventListener("change", update);
    return () => mobileQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (active !== undefined || isInView) return;
    const target = stripRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setIsInView(true);
      observer.disconnect();
    }, { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [active, isInView]);

  useEffect(() => {
    if (reduceMotion || isMobile || !animationActive || batchCount < 2) return;
    const interval = window.setInterval(() => {
      setBatchIndex((current) => (current + 1) % batchCount);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [animationActive, batchCount, isMobile, reduceMotion]);

  if (reduceMotion) {
    return (
      <ul
        aria-label={logoLabel}
        className="grid grid-cols-3 items-center justify-items-center gap-x-4 gap-y-5 md:hidden"
      >
        {logos.map((logo) => (
          <li key={logo.name} className="flex h-12 w-full items-center justify-center px-1">
            <img src={logo.src} alt={logo.name} decoding="async" className="max-h-8 max-w-full object-contain" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={stripRef}>
      <div
        role="region"
        aria-label={logoLabel}
        aria-roledescription="marquee"
        className="relative h-[76px] overflow-hidden md:hidden"
      >
        <div className="partner-marquee-track flex w-max items-center">
          {[0, 1].map((copyIndex) => (
            <ul
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-6 px-3"
            >
              {logos.map((logo) => (
                <li key={`${copyIndex}-${logo.name}`} className="flex h-14 w-32 shrink-0 items-center justify-center">
                  <img src={logo.src} alt={logo.name} decoding="async" className="max-h-10 max-w-[112px] object-contain" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="relative hidden h-[112px] overflow-hidden md:block lg:h-14">
        <AnimatePresence initial={false} mode="sync">
          <motion.ul
            key={batchIndex}
            aria-label={logoLabel}
            className={`absolute inset-0 grid grid-cols-2 items-center justify-items-center gap-x-3 gap-y-3 sm:gap-x-5 sm:gap-y-3 lg:gap-8 ${currentBatchSize < logosPerBatch ? "sm:grid-cols-4 lg:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-5"}`}
            initial={reduceMotion ? false : isMobile ? { y: "10%", opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: isMobile ? "-10%" : "-100%", opacity: isMobile ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : isMobile ? 0.24 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {logos
              .slice(batchIndex * logosPerBatch, (batchIndex + 1) * logosPerBatch)
              .map((logo) => (
                <li key={logo.name} className="flex min-h-10 w-full items-center justify-center sm:min-h-12">
                  <img src={logo.src} alt={logo.name} decoding="async" className="max-h-10 max-w-[160px] object-contain sm:max-h-12 sm:max-w-[200px]" />
                </li>
              ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
