"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Check } from "lucide-react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { Copy, Lang } from "@/components/content";
import { products } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";

type Product = (typeof products)[number];
const PRODUCT_IMAGE_SCALE = { inactive: 1, active: 1.08 };
const PRODUCT_IMAGE_TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export type SolutionsSectionOverride = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  products?: Partial<Record<Product["id"], {
    category?: string;
    title?: string;
    description?: string;
    points?: readonly string[];
  }>>;
};

export function SolutionsSection({
  content,
  language,
  contactLink,
  override,
}: {
  content: Copy;
  language: Lang;
  contactLink?: string;
  override?: SolutionsSectionOverride;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pendingProductIndexRef = useRef<number | null>(null);
  const activeProductIndexRef = useRef(0);
  const [activeProductId, setActiveProductId] = useState<Product["id"]>(products[0].id);
  const [entranceSequenceComplete, setEntranceSequenceComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const showcaseEntered = useInView(sectionRef, { once: true, amount: 0.01 });
  const easedScrollProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    mass: 0.9,
  });
  const productDescriptions: Record<Product["id"], string> = {
    FixTrack: "AI-POWERED FLEET INTELLIGENCE",
    FixWork: language === "en" ? "Integrated HRMS Solutions" : "Solusi HRMS Terintegrasi",
    FixSight: content.fixSightSectionEyebrow,
  };
  const activeProduct = products.find((product) => product.id === activeProductId) ?? products[0];
  const activeProductOverride = override?.products?.[activeProduct.id];
  const productCtas: Record<Product["id"], { primary: string; secondary: string }> = {
    FixTrack: { primary: content.fixTrackPrimaryCta, secondary: content.fixTrackSecondaryCta },
    FixWork: { primary: content.fixWorkPrimaryCta, secondary: content.fixWorkSecondaryCta },
    FixSight: { primary: content.fixSightPrimaryCta, secondary: content.fixSightSecondaryCta },
  };
  const activeCtas = productCtas[activeProduct.id];
  const solutionsEyebrow = override?.eyebrow ?? content.solutionsEyebrow;
  const solutionsTitle = override?.title ?? content.solutionsTitle;
  const solutionsTitleLabel = solutionsTitle;
  const emphasizedTitlePhrase = language === "en"
    ? "More Efficient and Connected"
    : "Lebih Efisien dan Terhubung";
  const solutionsTitleParts = solutionsTitle.split(emphasizedTitlePhrase);

  useEffect(() => {
    if (!showcaseEntered || entranceSequenceComplete) return;
    const timeout = window.setTimeout(() => setEntranceSequenceComplete(true), 900);
    return () => window.clearTimeout(timeout);
  }, [showcaseEntered, entranceSequenceComplete]);

  function syncProductToProgress(index: number) {
    const direction = Math.sign(index - activeProductIndexRef.current);
    if (direction === 0) return;

    // Advance only one product per eased progress update, so large scroll
    // deltas still pass through the intermediate product in order.
    const nextIndex = activeProductIndexRef.current + direction;
    activeProductIndexRef.current = nextIndex;
    setActiveProductId(products[nextIndex]!.id);
  }

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(products.length - 1, Math.floor(Math.max(0, Math.min(0.9999, progress)) * products.length));
    const pendingIndex = pendingProductIndexRef.current;
    if (pendingIndex !== null) {
      const easedIndex = Math.min(products.length - 1, Math.floor(Math.max(0, Math.min(0.9999, easedScrollProgress.get())) * products.length));
      if (index !== pendingIndex || easedIndex !== pendingIndex) return;
      pendingProductIndexRef.current = null;
    }
  });

  useMotionValueEvent(easedScrollProgress, "change", (progress) => {
    const index = Math.min(products.length - 1, Math.floor(Math.max(0, Math.min(0.9999, progress)) * products.length));
    const pendingIndex = pendingProductIndexRef.current;
    if (pendingIndex !== null) {
      const rawProgress = scrollYProgress.get();
      const rawIndex = Math.min(products.length - 1, Math.floor(Math.max(0, Math.min(0.9999, rawProgress)) * products.length));
      if (rawIndex !== pendingIndex || index !== pendingIndex) return;
      pendingProductIndexRef.current = null;
    }
    syncProductToProgress(index);
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
    activeProductIndexRef.current = index;
    setActiveProductId(products[index]!.id);
  }, [scrollYProgress]);

  function scrollToProduct(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    const sectionStart = window.scrollY + section.getBoundingClientRect().top;
    const progressTarget = (index + 0.5) / products.length;
    pendingProductIndexRef.current = index;
    activeProductIndexRef.current = index;
    setActiveProductId(products[index]!.id);
    window.scrollTo({
      top: sectionStart + scrollRange * progressTarget,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id={override?.id ?? "solutions"}
      className="relative isolate min-h-[260svh] bg-[#111214] text-white sm:min-h-[300svh] lg:min-h-[340vh]"
    >
      <div className="container-wide sticky top-0 mx-auto flex min-h-svh flex-col justify-center pb-6 pt-[calc(68px+1rem)] sm:pb-8 sm:pt-[calc(68px+1.25rem)] lg:pb-12 lg:pt-[calc(68px+1.5rem)]">
        <motion.header
          initial={prefersReducedMotion || entranceSequenceComplete ? false : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion || showcaseEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,.8fr)] lg:items-end lg:gap-10"
        >
          <div>
            <p className="section-eyebrow mb-3 text-[10px] font-bold uppercase tracking-[.18em]">
              {solutionsEyebrow}
            </p>
            <h2 className="max-w-[760px] text-[clamp(1.6rem,3.2vw,3rem)] font-medium leading-[1.08] tracking-[-.05em]">
              {solutionsTitleParts.length === 2 ? (
                <>
                  {solutionsTitleParts[0]}
                  <span className="text-[var(--blue)]">{emphasizedTitlePhrase}</span>
                  {solutionsTitleParts[1]}
                </>
              ) : solutionsTitle}
            </h2>
          </div>
          <p className="max-w-[480px] text-sm leading-6 text-white/60 sm:text-base sm:leading-7 lg:justify-self-end">
            {override?.description ?? content.solutionsText}
          </p>
        </motion.header>

        <div className="mt-5 grid min-h-0 gap-7 sm:mt-7 sm:gap-8 lg:mt-9 lg:flex-1 lg:grid-cols-[minmax(280px,.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <div className="flex min-w-0 flex-col justify-center lg:py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                aria-live="polite"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion || showcaseEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                exit={prefersReducedMotion ? undefined : {
                  opacity: 0,
                  y: -6,
                  transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.22, delay: prefersReducedMotion || entranceSequenceComplete ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl lg:text-5xl">
                  {activeProduct.id}
                </h3>
                <p className="mt-4 max-w-[520px] text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
                  {activeProductOverride?.description ?? activeProduct.desc[language]}
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:mt-7">
                  {(activeProductOverride?.points ?? activeProduct.points[language]).map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-6 text-white/80 sm:text-[15px]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--blue)]/25 bg-[var(--blue)]/10 text-[var(--blue)]">
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  initial={prefersReducedMotion || entranceSequenceComplete ? false : { opacity: 0, y: 8 }}
                  animate={prefersReducedMotion || showcaseEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.32, delay: prefersReducedMotion || entranceSequenceComplete ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap"
                >
                  <ButtonLink
                    href="https://fixtrack.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-12 w-full px-4 text-center text-xs leading-5 sm:w-auto"
                  >
                    {activeCtas.primary}
                  </ButtonLink>
                  <ButtonLink
                    href={contactLink || "#contact"}
                    variant="secondary"
                    className="min-h-12 w-full px-4 text-center text-xs leading-5 sm:w-auto"
                  >
                    {activeCtas.secondary}
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={prefersReducedMotion || entranceSequenceComplete ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion || showcaseEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion || entranceSequenceComplete ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <div
              role="group"
              aria-label={solutionsTitleLabel}
              className="flex h-[min(54svh,470px)] min-h-[350px] min-w-0 gap-2 sm:h-[min(58svh,540px)] sm:min-h-[420px] sm:gap-3 lg:h-[min(64svh,580px)] lg:min-h-[460px]"
            >
              {products.map((product, index) => (
                <ProductAccordionCard
                  key={product.id}
                  product={product}
                  category={override?.products?.[product.id]?.category ?? productDescriptions[product.id]}
                  cardTitle={override?.products?.[product.id]?.title}
                  language={language}
                  active={activeProductId === product.id}
                  reducedMotion={prefersReducedMotion}
                  onSelect={() => scrollToProduct(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductAccordionCard({
  product,
  category,
  cardTitle,
  language,
  active,
  reducedMotion,
  onSelect,
}: {
  product: Product;
  category: string;
  cardTitle?: string;
  language: Lang;
  active: boolean;
  reducedMotion: boolean;
  onSelect: () => void;
}) {
  const [logoVisible, setLogoVisible] = useState(active);
  const [eyebrowVisible, setEyebrowVisible] = useState(active);
  const [headingVisible, setHeadingVisible] = useState(active);
  const isInitialMount = useRef(true);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (active) {
      if (reducedMotion) {
        setLogoVisible(true);
        setEyebrowVisible(true);
        setHeadingVisible(true);
      } else {
        setLogoVisible(false);
        setEyebrowVisible(false);
        setHeadingVisible(false);
        const containerOpenDuration = 700;
        const postOpenPause = 50;
        const revealStart = containerOpenDuration + postOpenPause;
        timers.push(setTimeout(() => setLogoVisible(true), revealStart));
        timers.push(setTimeout(() => setEyebrowVisible(true), revealStart + 90));
        timers.push(setTimeout(() => setHeadingVisible(true), revealStart + 180));
      }
    } else {
      if (reducedMotion) {
        setHeadingVisible(false);
        setEyebrowVisible(false);
        setLogoVisible(false);
      } else {
        setHeadingVisible(false);
        timers.push(setTimeout(() => setEyebrowVisible(false), 90));
        timers.push(setTimeout(() => setLogoVisible(false), 180));
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [active, reducedMotion]);

  return (
    <motion.div
      role="group"
      aria-label={`${product.id} product card`}
      className={`relative flex h-full min-h-0 min-w-11 shrink-0 overflow-hidden rounded-[18px] border text-left sm:min-w-[52px] lg:min-w-[58px] ${reducedMotion ? "" : "transition-[flex-basis,flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${active ? "basis-0 grow" : "basis-11 grow-0 sm:basis-[52px] lg:basis-[72px]"} ${active ? "border-[var(--blue)] bg-[var(--blue)]/[.12]" : "border-white/10 bg-[#191b1f] hover:border-white/25 hover:bg-[#202329]"}`}
      style={{ flexGrow: active ? 1 : 0, flexShrink: active ? 1 : 0 }}
    >
      <button
        type="button"
        aria-pressed={active}
        aria-label={`${product.id}: ${category}`}
        onClick={onSelect}
        className={`absolute inset-0 z-[5] cursor-pointer rounded-[18px] focus-visible:outline-none ${active ? "" : "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--blue)]"}`}
      />
      <motion.div
        aria-hidden="true"
        className={`absolute inset-0 ${reducedMotion ? "" : "transition-[filter,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${active ? "opacity-100 grayscale-0" : "opacity-55 grayscale brightness-[.8]"}`}
        animate={{ scale: active ? PRODUCT_IMAGE_SCALE.active : PRODUCT_IMAGE_SCALE.inactive }}
        transition={{ ...PRODUCT_IMAGE_TRANSITION, duration: reducedMotion ? 0 : PRODUCT_IMAGE_TRANSITION.duration }}
        style={{ transformOrigin: "center center" }}
      >
        <ProductVisual product={product} language={language} />
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35" animate={{ opacity: active ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" animate={{ opacity: active ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div
        aria-hidden="true"
        className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/20 p-1 shadow-lg backdrop-blur-sm ${reducedMotion ? "" : "transition-[left,margin-left] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${active ? "left-4 ml-0 sm:left-6 lg:left-8" : "left-1/2 -ml-5"}`}
        initial={reducedMotion || active ? false : { opacity: 0, y: -20 }}
        animate={logoVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProductMark product={product} />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 lg:p-8 xl:p-10">
        <motion.p
          aria-hidden={!eyebrowVisible}
          initial={reducedMotion || active ? false : { opacity: 0, y: 8 }}
          animate={eyebrowVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`section-eyebrow max-w-[520px] text-[9px] font-bold tracking-[.16em] sm:text-[10px] ${product.id === "FixWork" ? "uppercase" : ""}`}
        >
          {category}
        </motion.p>
        <motion.h3
          aria-hidden={!headingVisible}
          initial={reducedMotion || active ? false : { opacity: 0, y: 10 }}
          animate={headingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none mt-2 max-w-[520px] text-[clamp(1.1rem,2.2vw,1.65rem)] font-semibold leading-[1.12] tracking-[-.03em] text-white [text-wrap:balance]"
        >
          {cardTitle ?? (
            <>
              {product.title[language].before}
              <span>{product.title[language].highlight}</span>
              {product.title[language].after}
            </>
          )}
        </motion.h3>
      </div>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="rotate-180 whitespace-nowrap text-[11px] font-semibold tracking-[.08em] text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,.8)] [writing-mode:vertical-rl] sm:text-xs">
          {product.id}
        </span>
      </motion.span>
    </motion.div>
  );
}

const productVisuals: Record<Product["id"], string> = {
  FixTrack: "/solutions-photos/fixtrack-highway-fleet.webp",
  FixWork: "/solutions-photos/fixwork-team-collaboration.webp",
  FixSight: "/solutions-photos/fixsight-warehouse-ppe-detection.webp",
};

function ProductVisual({ product, language }: { product: Product; language: Lang }) {
  const imageAlt: Record<Product["id"], { en: string; id: string }> = {
    FixTrack: {
      en: "Freight truck traveling on a highway",
      id: "Truk kargo melaju di jalan raya",
    },
    FixWork: {
      en: "Colleagues collaborating around a laptop in an office",
      id: "Rekan kerja berkolaborasi di sekitar laptop di kantor",
    },
    FixSight: {
        en: "Fixed high-angle CCTV view of three warehouse workers wearing hard hats and high-visibility vests, with AI safety detection labels",
        id: "Tampilan CCTV sudut tinggi dari tiga pekerja gudang dengan helm dan rompi keselamatan, dilengkapi label deteksi keselamatan AI",
    },
  };
  const imagePosition: Record<Product["id"], string> = {
    FixTrack: "69% 50%",
    FixWork: "50% 52%",
    FixSight: "60% 50%",
  };

  return (
    <Image
      src={productVisuals[product.id]}
      alt={imageAlt[product.id][language]}
      fill
      sizes="(min-width: 1024px) 65vw, 100vw"
      className="object-cover object-center"
      style={{ objectFit: "cover", objectPosition: imagePosition[product.id] }}
      priority={product.id === "FixTrack"}
    />
  );
}

function ProductMark({ product }: { product: Product }) {
  if (product.logo) {
    return <Image src={product.logo} alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />;
  }
  return <Camera aria-hidden="true" className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.8} />;
}
