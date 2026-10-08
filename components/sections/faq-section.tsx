"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, CircleHelp } from "lucide-react";
import type { Copy } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqSection({ content, contactLink }: { content: Copy; contactLink?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-wide grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow={content.faqEyebrow} title={content.faqTitle} />
          <ButtonLink href={contactLink || "#solutions"} variant="text" className="mt-5 min-h-11 gap-2 text-xs font-medium text-slate-600 hover:text-blue-700">
            <CircleHelp size={14} aria-hidden="true" />{contactLink ? content.talk : content.explore}
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-slate-100">
            {content.faq.map(([question, answer], index) => (
              <FaqItem
                key={question}
                question={question}
                answer={answer}
                open={openIndex === index}
                reduceMotion={Boolean(reduceMotion)}
                onToggle={() => setOpenIndex((current) => current === index ? null : index)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  open,
  reduceMotion,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  reduceMotion: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-1">
      <button className="flex min-h-[62px] w-full items-center justify-between gap-4 text-left" onClick={onToggle} aria-expanded={open}>
        <span className="text-[14px] font-semibold text-[#10213d]">{question}</span>
        <ChevronDown size={16} className={`shrink-0 text-blue-600 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
            className="overflow-hidden"
          >
            <p className="max-w-[690px] pb-5 pr-8 text-[13px] leading-6 text-slate-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
