"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import type { Copy, Lang } from "@/components/content";
import { products } from "@/components/content";

type Product = (typeof products)[number];

export function SolutionsSection({
  content,
  language,
}: {
  content: Copy;
  language: Lang;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pendingProductIndexRef = useRef<number | null>(null);
  const [activeProductId, setActiveProductId] = useState<Product["id"]>(products[0].id);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const productDescriptions: Record<Product["id"], string> = {
    FixTrack: content.track,
    FixWork: content.work,
    FixSight: content.sight,
  };
  const solutionsTitleLines = content.solutionsTitle.split("\n");
  const solutionsTitleLabel = solutionsTitleLines.join(" ");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(products.length - 1, Math.floor(Math.max(0, Math.min(0.9999, progress)) * products.length));
    const pendingIndex = pendingProductIndexRef.current;
    if (pendingIndex !== null) {
      if (index !== pendingIndex) return;
      pendingProductIndexRef.current = null;
    }
    const nextId = products[index]!.id;
    setActiveProductId((current) => current === nextId ? current : nextId);
  });

  useEffect(() => {
    const interruptProgrammaticScroll = () => {
      pendingProductIndexRef.current = null;
    };
    const interruptWithKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        interruptProgrammaticScroll();
      }
    };

    window.addEventListener("wheel", interruptProgrammaticScroll, { passive: true });
    window.addEventListener("touchstart", interruptProgrammaticScroll, { passive: true });
    window.addEventListener("pointerdown", interruptProgrammaticScroll, { passive: true });
    window.addEventListener("keydown", interruptWithKey);
    return () => {
      window.removeEventListener("wheel", interruptProgrammaticScroll);
      window.removeEventListener("touchstart", interruptProgrammaticScroll);
      window.removeEventListener("pointerdown", interruptProgrammaticScroll);
      window.removeEventListener("keydown", interruptWithKey);
    };
  }, []);

  useEffect(() => {
    const progress = scrollYProgress.get();
    const index = Math.min(products.length - 1, Math.floor(Math.max(0, Math.min(0.9999, progress)) * products.length));
    setActiveProductId(products[index]!.id);
  }, [scrollYProgress]);

  function scrollToProduct(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    const sectionStart = window.scrollY + section.getBoundingClientRect().top;
    const progressTarget = (index + 0.5) / products.length;
    pendingProductIndexRef.current = index;
    setActiveProductId(products[index]!.id);
    window.scrollTo({
      top: sectionStart + scrollRange * progressTarget,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative isolate min-h-[210svh] bg-[#111214] text-white sm:min-h-[230svh] lg:min-h-[280vh]"
    >
      <div className="container-wide sticky top-0 mx-auto flex min-h-svh flex-col justify-center py-6 sm:py-8 lg:py-12">
        <header>
          <h2 className="w-full max-w-none text-[clamp(.9rem,5vw,4.25rem)] font-medium leading-[1.08] tracking-[-.05em]">
            {solutionsTitleLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">{line}</span>
            ))}
          </h2>
        </header>

        <div className="mt-5 grid min-h-0 gap-4 sm:mt-7 sm:gap-6 lg:mt-9 lg:flex-1 lg:grid-cols-[minmax(280px,.85fr)_minmax(0,1.5fr)] lg:items-center lg:gap-8">
          <aside className="flex flex-col justify-between gap-3 lg:h-[min(64svh,580px)] lg:py-2">
            <p className="hidden max-w-[420px] text-[14px] leading-7 text-white/60 lg:block">
              {language === "id"
                ? "Pilih solusi sesuai kebutuhan armada, pengelolaan karyawan, atau pemantauan area kerja."
                : "Choose a solution for fleet operations, employee management, or workplace monitoring."}
            </p>
            <div role="group" aria-label={solutionsTitleLabel} className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-0">
              {products.map((product, index) => {
                const active = activeProductId === product.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => scrollToProduct(index)}
                    className={`group flex min-h-11 min-w-0 items-center gap-2 border-b px-1 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 lg:min-h-[72px] lg:gap-4 lg:px-0 ${active ? "border-blue-400/70 text-white" : "border-white/10 text-white/45 hover:text-white/80"}`}
                  >
                    <span className={`shrink-0 font-mono text-[10px] tracking-[.12em] ${active ? "text-blue-400" : "text-white/35"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[11px] font-semibold sm:text-xs lg:text-sm">{product.id}</span>
                      <span className="mt-1 hidden text-[11px] leading-4 text-white/45 lg:block">{productDescriptions[product.id]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div
            role="group"
            aria-label={solutionsTitleLabel}
            className="flex h-[min(54svh,470px)] min-h-[350px] min-w-0 gap-2 sm:h-[min(58svh,540px)] sm:min-h-[420px] sm:gap-3 lg:h-[min(64svh,580px)] lg:min-h-[460px]"
          >
            {products.map((product, index) => (
              <ProductAccordionCard
                key={product.id}
                product={product}
                category={productDescriptions[product.id]}
                language={language}
                active={activeProductId === product.id}
                reducedMotion={prefersReducedMotion}
                onSelect={() => scrollToProduct(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductAccordionCard({
  product,
  category,
  language,
  active,
  reducedMotion,
  onSelect,
}: {
  product: Product;
  category: string;
  language: Lang;
  active: boolean;
  reducedMotion: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(active);
  const expandedRef = useRef(active);
  const [logoVisible, setLogoVisible] = useState(active);
  const [copyVisible, setCopyVisible] = useState(active);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (active) {
      const alreadyExpanded = expandedRef.current;
      expandedRef.current = true;
      setExpanded(true);
      if (reducedMotion) {
        setLogoVisible(true);
        setCopyVisible(true);
      } else {
        setLogoVisible(false);
        setCopyVisible(false);
        timers.push(setTimeout(() => {
          setLogoVisible(true);
          timers.push(setTimeout(() => setCopyVisible(true), 80));
        }, alreadyExpanded ? 80 : 180));
      }
    } else {
      setLogoVisible(false);
      setCopyVisible(false);
      if (reducedMotion) {
        expandedRef.current = false;
        setExpanded(false);
      } else {
        timers.push(setTimeout(() => {
          expandedRef.current = false;
          setExpanded(false);
        }, 80));
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [active, reducedMotion]);

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      aria-label={`${product.id}: ${category}`}
      onClick={onSelect}
      className={`relative flex h-full min-h-0 min-w-11 shrink-0 overflow-hidden rounded-[18px] border text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:min-w-[52px] lg:min-w-[58px] ${reducedMotion ? "" : "transition-[flex-basis,flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${expanded ? "basis-0 grow border-blue-400/35 bg-[#0b1a30]" : "basis-11 grow-0 border-white/10 bg-[#191b1f] hover:border-white/25 hover:bg-[#202329] sm:basis-[52px] lg:basis-[72px]"}`}
      style={{ flexGrow: expanded ? 1 : 0, flexShrink: expanded ? 1 : 0 }}
    >
      <motion.div
        aria-hidden="true"
        className={`absolute inset-0 ${reducedMotion ? "" : "transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${expanded ? "scale-100 opacity-100 grayscale-0" : "scale-110 opacity-55 grayscale brightness-[.8]"}`}
      >
        <ProductVisual product={product} />
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35" animate={{ opacity: expanded ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" animate={{ opacity: expanded ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div
        aria-hidden="true"
        className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/20 p-1 shadow-lg backdrop-blur-sm ${reducedMotion ? "" : "transition-[left,margin-left] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${expanded ? "left-4 ml-0 sm:left-6 lg:left-8" : "left-1/2 -ml-5"}`}
        initial={reducedMotion || active ? false : { opacity: 0, y: -20 }}
        animate={logoVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: reducedMotion ? 0 : logoVisible ? 0.42 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProductMark product={product} />
      </motion.div>
      <motion.div
        aria-hidden={!copyVisible}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 lg:p-8 xl:p-10"
        initial={reducedMotion || active ? false : { opacity: 0, y: 18 }}
        animate={copyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: reducedMotion ? 0 : copyVisible ? 0.42 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="max-w-[520px] text-[9px] font-bold tracking-[.16em] text-blue-200/80 sm:text-[10px]">{category}</p>
        <h3 className="mt-2 text-[clamp(1.8rem,4vw,3.3rem)] font-semibold leading-[1.02] tracking-[-.05em] text-white">{product.id}</h3>
        <p className="mt-2 max-w-[520px] text-[12px] leading-5 text-white/80 sm:mt-3 sm:text-[14px] sm:leading-6">
          {product.desc[language]}
        </p>
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
        animate={{ opacity: expanded ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="rotate-180 whitespace-nowrap text-[11px] font-semibold tracking-[.08em] text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,.8)] [writing-mode:vertical-rl] sm:text-xs">
          {product.id}
        </span>
      </motion.span>
    </motion.button>
  );
}

const productVisuals: Record<Product["id"], string> = {
  FixTrack: "/fixtrack-fleet.webp",
  FixWork: "/fixwork-workforce.webp",
  FixSight: "/fixsight-cctv.webp",
};

function ProductVisual({ product }: { product: Product }) {
  return (
    <Image
      src={productVisuals[product.id]}
      alt=""
      fill
      sizes="(min-width: 1024px) 65vw, 100vw"
      className="object-cover object-center"
      priority={product.id === "FixTrack"}
    />
  );
}

function ProductMark({ product }: { product: Product }) {
  if (product.id === "FixTrack") {
    return <Image src="/fixtrack-icon-blue.svg" alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />;
  }
  if (product.id === "FixWork") {
    return <Image src="/fixwork-blue.svg" alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />;
  }
  // Temporary product-mark placeholder until the official FixSight logo is available.
  return <Camera aria-hidden="true" className="h-5 w-5 text-blue-600" strokeWidth={1.8} />;
}
