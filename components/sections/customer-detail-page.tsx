"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { copy, products, type Copy, type Lang } from "@/components/content";
import { customerBenefits, customerLogos, customerMenuGroups, customerPages, type CustomerPageData } from "@/components/content/customers";
import { customerFeatureImages } from "@/components/content/customer-feature-images";
import { FaqSection } from "@/components/sections/faq-section";
import { PartnerLogoStrip } from "@/components/sections/partner-logo-strip";
import { SolutionsSection, type SolutionsSectionOverride } from "@/components/sections/solutions-section";
import { MotionProvider } from "@/components/ui/motion-provider";
import { Reveal } from "@/components/ui/reveal";

export function CustomerDetailPage({ page, language }: { page: CustomerPageData; language: Lang }) {
  const audience = customerMenuGroups.flatMap((group) => group.items).find((item) => item.slug === page.slug)!;
  const group = customerMenuGroups.find((item) => item.id === page.group)!;
  const localized = page[language];
  const reduceMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const heroFrameInsetX = useTransform(heroScrollProgress, [0, 0.72], ["0%", "6%"]);
  const heroFrameInsetY = useTransform(heroScrollProgress, [0, 0.72], ["0%", "4%"]);
  const heroRadius = useTransform(heroScrollProgress, [0, 0.72], ["0px", "28px"]);
  const heroImageScale = useTransform(heroScrollProgress, [0, 0.72], [1.04, 1.18]);
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "-6%"]);
  const heroContentY = useTransform(heroScrollProgress, [0, 0.72], ["0px", "-34px"]);
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.72], [1, 0.82]);
  const tabBaseId = useId();
  const featureOptions = page.products.flatMap((productId) => {
    const product = products.find((item) => item.id === productId)!;
    return product.points[language].map((label, index) => ({ id: `${productId}-${index}`, product, label }));
  });
  const [activeFeatureId, setActiveFeatureId] = useState(featureOptions[0]?.id ?? "");
  const activeFeature = featureOptions.find((feature) => feature.id === activeFeatureId) ?? featureOptions[0];
  const activeFeatureImage = activeFeature ? customerFeatureImages[activeFeature.id] : undefined;
  const solutionCopy = customerPages["business-owners-executives"][language];
  const solutionProductOverrides = customerBenefits.leadership.reduce<NonNullable<SolutionsSectionOverride["products"]>>((overrides, benefit, index) => {
    const product = products.find((item) => item.id === benefit.product)!;
    overrides[product.id] = {
      category: product.id.toUpperCase(),
      title: benefit.title[language],
      description: benefit.description[language],
      points: product.points[language].slice(index * 2, index * 2 + 2),
    };
    return overrides;
  }, {});
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
      <section
        ref={heroRef}
        className="relative h-[150svh] bg-white motion-reduce:h-svh"
      >
        <div className="sticky top-0 h-svh motion-reduce:relative motion-reduce:top-auto">
          <motion.div
            className="absolute inset-0 z-0 overflow-hidden bg-[#071a35] shadow-[0_30px_90px_rgba(0,0,0,.25)]"
            style={reduceMotion ? undefined : {
              left: heroFrameInsetX,
              right: heroFrameInsetX,
              top: heroFrameInsetY,
              bottom: heroFrameInsetY,
              borderRadius: heroRadius,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={reduceMotion ? undefined : { y: heroImageY, scale: heroImageScale }}
            >
              <Image
                src={page.image}
                alt={page.imageAlt[language]}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: page.imagePosition }}
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,20,.54)_0%,rgba(3,10,20,.42)_42%,rgba(3,10,20,.78)_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_srgb,var(--blue)_20%,transparent),transparent_58%)] mix-blend-screen" />

          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={reduceMotion ? undefined : {
              y: heroContentY,
              opacity: heroContentOpacity,
            }}
          >
            <div className="container-wide relative mx-auto flex h-full flex-col pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-14">
              <nav aria-label="Breadcrumb" className="pointer-events-auto flex flex-wrap items-center gap-2 text-[12px] text-white/70">
                <Link href={`/${language}`} className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]">
                  {language === "id" ? "Beranda" : "Home"}
                </Link>
                <span aria-hidden="true">/</span>
                <Link href={`/${language}#${page.group === "role" ? "solutions" : "industries"}`} className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]">
                  {group.heading[language]}
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="font-medium text-white">{audience.label[language]}</span>
              </nav>

              <div className="pointer-events-auto mx-auto flex w-full max-w-[960px] flex-1 flex-col items-center justify-center py-12 text-center sm:py-16">
                <p className="section-eyebrow mb-5 text-[10px] font-bold uppercase tracking-[.18em]">
                  {language === "id" ? "SOLUSI UNTUK" : "SOLUTIONS FOR"} {audience.label[language]}
                </p>
                <h1 className="max-w-[900px] text-[clamp(2.65rem,6vw,5.4rem)] font-semibold leading-[1.02] tracking-[-.055em] text-white [text-wrap:balance]">
                  {localized.title}
                </h1>
                <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-white/78 sm:text-base sm:leading-8">
                  {localized.intro}
                </p>
                <a href="#customer-solution" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--blue)] px-6 text-[12px] font-semibold text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--blue)_32%,transparent)] transition hover:bg-[var(--blue)] hover:text-white active:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--blue)]">
                  {language === "id" ? "Jelajahi solusi" : "Explore the solution"}
                  <ArrowDown size={15} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <MotionProvider>
        <SolutionsSection
          content={copy[language]}
          language={language}
          contactLink={process.env.NEXT_PUBLIC_TREFFIX_CONTACT_URL}
          override={{
            id: "customer-solution",
            eyebrow: language === "id" ? "SOLUSI" : "THE SOLUTION",
            title: solutionCopy.solutionTitle,
            description: solutionCopy.solutionIntro,
            products: solutionProductOverrides,
          }}
        />
      </MotionProvider>

      <section className="bg-white pb-12 pt-20 text-[#10213d] sm:pb-14 sm:pt-24 lg:pb-16 lg:pt-28">
        <div className="container-wide mx-auto">
          <Reveal>
            <div className="max-w-[760px]">
              <p className="section-eyebrow text-[10px] font-bold uppercase tracking-[.18em]">{language === "id" ? "KEMAMPUAN PRODUK" : "PRODUCT CAPABILITIES"}</p>
              <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.08] tracking-[-.05em] text-[#071a35] [text-wrap:balance]">{localized.featureTitle}</h2>
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
                  className={`min-h-11 rounded-full border px-4 text-left text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--blue)] ${selected ? "border-[var(--blue)]/45 bg-[var(--blue)]/10 text-[#071a35]" : "border-slate-200 bg-white text-slate-600 hover:border-[var(--blue)]/40 hover:bg-slate-50 hover:text-[#071a35]"}`}
                >
                  {feature.label}
                </button>
              );
            })}
          </div>
          {activeFeature && (
            <div id={`${tabBaseId}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${tabBaseId}-${activeFeature.id}`} className="mt-7 grid min-w-0 items-center gap-8 rounded-[26px] border border-slate-200 bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] sm:p-6 lg:grid-cols-[minmax(0,.9fr)_minmax(360px,1.1fr)] lg:gap-12 lg:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeFeature.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} aria-live="polite" className="min-w-0">
                  <p className="section-eyebrow text-[10px] font-bold uppercase tracking-[.16em]">{activeFeature.product.id}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-.035em] text-[#071a35] sm:text-3xl">{activeFeature.label}</h3>
                  <p className="mt-4 max-w-[540px] text-[14px] leading-7 text-slate-600">{activeFeature.product.desc[language]}</p>
                </motion.div>
              </AnimatePresence>
              <div className="relative aspect-[1.35] min-h-[230px] overflow-hidden rounded-[20px] bg-[#071a35] sm:min-h-[300px]">
                <AnimatePresence mode="wait" initial={false}>
                  {activeFeature && activeFeatureImage && (
                    <motion.div
                      key={activeFeature.id}
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.22 }}
                      className="absolute inset-0"
                    >
                      <Image src={activeFeatureImage.src} alt={activeFeatureImage.alt[language]} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#030a14]/40 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      <FaqSection content={faqContent} />

      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="container-wide mx-auto">
          <Reveal>
            <div className="mx-auto max-w-[780px] text-center">
              <p className="section-eyebrow text-[10px] font-bold uppercase tracking-[.18em]">{copy[language].clientLogosEyebrow}</p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-tight tracking-[-.045em] text-[#071a35]">{copy[language].clientLogosTitle}</h2>
              <p className="mx-auto mt-5 max-w-[680px] text-sm leading-7 text-slate-600 sm:text-base">{copy[language].clientLogosDescription}</p>
            </div>
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-[1040px]">
            <PartnerLogoStrip
              logos={customerLogos}
              language={language}
              ariaLabel={language === "id" ? "Logo pelanggan Treffix" : "Treffix customer logos"}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
