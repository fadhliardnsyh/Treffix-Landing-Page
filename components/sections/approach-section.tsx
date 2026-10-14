"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { Copy } from "@/components/content";

const ENTER_START = 0.56;
const ENTER_DURATION = 0.12;
const EXIT_START = 0.34;
const EXIT_DURATION = 0.12;
const INTRO_REVEAL_DURATION = 0.045;
const INTRO_ENTRY_OPACITY = 0.55;
const SCROLL_VH_PER_UNIT = 135;

function smoothProgress(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

function ApproachProgressRail({
  progress,
  introHold,
  steps,
  label,
  activeStep,
}: {
  progress: MotionValue<number>;
  introHold: number;
  steps: Copy["approachSteps"];
  label: string;
  activeStep: number;
}) {
  const fillProgress = useTransform(progress, (position) =>
    Math.max(0, Math.min(1, (position - introHold - ENTER_START) / Math.max(1, steps.length - 1))),
  );

  return (
    <div className="relative w-[min(16rem,72vw)]">
      <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-slate-200" />
      <motion.span
        aria-hidden="true"
        className="absolute left-[12.5%] top-[11.5px] h-px w-3/4 origin-left bg-[var(--blue)]"
        style={{ scaleX: fillProgress }}
      />
      <ol aria-label={label} className="relative grid grid-cols-4 items-center">
        {steps.map((step, index) => {
          const completed = index < activeStep;
          const current = index === activeStep;
          const tone = completed || current
            ? "border-[var(--blue)] bg-[var(--blue)] text-white"
            : "border-slate-300 bg-white text-slate-400";

          return (
            <li key={step.title} aria-current={current ? "step" : undefined} className="relative z-10 flex justify-center">
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold tabular-nums transition-[background-color,border-color,color,box-shadow] duration-200 ${tone} ${current ? "shadow-[0_0_0_4px_color-mix(in_srgb,var(--blue)_10%,transparent),0_0_14px_color-mix(in_srgb,var(--blue)_20%,transparent)]" : ""}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="sr-only">{step.title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ApproachScene({
  step,
  index,
  stepCount,
  introHold,
  introEyebrow,
  introTitle,
  introText,
  progress,
  current,
}: {
  step?: Copy["approachSteps"][number];
  index: number;
  stepCount: number;
  introHold: number;
  introEyebrow: string;
  introTitle: string;
  introText: string;
  progress: MotionValue<number>;
  current: boolean;
}) {
  const stepPosition = progress;
  const sceneProgress = (position: number) => {
    const entering = index === 0
      ? INTRO_ENTRY_OPACITY + (1 - INTRO_ENTRY_OPACITY) * smoothProgress(position / INTRO_REVEAL_DURATION)
      : smoothProgress((position - (introHold + index - 1 + ENTER_START)) / ENTER_DURATION);
    const exiting = index === stepCount
      ? 1
      : 1 - smoothProgress((position - (introHold + index + EXIT_START)) / EXIT_DURATION);
    return { entering, exiting, opacity: Math.min(entering, exiting) };
  };
  const opacity = useTransform(stepPosition, (position) => sceneProgress(position).opacity);
  const y = useTransform(stepPosition, (position) => {
    const { entering, exiting } = sceneProgress(position);
    if (entering < 1) return (1 - entering) * 16;
    if (exiting < 1) return -(1 - exiting) * 16;
    return 0;
  });
  const introScale = useTransform(stepPosition, (position) => {
    if (index !== 0) return 1;
    const exiting = smoothProgress((position - (introHold + EXIT_START)) / EXIT_DURATION);
    return 1 + exiting * 0.045;
  });
  const emphasizedIntroPhrase = introTitle.startsWith("A clearer path") ? "clearer path" : "Langkah Jelas";
  const introTitleParts = introTitle.split(emphasizedIntroPhrase);

  return (
    <motion.article
      aria-current={current ? "step" : undefined}
      aria-hidden={!current}
      className="absolute inset-0 mx-auto flex w-full max-w-[1120px] flex-col items-center justify-center overflow-hidden px-[6vw] py-8 sm:px-10 lg:px-14"
      style={{ opacity, y }}
    >
      {step && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(68vw,620px)] w-[min(68vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--blue)_9%,transparent)_0%,color-mix(in_srgb,var(--blue)_3.5%,transparent)_42%,transparent_72%)] blur-2xl sm:h-[min(54vw,680px)] sm:w-[min(54vw,680px)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(12rem,48vw,40rem)] font-bold leading-none tracking-[-.1em] text-[#102744]/[.045] sm:text-[clamp(18rem,38vw,40rem)]"
          >
            {String(index).padStart(2, "0")}
          </span>
        </>
      )}
      <motion.div
        className="relative z-10 w-full max-w-[760px] text-center"
        style={{ scale: introScale, transformOrigin: "center center" }}
      >
        {step ? (
          <>
            <h3 className="mx-auto max-w-[850px] text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#101828] [text-wrap:balance] sm:text-[clamp(2.1rem,5.3vw,5.4rem)]">
              {step.title}
            </h3>
            <p className="mx-auto mt-4 max-w-[720px] text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {step.description}
            </p>
          </>
        ) : (
          <>
            <p className="section-eyebrow mb-5 text-[11px] font-bold uppercase tracking-[.18em] sm:text-xs">
              {introEyebrow}
            </p>
            <h2 id="approach-heading" className="mx-auto max-w-[760px] text-[clamp(2.2rem,8vw,4.5rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#101828] [text-wrap:balance] sm:text-[clamp(2.5rem,5vw,5rem)]">
              {introTitleParts.length === 2 ? (
                <>
                  {introTitleParts[0]}
                  <span className="text-[var(--blue)]">{emphasizedIntroPhrase}</span>
                  {introTitleParts[1]}
                </>
              ) : introTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {introText}
            </p>
          </>
        )}
      </motion.div>
    </motion.article>
  );
}

export function ApproachSection({ content }: { content: Copy }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const stepCount = content.approachSteps.length;
  const lastStep = Math.max(0, stepCount - 1);
  const introHold = 0.6;
  const timelineUnits = introHold + stepCount;
  const pinnedScrollVh = timelineUnits * SCROLL_VH_PER_UNIT;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const scrollTimelinePosition = useTransform(scrollYProgress, (value) => value * timelineUnits);
  const timelinePosition = useSpring(scrollTimelinePosition, {
    stiffness: 100,
    damping: 28,
    mass: 0.85,
    restDelta: 0.001,
    restSpeed: 0.01,
  });
  const progressOpacity = useTransform(timelinePosition, (position) =>
    smoothProgress((position - (introHold + ENTER_START)) / 0.1),
  );

  useMotionValueEvent(timelinePosition, "change", (position) => {
    const nextStep = Math.max(-1, Math.min(lastStep, Math.floor(position - introHold - ENTER_START - ENTER_DURATION)));
    setActiveStep((current) => current === nextStep ? current : nextStep);
  });

  useEffect(() => {
    const position = timelinePosition.get();
    setActiveStep(Math.max(-1, Math.min(lastStep, Math.floor(position - introHold - ENTER_START - ENTER_DURATION))));
  }, [introHold, lastStep, timelinePosition]);

  return (
    <section
      ref={sectionRef}
      id="approach"
      aria-labelledby="approach-heading"
      className="relative isolate bg-white text-[#101828]"
      style={{
        height: `calc(100svh + ${pinnedScrollVh}svh)`,
        backgroundImage: "linear-gradient(180deg, #050a12 0px, color-mix(in srgb, var(--blue) 5%, transparent) 48px, #ffffff 112px)",
      }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="relative flex h-full flex-col pb-16 pt-[calc(68px+1rem)] sm:pb-20 sm:pt-[calc(68px+1.5rem)]">
          <div className="relative z-10 flex min-h-0 flex-1 items-center px-[4vw] pt-5 sm:pt-7">
            <div className="relative mx-auto h-[min(74svh,48rem)] min-h-[min(62svh,400px)] w-full max-w-[1120px]">
              <ApproachScene
                index={0}
                stepCount={stepCount}
                introHold={introHold}
                introEyebrow={content.approachTitle}
                introTitle={content.approachIntroTitle}
                introText={content.approachIntroText}
                progress={timelinePosition}
                current={activeStep === -1}
              />
              {content.approachSteps.map((step, index) => (
                <ApproachScene
                  key={step.title}
                  step={step}
                  index={index + 1}
                  stepCount={stepCount}
                  introHold={introHold}
                  introEyebrow={content.approachTitle}
                  introTitle={content.approachIntroTitle}
                  introText={content.approachIntroText}
                  progress={timelinePosition}
                  current={activeStep === index}
                />
              ))}
            </div>
          </div>
          <motion.div
            aria-hidden={activeStep < 0}
            className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-8"
            style={{ opacity: progressOpacity }}
          >
            <ApproachProgressRail
              progress={timelinePosition}
              introHold={introHold}
              steps={content.approachSteps}
              label={content.approachTitle}
              activeStep={activeStep}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
