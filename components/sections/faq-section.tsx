"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Copy } from "@/components/content";
import { Reveal } from "@/components/ui/reveal";

export function FaqSection({ content }: { content: Copy }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const faqColumns = [content.faq.slice(0, 3), content.faq.slice(3, 6)];
  const highlightedPhrase = content.faqTitle.startsWith("Find Out") ? "Find Out" : "Cari Tahu";
  const faqTitleParts = content.faqTitle.split(highlightedPhrase);

  return (
    <section className="bg-white py-20 text-[#101828] sm:py-24 lg:py-28">
      <div className="container-wide mx-auto">
        <Reveal>
          <div className="mx-auto mb-10 max-w-[760px] text-center sm:mb-14">
            <p className="mb-5 text-[10px] font-bold tracking-[.17em] text-blue-600">
              {content.faqEyebrow}
            </p>
            <h2 className="text-[37px] font-semibold leading-[1.1] tracking-[-.045em] text-[#101828] sm:text-[48px]">
              {faqTitleParts.length === 2 ? (
                <>
                  <span className="text-[var(--blue)]">{highlightedPhrase}</span>
                  {faqTitleParts[1]}
                </>
              ) : content.faqTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[680px] text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
              {content.faqText}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2 lg:gap-x-16">
            {faqColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="divide-y divide-slate-200">
                {column.map(([question, answer], itemIndex) => {
                  const index = columnIndex * 3 + itemIndex;
                  return (
                    <FaqItem
                      key={question}
                      index={index}
                      question={question}
                      answer={answer}
                      open={openIndex === index}
                      reduceMotion={Boolean(reduceMotion)}
                      onToggle={() => setOpenIndex((current) => current === index ? null : index)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({
  index,
  question,
  answer,
  open,
  reduceMotion,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  reduceMotion: boolean;
  onToggle: () => void;
}) {
  const triggerId = `faq-question-${index + 1}`;
  const answerId = `faq-answer-${index + 1}`;

  return (
    <div className="py-1">
      <button
        id={triggerId}
        type="button"
        className="flex min-h-[76px] w-full items-center justify-between gap-5 py-4 text-left sm:min-h-[82px]"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="text-[15px] font-medium leading-6 text-[#101828] sm:text-base sm:leading-7">{question}</span>
        <ChevronDown size={16} className={`shrink-0 text-slate-500 transition-transform duration-200 ease-out ${open ? "rotate-180 text-blue-600" : ""}`} aria-hidden="true" />
      </button>
      <motion.div
        id={answerId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-[620px] pb-5 pr-8 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-6">{answer}</p>
      </motion.div>
    </div>
  );
}
