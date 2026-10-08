"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowDownRight, Route, Users, Warehouse } from "lucide-react";
import type { Copy, Lang } from "@/components/content";
import { ProductOrbit } from "@/components/sections/product-orbit";
import { cancelInPageScrollAnimation, scrollWindowToY } from "@/components/ui/in-page-scroll";
import { Reveal } from "@/components/ui/reveal";

export function PlatformSection({ content, language }: { content: Copy; language: Lang }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktopStory = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isStickyStory = () => desktopStory.matches && !reducedMotion.matches;
    const wheelThreshold = 180;
    const touchThreshold = 72;
    const sectionEntryTolerance = 120;
    let frame = 0;
    let wheelTotal = 0;
    let wheelDirection = 0;
    let wheelConsumed = false;
    let wheelIdleTimer = 0;
    let touchLastY = 0;
    let touchTotal = 0;
    let touchDirection = 0;
    let touchConsumed = false;
    let transitioning = false;
    let transitionTimer = 0;

    const setStep = (step: number) => {
      activeStepRef.current = step;
      setActiveStep((current) => current === step ? current : step);
    };

    const getSectionProgress = () => {
      const scrollRange = section.offsetHeight - window.innerHeight;
      return scrollRange <= 0
        ? 0
        : Math.max(0, Math.min(1, -section.getBoundingClientRect().top / scrollRange));
    };

    const getStepScrollY = (step: number) => {
      const bounds = section.getBoundingClientRect();
      const sectionStart = window.scrollY + bounds.top;
      const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
      return sectionStart + scrollRange * (step / 2);
    };

    const isSectionActive = () => {
      const bounds = section.getBoundingClientRect();
      return isStickyStory()
        ? bounds.top <= sectionEntryTolerance && bounds.bottom >= window.innerHeight
        : bounds.top < window.innerHeight && bounds.bottom > 0;
    };

    const isOutwardAtBoundary = (direction: number) =>
      (activeStepRef.current === 0 && direction < 0) || (activeStepRef.current === 2 && direction > 0);

    const beginStepTransition = (nextStep: number) => {
      transitioning = true;
      setStep(nextStep);
      cancelInPageScrollAnimation();

      let duration = 0;
      if (isStickyStory()) {
        duration = scrollWindowToY(getStepScrollY(nextStep));
      }

      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        transitioning = false;
        if (isStickyStory()) setStep(Math.min(2, Math.round(getSectionProgress() * 2)));
      }, Math.max(260, duration + 180));
    };

    const alignToStoryEdge = (step: 0 | 2) => {
      if (transitioning) return;
      transitioning = true;
      cancelInPageScrollAnimation();
      const duration = scrollWindowToY(getStepScrollY(step));
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        transitioning = false;
        setStep(step);
      }, Math.max(260, duration + 180));
    };

    const scheduleWheelReset = () => {
      window.clearTimeout(wheelIdleTimer);
      wheelIdleTimer = window.setTimeout(() => {
        wheelTotal = 0;
        wheelDirection = 0;
        wheelConsumed = false;
      }, 300);
    };

    const updateStepFromScroll = () => {
      if (!isStickyStory() || transitioning) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setStep(Math.min(2, Math.round(getSectionProgress() * 2)));
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || !event.deltaY) return;
      const deltaScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      const deltaY = event.deltaY * deltaScale;
      const bounds = section.getBoundingClientRect();
      if (isStickyStory() && deltaY > sectionEntryTolerance && bounds.top > sectionEntryTolerance && bounds.top <= deltaY) {
        if (event.cancelable) event.preventDefault();
        wheelConsumed = true;
        scheduleWheelReset();
        alignToStoryEdge(0);
        return;
      }
      if (isStickyStory() && deltaY < 0 && bounds.bottom < window.innerHeight && window.innerHeight - bounds.bottom <= Math.abs(deltaY)) {
        if (event.cancelable) event.preventDefault();
        wheelConsumed = true;
        scheduleWheelReset();
        alignToStoryEdge(2);
        return;
      }
      if (!isSectionActive()) return;

      const direction = Math.sign(deltaY);
      if (isOutwardAtBoundary(direction)) return;

      if (isStickyStory() && event.cancelable) event.preventDefault();
      if (!transitioning && !wheelConsumed) cancelInPageScrollAnimation();
      scheduleWheelReset();
      if (transitioning || wheelConsumed) return;

      if (direction !== wheelDirection) {
        wheelTotal = 0;
        wheelDirection = direction;
      }
      wheelTotal += Math.abs(deltaY);
      if (wheelTotal < wheelThreshold) return;

      wheelConsumed = true;
      beginStepTransition(activeStepRef.current + direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      touchLastY = event.touches[0].clientY;
      touchTotal = 0;
      touchDirection = 0;
      touchConsumed = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      const delta = touchLastY - currentY;
      touchLastY = currentY;
      if (Math.abs(delta) < 1) return;

      const direction = Math.sign(delta);
      const bounds = section.getBoundingClientRect();
      if (isStickyStory() && direction > 0 && Math.abs(delta) > sectionEntryTolerance && bounds.top > sectionEntryTolerance && bounds.top <= Math.abs(delta)) {
        if (event.cancelable) event.preventDefault();
        touchConsumed = true;
        alignToStoryEdge(0);
        return;
      }
      if (isStickyStory() && direction < 0 && bounds.bottom < window.innerHeight && window.innerHeight - bounds.bottom <= Math.abs(delta)) {
        if (event.cancelable) event.preventDefault();
        touchConsumed = true;
        alignToStoryEdge(2);
        return;
      }
      if (!isSectionActive()) return;
      if (isOutwardAtBoundary(direction)) return;
      if (isStickyStory() && event.cancelable) event.preventDefault();
      if (!transitioning && !touchConsumed) cancelInPageScrollAnimation();
      if (transitioning || touchConsumed) return;

      if (direction !== touchDirection) {
        touchTotal = 0;
        touchDirection = direction;
      }
      touchTotal += Math.abs(delta);
      if (touchTotal < touchThreshold) return;

      touchConsumed = true;
      beginStepTransition(activeStepRef.current + direction);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (!isSectionActive()) return;

      const direction = event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey)
        ? 1
        : event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey) ? -1 : 0;
      if (!direction || isOutwardAtBoundary(direction)) return;

      if (isStickyStory() && event.cancelable) event.preventDefault();
      if (transitioning) return;
      beginStepTransition(activeStepRef.current + direction);
    };

    updateStepFromScroll();
    window.addEventListener("scroll", updateStepFromScroll, { passive: true });
    window.addEventListener("resize", updateStepFromScroll);
    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("scroll", updateStepFromScroll);
      window.removeEventListener("resize", updateStepFromScroll);
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(wheelIdleTimer);
      window.clearTimeout(transitionTimer);
    };
  }, [reduceMotion]);

  const steps = content.storySteps;

  return (
    <section ref={sectionRef} id="platform" className="scroll-story relative overflow-clip bg-black text-white lg:min-h-[260vh]">
      <div className="scroll-story__sticky container-wide relative grid items-center gap-12 py-24 sm:py-32 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[.88fr_1.12fr] lg:gap-20 lg:py-12">
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[.17em] text-[var(--blue)]">
              <span className="h-px w-7 bg-[var(--blue)]" />{content.ecosystemEyebrow}
            </p>
            <h2 className="max-w-[560px] text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-.045em] [text-wrap:balance]">{content.ecosystemTitle}</h2>
            <p className="mt-6 max-w-[510px] text-[14px] leading-7 text-white/70">{content.ecosystemText}</p>
          </Reveal>
          <div className="mt-8 min-h-[170px] sm:min-h-[150px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.24 }}
              >
                <p className="text-[10px] font-bold tracking-[.16em] text-[var(--blue)]">{steps[activeStep].label}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-.025em] text-white sm:text-2xl">{steps[activeStep].title}</h3>
                <p className="mt-2 max-w-[470px] text-[13px] leading-6 text-white/70">{steps[activeStep].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div role="group" aria-label={language === "id" ? "Tahapan cerita" : "Story steps"} className="flex items-center gap-2">
            {steps.map((step, index) => (
              <button
                key={step.label}
                type="button"
                aria-label={`${step.label}: ${step.title}`}
                aria-pressed={activeStep === index}
                onClick={() => {
                  activeStepRef.current = index;
                  setActiveStep(index);
                }}
                className={`micro-interaction grid h-11 min-w-11 place-items-center rounded-full border px-3 text-[10px] font-semibold transition-colors ${activeStep === index ? "border-[var(--blue)] bg-[var(--blue)] text-white" : "border-white/15 bg-white/[.04] text-white/60 hover:border-white/30"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-[11px] font-medium text-white/70">
            <ArrowDownRight size={15} aria-hidden="true" />{content.decisions}
          </p>
        </div>
        <Reveal delay={0.12}>
          <ProductOrbit
            activeStep={activeStep}
            language={language}
            onSelect={(step) => {
              activeStepRef.current = step;
              setActiveStep(step);
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
