"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products, type Copy, type Lang } from "@/components/content";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";

const navIds = ["platform", "solutions", "industries", "about"];

export function SiteHeader({
  language,
  content,
  contactLink,
}: {
  language: Lang;
  content: Copy;
  contactLink?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const contactHref = contactLink || "#solutions";
  const headerRef = useRef<HTMLElement>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const solutionDescriptions: Record<(typeof products)[number]["id"], string> = {
    FixTrack: content.track,
    FixWork: content.work,
    FixSight: content.sight,
  };
  const solutionLabels = products.map((product) => ({
    name: product.id,
    description: solutionDescriptions[product.id],
    icon: product.icon,
    logo: product.logo,
  }));
  const solutionsMenuText = language === "en"
    ? {
        title: "Explore Treffix Solutions",
        supporting: "Connected tools for everyday operations",
        footer: "Find the right tools for your operation.",
        all: "View all solutions",
      }
    : {
        title: "Jelajahi Solusi Treffix",
        supporting: "Teknologi terhubung untuk operasional harian",
        footer: "Temukan solusi yang sesuai untuk operasional Anda.",
        all: "Lihat semua solusi",
      };

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!solutionsOpen && !menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSolutionsOpen(false);
      setMenuOpen(false);
      setMobileSolutionsOpen(false);
      if (solutionsOpen) solutionsTriggerRef.current?.focus();
      else mobileMenuTriggerRef.current?.focus();
    };
    const closeOnOutside = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setSolutionsOpen(false);
      setMenuOpen(false);
      setMobileSolutionsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutside);
    };
  }, [solutionsOpen, menuOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 text-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        initial={false}
        animate={{ opacity: isScrolled ? 1 : 0, height: isScrolled ? 120 : 190 }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, .76) 0%, rgba(0, 0, 0, .48) 38%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <motion.div
        data-site-header
        className="header-container relative z-10 flex items-center justify-between"
        initial={false}
        animate={{ height: isScrolled ? 56 : 68, paddingTop: isScrolled ? 8 : 4 }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrandLogo homeLabel={content.homeLabel} priority />

        <nav
          aria-label={content.primaryNav}
          className="hidden items-center gap-1 rounded-full border border-white/12 bg-black/20 p-1 md:flex"
        >
          {content.nav.map((item, index) => index === 1 ? (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) setSolutionsOpen(false);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSolutionsOpen(false);
              }}
            >
              <button
                ref={solutionsTriggerRef}
                type="button"
                aria-expanded={solutionsOpen}
                aria-controls="solutions-mega-menu"
                onClick={(event) => setSolutionsOpen(event.detail === 0 ? (open) => !open : true)}
                className="flex min-h-9 items-center gap-1 rounded-full px-3 text-[13px] text-white/70 transition-colors duration-200 hover:bg-white/[.08] hover:text-white active:bg-white/[.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48a5ff]"
              >
                {item}
                <ChevronDown size={13} aria-hidden="true" className={`transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    id="solutions-mega-menu"
                    role="region"
                    aria-label={item}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.985 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    style={{ width: "min(45rem, calc(100vw - 2rem))" }}
                  >
                    <div className="flex min-h-[240px] flex-col justify-between gap-5 rounded-2xl border border-white/12 bg-black/75 p-4 shadow-[0_24px_70px_rgba(0,0,0,.42)] ring-1 ring-white/[.04] backdrop-blur-sm">
                      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1">
                        <h2 className="text-sm font-semibold tracking-[-.01em] text-white/90">{solutionsMenuText.title}</h2>
                        <p className="text-[11px] text-white/45">{solutionsMenuText.supporting}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {solutionLabels.map(({ name, description, icon: Icon, logo }) => (
                          <a
                            key={name}
                            href="#solutions"
                            onClick={() => setSolutionsOpen(false)}
                            className="group flex min-h-[88px] w-full items-start gap-3 rounded-xl border border-transparent p-3 transition-colors duration-200 hover:border-white/10 hover:bg-white/[.06] active:bg-blue-400/10 focus-visible:border-blue-300/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#48a5ff]"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-blue-300/15 bg-blue-400/[.09] text-blue-200 transition-colors group-hover:bg-blue-400/[.15]">
                              {logo ? (
                                <Image src={logo} alt="" aria-hidden="true" width={28} height={28} className="h-7 w-7 object-contain" />
                              ) : Icon ? (
                                <Icon size={18} aria-hidden="true" />
                              ) : null}
                            </span>
                            <span className="min-w-0 pt-0.5">
                              <span className="block text-[13px] font-semibold text-white/90">{name}</span>
                              <span className="mt-1 block text-[11px] leading-[1.55] text-white/55">{description}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-1 pt-3">
                        <p className="text-[11px] text-white/50">{solutionsMenuText.footer}</p>
                        <a
                          href="#solutions"
                          onClick={() => setSolutionsOpen(false)}
                          className="group inline-flex min-h-9 items-center gap-2 rounded-full px-2 text-[11px] font-semibold text-blue-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48a5ff]"
                        >
                          {solutionsMenuText.all}
                          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a
              key={item}
              className="flex min-h-9 items-center rounded-full px-3 text-[13px] text-white/70 transition-colors duration-200 hover:bg-white/[.08] hover:text-white active:bg-white/[.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48a5ff]"
              href={`#${navIds[index]}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch language={language} label={content.switchLanguage} />
          <ButtonLink href={contactHref} variant="light" className="group min-h-11 px-5 text-[12px]">
            {contactLink ? content.talk : content.explore}
            <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitch language={language} label={content.switchLanguage} compact />
          <button
            ref={mobileMenuTriggerRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15"
            aria-label={menuOpen ? content.closeMenu : content.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label={content.primaryNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="absolute left-4 right-4 top-full z-10 mx-auto max-w-[26rem] overflow-hidden rounded-2xl border border-white/12 bg-black/75 shadow-[0_24px_70px_rgba(0,0,0,.42)] backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col p-3">
              {content.nav.map((item, index) => index === 1 ? (
                <div key={item} className="border-b border-white/[.06]">
                  <button
                    type="button"
                    aria-expanded={mobileSolutionsOpen}
                    onClick={() => setMobileSolutionsOpen((open) => !open)}
                    className="flex min-h-10 w-full items-center justify-between rounded-lg px-2 text-left text-sm text-white/75 transition-colors hover:bg-white/[.05] hover:text-white active:bg-white/[.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#48a5ff]"
                  >
                    {item}
                    <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.18 }}
                        className="overflow-hidden pb-2 pt-1"
                      >
                        <div className="space-y-1">
                        {solutionLabels.map(({ name, description, icon: Icon, logo }) => (
                          <a
                            key={name}
                            href="#solutions"
                            onClick={() => { setMenuOpen(false); setMobileSolutionsOpen(false); }}
                            className="group flex min-h-[60px] w-full items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition-colors duration-200 hover:border-white/10 hover:bg-white/[.06] active:bg-blue-400/10 focus-visible:border-blue-300/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#48a5ff]"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-blue-300/15 bg-blue-400/[.09] text-blue-200 transition-colors group-hover:bg-blue-400/[.15]">
                              {logo ? (
                                <Image src={logo} alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 object-contain" />
                              ) : Icon ? (
                                <Icon size={16} aria-hidden="true" />
                              ) : null}
                            </span>
                            <span>
                              <span className="block text-xs font-semibold text-white/90">{name}</span>
                              <span className="mt-0.5 block text-[10px] leading-4 text-white/50">{description}</span>
                            </span>
                          </a>
                        ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={item}
                  className="flex min-h-10 items-center rounded-lg border-b border-white/[.06] px-2 text-sm text-white/75 transition-colors hover:bg-white/[.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#48a5ff]"
                  href={`#${navIds[index]}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                className="button-primary micro-interaction mt-3 flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
                href={contactHref}
                onClick={() => setMenuOpen(false)}
              >
                {contactLink ? content.talk : content.explore}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitch({
  language,
  label,
  compact = false,
}: {
  language: Lang;
  label: string;
  compact?: boolean;
}) {
  return (
    <LayoutGroup id={compact ? "language-switch-mobile" : "language-switch-desktop"}>
      <div
        role="group"
        aria-label={label}
        className={`inline-flex shrink-0 items-center rounded-full border border-white/15 bg-black/20 p-1 ${compact ? "gap-0.5" : "gap-1"}`}
      >
        {(["id", "en"] as const).map((locale) => {
          const active = language === locale;
          const name = locale === "id" ? "Bahasa Indonesia" : "English";

          return (
            <Link
              key={locale}
              href={`/${locale}`}
              lang={locale}
              aria-label={name}
              aria-current={active ? "page" : undefined}
              className={`relative isolate grid ${compact ? "h-9 min-w-9 px-2" : "h-9 min-w-10 px-2.5"} place-items-center rounded-full text-[11px] font-semibold tracking-wide transition-colors ${active ? "text-[#071a35]" : "text-white/65 hover:text-white"}`}
            >
              {active && (
                <motion.span
                  layoutId="language-switch-active-pill"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm"
                  initial={{ opacity: 0, scale: 0.78 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
                />
              )}
              <motion.span
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 24 }}
              >
                {locale.toUpperCase()}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

