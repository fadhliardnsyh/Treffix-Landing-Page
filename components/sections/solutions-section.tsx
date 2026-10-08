"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import type { Copy, Lang } from "@/components/content";
import { products } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Product = (typeof products)[number];

export function SolutionsSection({
  content,
  language,
  contactLink,
}: {
  content: Copy;
  language: Lang;
  contactLink?: string;
}) {
  const [activeProductId, setActiveProductId] = useState<Product["id"]>(products[0].id);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeProduct = products.find((product) => product.id === activeProductId) ?? products[0];
  const productDescriptions: Record<Product["id"], string> = {
    FixTrack: content.track,
    FixWork: content.work,
    FixSight: content.sight,
  };

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, productId: Product["id"]) {
    const currentIndex = products.findIndex((product) => product.id === productId);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % products.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + products.length) % products.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = products.length - 1;
    else return;

    event.preventDefault();
    const nextProduct = products[nextIndex];
    setActiveProductId(nextProduct.id);
    tabsRef.current?.querySelector<HTMLButtonElement>(`#solution-tab-${nextProduct.id}`)?.focus();
  }

  return (
    <section id="solutions" className="bg-[#f4f8ff] py-24 sm:py-32">
      <div className="container-wide">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,.85fr)] md:items-end md:gap-12">
            <SectionHeading
              eyebrow={content.solutionsEyebrow}
              title={content.solutionsTitle}
              className="max-w-[700px]"
            />
            <p className="max-w-[450px] text-[15px] leading-7 text-slate-600 md:justify-self-end">
              {content.solutionsText}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 rounded-[28px] border border-[#dce7f5] bg-white p-3 shadow-[0_18px_55px_rgba(18,57,105,.07)] sm:mt-12 sm:p-4">
            <div
              ref={tabsRef}
              role="tablist"
              aria-label={content.solutionsTitle}
              aria-orientation="horizontal"
              className="grid grid-cols-3 gap-1.5 rounded-[19px] bg-[#f2f6fc] p-1.5 mx-auto w-full max-w-[680px] sm:gap-2"
            >
              {products.map((product) => (
                <ProductTab
                  key={product.id}
                  product={product}
                  active={activeProductId === product.id}
                  onSelect={() => setActiveProductId(product.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, product.id)}
                />
              ))}
            </div>

            <div
              id="solution-panel"
              role="tabpanel"
              aria-labelledby={`solution-tab-${activeProduct.id}`}
              aria-live="polite"
              className="mt-3 rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                  className="grid overflow-hidden rounded-[22px] bg-white md:min-h-[430px] md:grid-cols-[minmax(0,1.08fr)_minmax(300px,.92fr)]"
                >
                  <ProductDetail
                    product={activeProduct}
                    category={productDescriptions[activeProduct.id]}
                    language={language}
                    content={content}
                    contactLink={contactLink}
                  />
                  <ProductVisual product={activeProduct} index={products.findIndex((product) => product.id === activeProduct.id)} reducedMotion={prefersReducedMotion} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductTab({
  product,
  active,
  onSelect,
  onKeyDown,
}: {
  product: Product;
  active: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const Icon = product.icon;
  const hasWhiteLogo = product.id === "FixWork";

  return (
    <button
      type="button"
      role="tab"
      id={`solution-tab-${product.id}`}
      aria-selected={active}
      aria-controls="solution-panel"
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={`group flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1 rounded-[14px] px-1.5 py-2 text-[11px] font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:min-h-14 sm:flex-row sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-[13px] ${active ? "bg-white text-[#0a1c37] shadow-[0_3px_12px_rgba(16,53,95,.09)]" : "text-slate-500 hover:bg-white/70 hover:text-[#0a1c37]"}`}
    >
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg transition-colors sm:h-7 sm:w-7 ${hasWhiteLogo ? "bg-blue-600" : active ? "bg-blue-50" : "bg-white/70 group-hover:bg-blue-50"}`}>
        {product.logo ? (
          <Image
            src={product.logo}
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
            className="h-[19px] w-[19px] object-contain sm:h-[21px] sm:w-[21px]"
          />
        ) : (
          <Icon size={15} strokeWidth={2.1} aria-hidden="true" className="text-blue-600" />
        )}
      </span>
      <span className="max-w-full truncate">{product.id}</span>
    </button>
  );
}

function ProductDetail({
  product,
  category,
  language,
  content,
  contactLink,
}: {
  product: Product;
  category: string;
  language: Lang;
  content: Copy;
  contactLink?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-9">
      <div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold">
          <span className="text-blue-600">{product.id}</span>
          <span aria-hidden="true" className="text-blue-300">/</span>
          <span className="text-slate-500">{category}</span>
        </div>
        <h3 className="mt-4 max-w-[560px] text-[28px] font-semibold leading-[1.12] tracking-[-.04em] text-[#0a1c37] sm:text-[34px] lg:text-[38px]">
          {product.title[language]}
        </h3>
        <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
          {product.desc[language]}
        </p>
      </div>

      <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2 md:mt-7">
        {product.points[language].map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-700">
            <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
              <Check size={11} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 sm:mt-auto sm:pt-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[.15em] text-slate-400">{content.industriesLabel}</p>
          <p className="mt-1.5 text-[12px] leading-5 text-slate-600">{product.industry[language]}</p>
        </div>
        <ButtonLink href={contactLink || "#industries"} variant="primary" className="group min-h-11 shrink-0 px-4 text-[12px]">
          {contactLink ? content.talk : content.industriesExplore}
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ButtonLink>
      </div>
    </div>
  );
}

function ProductVisual({ product, index, reducedMotion }: { product: Product; index: number; reducedMotion: boolean }) {
  return (
    <div className="relative min-h-[250px] overflow-hidden bg-[#071a35] text-white sm:min-h-[290px] md:m-2 md:rounded-[18px] lg:min-h-[340px]">
      {product.id !== "FixTrack" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full border border-white/[.07]" />
          <div className="absolute -right-2 -top-14 h-48 w-48 rounded-full border border-white/[.06]" />
          <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-blue-300/[.09]" />
          <div className="absolute inset-0 opacity-[.16]" style={{ backgroundImage: "radial-gradient(#72a8e8 1px, transparent 1px)", backgroundSize: "20px 20px", maskImage: "linear-gradient(to top right, black, transparent 70%)" }} />
        </div>
      )}

      <div className="relative z-10 flex min-h-[250px] flex-col justify-between p-5 sm:min-h-[290px] sm:p-7 md:min-h-[414px] lg:p-8">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[.15em] text-blue-200/80">{product.id}</span>
          <span className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1 text-[10px] font-semibold tracking-[.12em] text-white/70">{String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
        </div>
        <div className="relative flex flex-1 items-center justify-center py-4 sm:py-5">
          <ProductMotion product={product} reducedMotion={reducedMotion} />
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[.14em] text-white/55">{product.id.toUpperCase()}</p>
            <div aria-hidden="true" className="mt-2 h-[2px] w-10 rounded-full bg-blue-400" />
          </div>
          <span className="text-[11px] text-white/60">{product.id}</span>
        </div>
      </div>
    </div>
  );
}

function ProductMotion({ product, reducedMotion }: { product: Product; reducedMotion: boolean }) {
  if (product.id === "FixTrack") return <FixTrackMotion reducedMotion={reducedMotion} />;
  if (product.id === "FixWork") return <FixWorkMotion reducedMotion={reducedMotion} />;
  return <FixSightMotion reducedMotion={reducedMotion} />;
}

function FixTrackMotion({ reducedMotion }: { reducedMotion: boolean }) {
  const route = "M100 200 H130 Q150 200 150 180 V176 Q150 156 170 156 H230 H294 Q314 156 314 136 V110 Q314 90 334 90 H390 V72 H420 V236 Q420 256 400 256 H94 Q70 256 70 232 V220 Q70 200 90 200 H100";
  const roadNetwork = [
    route,
    "M24 90 H130 Q150 90 150 110 V136 Q150 156 170 156",
    "M230 156 V126 Q230 106 250 106 H314 Q334 106 334 90",
    "M314 136 H360 Q380 136 380 156 V236",
    "M94 256 V220 Q94 200 114 200 H130",
  ];
  const destinations = [
    { x: 70, y: 220, label: "Destination 1", labelX: 92, labelY: 224, anchor: "start" as const },
    { x: 230, y: 156, label: "Destination 2", labelX: 230, labelY: 132, anchor: "middle" as const },
    { x: 390, y: 72, label: "Destination 3", labelX: 390, labelY: 48, anchor: "middle" as const },
  ];

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 460 290" className="h-full max-h-[300px] w-full max-w-[470px]">
      <g fill="none" stroke="#102c51" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        {roadNetwork.map((road, index) => <path key={`road-base-${index}`} d={road} />)}
      </g>
      <g fill="none" stroke="#1b4679" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity=".95">
        {roadNetwork.map((road, index) => <path key={`road-center-${index}`} d={road} />)}
      </g>
      <path d={route} fill="none" stroke="#2563eb" strokeOpacity=".2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <motion.path
        d={route}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="7 11"
        animate={reducedMotion ? { strokeDashoffset: 0, opacity: 0.95 } : { strokeDashoffset: [0, -72], opacity: [0.75, 1] }}
        transition={{ duration: reducedMotion ? 0 : 3.2, repeat: reducedMotion ? 0 : Infinity, ease: "linear" }}
      />

      <g transform={reducedMotion ? "translate(100 200)" : undefined}>
        {!reducedMotion && <animateMotion dur="13s" repeatCount="indefinite" rotate="auto" path={route} />}
        <circle r="21" fill="none" stroke="#60a5fa" strokeWidth="1.4" opacity={reducedMotion ? ".24" : ".5"}>
          {!reducedMotion && (
            <>
              <animate attributeName="r" values="16;25;16" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.08;0.5" dur="2.5s" repeatCount="indefinite" />
            </>
          )}
        </circle>
        <circle r="14" fill="#2563eb" stroke="#bfdbfe" strokeWidth="1.8" />
        <path d="M-7 5-6-3Q-6-7-3-8L-2-11H2L3-8Q6-7 6-3L7 5Z" fill="#eff6ff" />
        <path d="M-4-4Q-4-6-2-7H2Q4-6 4-4L5-2H-5Z" fill="#60a5fa" />
        <path d="M-7 1H7" stroke="#1d4ed8" strokeWidth="1.3" />
      </g>

      {destinations.map((destination) => (
        <g key={destination.label}>
          <circle cx={destination.x} cy={destination.y} r="20" fill="#071a35" stroke="#3b82f6" strokeOpacity=".45" strokeWidth="1.4" />
          <circle cx={destination.x} cy={destination.y} r="15" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.5" />
          <image
            href="/fixtrack-icon-white.svg"
            x={destination.x - 10}
            y={destination.y - 10}
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
          />
          <text
            x={destination.labelX}
            y={destination.labelY}
            textAnchor={destination.anchor}
            fill="#93c5fd"
            fontFamily="Arial, sans-serif"
            fontSize="10"
            fontWeight="600"
            letterSpacing=".4"
          >
            {destination.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FixWorkMotion({ reducedMotion }: { reducedMotion: boolean }) {
  const nodes = [{ cx: 78, cy: 78, delay: 0.2 }, { cx: 282, cy: 78, delay: 0.8 }, { cx: 86, cy: 206, delay: 0.5 }, { cx: 274, cy: 206, delay: 1.1 }];
  const connections = "M180 132 78 78M180 132 282 78M180 132 86 206M180 132 274 206";
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 360 260" className="h-full max-h-[260px] w-full max-w-[360px] overflow-visible">
      <path d={connections} fill="none" stroke="#49627f" strokeWidth="1.5" />
      <motion.path d={connections} fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 8" animate={reducedMotion ? { opacity: 0.65 } : { opacity: [0.25, 0.8, 0.25] }} transition={{ duration: reducedMotion ? 0 : 3.2, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }} />
      {nodes.map((node) => (
        <motion.g key={`${node.cx}-${node.cy}`} animate={reducedMotion ? { y: 0 } : { y: [0, -3, 0] }} transition={{ duration: reducedMotion ? 0 : 2.8, delay: reducedMotion ? 0 : node.delay, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}>
          <circle cx={node.cx} cy={node.cy} r="17" fill="#102d50" stroke="#55708f" strokeWidth="1.5" />
          <circle cx={node.cx} cy={node.cy} r="5" fill="#93c5fd" />
        </motion.g>
      ))}
      <motion.circle cx="180" cy="132" r="39" fill="none" stroke="#60a5fa" strokeWidth="1.5" animate={reducedMotion ? { r: 48, opacity: 0.12 } : { r: [38, 54], opacity: [0.3, 0] }} transition={{ duration: reducedMotion ? 0 : 2.8, repeat: reducedMotion ? 0 : Infinity, ease: "easeOut" }} />
      <circle cx="180" cy="132" r="31" fill="#15385f" stroke="#6ba9ef" strokeOpacity=".7" strokeWidth="1.5" />
      <image href="/fixwork-white.svg" x="158" y="110" width="44" height="44" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

function FixSightMotion({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 360 260" className="h-full max-h-[260px] w-full max-w-[360px] overflow-visible">
      <rect x="85" y="66" width="190" height="142" rx="18" fill="#0b2140" stroke="#49627f" strokeWidth="1.5" />
      <path d="M143 66 154 51H207L218 66" fill="#102d50" stroke="#49627f" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="180" cy="137" r="32" fill="#102d50" stroke="#5f83aa" strokeWidth="2" />
      <circle cx="180" cy="137" r="16" fill="#173d68" stroke="#93c5fd" strokeOpacity=".8" strokeWidth="1.5" />
      <path d="M111 93h26M111 93v21M249 93h-26M249 93v21M111 181h26M111 181v-21M249 181h-26M249 181v-21" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      <motion.rect x="121" y="101" width="45" height="36" rx="5" fill="none" stroke="#60a5fa" strokeWidth="1.5" animate={reducedMotion ? { opacity: 0.65 } : { opacity: [0.3, 0.85, 0.3] }} transition={{ duration: reducedMotion ? 0 : 2.4, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }} />
      <motion.line x1="98" x2="262" y1={reducedMotion ? 137 : 90} y2={reducedMotion ? 137 : 90} stroke="#60a5fa" strokeOpacity=".75" strokeWidth="1.5" animate={reducedMotion ? { y1: 137, y2: 137, opacity: 0.35 } : { y1: [90, 188, 90], y2: [90, 188, 90], opacity: [0.2, 0.75, 0.2] }} transition={{ duration: reducedMotion ? 0 : 3.6, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }} />
    </svg>
  );
}


