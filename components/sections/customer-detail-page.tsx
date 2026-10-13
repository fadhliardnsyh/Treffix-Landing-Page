"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { copy, products, type Copy, type Lang } from "@/components/content";
import { customerBenefits, customerLogos, customerMenuGroups, type CustomerPageData } from "@/components/content/customers";
import { FaqSection } from "@/components/sections/faq-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Reveal } from "@/components/ui/reveal";

export function CustomerDetailPage({ page, language }: { page: CustomerPageData; language: Lang }) {
  const audience = customerMenuGroups.flatMap((group) => group.items).find((item) => item.slug === page.slug)!;
  const group = customerMenuGroups.find((item) => item.id === page.group)!;
  const localized = page[language];
  const reduceMotion = useReducedMotion() ?? false;
  const tabBaseId = useId();
  const featureOptions = page.products.flatMap((productId) => {
    const product = products.find((item) => item.id === productId)!;
    return product.points[language].map((label, index) => ({ id: `${productId}-${index}`, product, label }));
  });
  const [activeFeatureId, setActiveFeatureId] = useState(featureOptions[0]?.id ?? "");
  const activeFeature = featureOptions.find((feature) => feature.id === activeFeatureId) ?? featureOptions[0];
  const faqBase = copy[language];
  const faqContent: Copy = {
    ...faqBase,
    faqTitle: localized.faqTitle,
    faqText: localized.faqIntro,
    faq: page.faqIndexes.map((index) => faqBase.faq[index]!),
  };

  function handleFeatureKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % featureOptions.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + featureOptions.length) % featureOptions.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = featureOptions.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextFeature = featureOptions[nextIndex];
    setActiveFeatureId(nextFeature.id);
    document.getElementById(`${tabBaseId}-${nextFeature.id}`)?.focus();
  }

  return (
    <main id="main-content" className="overflow-clip bg-white text-[#10213d]">
      <section className="relative overflow-hidden bg-white pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-24 h-[min(72vw,740px)] w-[min(72vw,740px)] rounded-full bg-[radial-gradient(circle,rgba(11,117,255,.09),transparent_68%)]" />
        <div className="container-wide relative mx-auto">
          <nav aria-label={language === "id" ? "Breadcrumb" : "Breadcrumb"} className="mb-8 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
            <Link href={`/${language}`} className="rounded-sm transition-colors hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
              {language === "id" ? "Beranda" : "Home"}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${language}#${page.group === "role" ? "solutions" : "industries"}`} className="rounded-sm transition-colors hover:text-[var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
              {group.heading[language]}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-[#10213d]">{audience.label[language]}</span>
          </nav>

          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.88fr)] lg:gap-14">
            <div className="min-w-0">
              <Reveal>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--blue)]">
                  {language === "id" ? "SOLUSI UNTUK" : "SOLUTIONS FOR"} {audience.label[language]}
                </p>
                <h1 className="max-w-[720px] text-[clamp(2.65rem,5.6vw,5.4rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#071a35] [text-wrap:balance]">
                  {localized.title}
                </h1>
                <p className="mt-6 max-w-[610px] text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {localized.intro}
                </p>
                <a href="#customer-solution" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--blue)] px-6 text-[12px] font-semibold text-white shadow-[0_10px_24px_rgba(11,117,255,.2)] transition hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-500">
                  {language === "id" ? "Jelajahi solusi" : "Explore the solution"}
                  <ArrowDown size={15} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <figure className="relative aspect-[1.16] min-h-[280px] overflow-hidden rounded-[28px] bg-[#071a35] shadow-[0_26px_70px_rgba(7,26,53,.18)] sm:min-h-[380px] lg:aspect-[.98]">
                <Image src={page.image} alt={page.imageAlt[language]} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: page.imagePosition }} />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06142a]/75 via-transparent to-[#06142a]/5" />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/25 bg-[#071a35]/55 px-3.5 py-2 text-[10px] font-semibold tracking-[.1em] text-white backdrop-blur-sm sm:bottom-6 sm:left-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
                  {page.group === "role" ? (language === "id" ? "BERDASARKAN PERAN" : "BY ROLE") : (language === "id" ? "BERDASARKAN INDUSTRI" : "BY INDUSTRY")}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="customer-solution" className="bg-[#f5f8fc] py-20 sm:py-24 lg:py-28">
        <div className="container-wide mx-auto">
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--blue)]">{language === "id" ? "SOLUSI" : "THE SOLUTION"}</p>
              <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.08] tracking-[-.05em] text-[#071a35] [text-wrap:balance]">{localized.solutionTitle}</h2>
              <p className="mx-auto mt-5 max-w-[650px] text-sm leading-7 text-slate-600 sm:text-base">{localized.solutionIntro}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
            {customerBenefits[page.preset].map((benefit, index) => {
              const product = products.find((item) => item.id === benefit.product)!;
              const Icon = product.icon;
              return (
                <Reveal key={benefit.title.en} delay={index * 0.07} className="h-full">
                  <article className="flex h-full min-h-[290px] flex-col rounded-[22px] border border-[#e1eaf6] bg-white p-6 shadow-[0_10px_35px_rgba(16,43,82,.035)] sm:p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-[15px] border border-blue-100 bg-blue-50 text-[var(--blue)]"><Icon size={20} aria-hidden="true" /></span>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[.16em] text-[var(--blue)]">{product.id}</p>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-[-.03em] text-[#071a35]">{benefit.title[language]}</h3>
                    <p className="mt-3 text-[13px] leading-6 text-slate-600">{benefit.description[language]}</p>
                    <ul className="mt-auto border-t border-slate-100 pt-4">
                      {product.points[language].slice(index * 2, index * 2 + 2).map((point) => (
                        <li key={point} className="flex items-start gap-2 py-1 text-[12px] leading-5 text-slate-600"><Check size={14} className="mt-0.5 shrink-0 text-[var(--blue)]" aria-hidden="true" />{point}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111214] py-20 text-white sm:py-24 lg:py-28">
        <div className="container-wide mx-auto">
          <Reveal>
            <div className="max-w-[760px]">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--blue)]">{language === "id" ? "KEMAMPUAN PRODUK" : "PRODUCT CAPABILITIES"}</p>
              <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.08] tracking-[-.05em] text-white [text-wrap:balance]">{localized.featureTitle}</h2>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label={language === "id" ? "Fitur yang tersedia" : "Available features"}>
            {featureOptions.map((feature, index) => {
              const selected = feature.id === activeFeatureId;
              return (
                <button
                  key={feature.id}
                  id={`${tabBaseId}-${feature.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tabBaseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveFeatureId(feature.id)}
                  onKeyDown={(event) => handleFeatureKeyDown(event, index)}
                  className={`min-h-11 rounded-full border px-4 text-left text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-400 ${selected ? "border-[var(--blue)] bg-[var(--blue)] text-white" : "border-white/15 bg-white/[.04] text-white/70 hover:border-white/30 hover:text-white"}`}
                >
                  {feature.label}
                </button>
              );
            })}
          </div>
          {activeFeature && (
            <div id={`${tabBaseId}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${tabBaseId}-${activeFeature.id}`} className="mt-7 grid min-w-0 items-center gap-8 rounded-[26px] border border-white/10 bg-white/[.035] p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 sm:p-6 lg:grid-cols-[minmax(0,.9fr)_minmax(360px,1.1fr)] lg:gap-12 lg:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeFeature.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} aria-live="polite" className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--blue)]">{activeFeature.product.id}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-.035em] text-white sm:text-3xl">{activeFeature.label}</h3>
                  <p className="mt-4 max-w-[540px] text-[14px] leading-7 text-white/65">{activeFeature.product.desc[language]}</p>
                  <div className="mt-6 flex items-center gap-3 text-[12px] font-semibold text-white/80"><span className="h-px w-8 bg-[var(--blue)]" />{activeFeature.product.industry[language]}</div>
                </motion.div>
              </AnimatePresence>
              <div className="relative aspect-[1.35] min-h-[230px] overflow-hidden rounded-[20px] bg-[#071a35] sm:min-h-[300px]">
                <Image src={page.image} alt={page.imageAlt[language]} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: page.imagePosition }} />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#030a14]/40 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </section>

      <TestimonialsSection content={copy[language]} contactLink={process.env.NEXT_PUBLIC_TREFFIX_CONTACT_URL} />

      <FaqSection content={faqContent} />

      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="container-wide mx-auto">
          <Reveal>
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--blue)]">{language === "id" ? "DIPERCAYA PELANGGAN" : "CUSTOMER TRUST"}</p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-tight tracking-[-.045em] text-[#071a35]">{localized.trustTitle}</h2>
            </div>
          </Reveal>
          <ul aria-label={language === "id" ? "Logo pelanggan Treffix" : "Treffix customer logos"} className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {customerLogos.map((logo) => (
              <li key={logo.name} className="flex h-[84px] items-center justify-center rounded-2xl border border-slate-100 bg-white px-5 py-4">
                <Image src={logo.src} alt={logo.name} width={156} height={62} sizes="(min-width: 1024px) 16vw, 40vw" className="max-h-10 w-full object-contain" />
              </li>
            ))}
          </ul>
          <div className="mt-9 text-center">
            <Link href={`/${language}#solutions`} className="group inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[12px] font-semibold text-[var(--blue)] transition-colors hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
              {language === "id" ? "Kembali ke semua solusi" : "Explore all solutions"}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
