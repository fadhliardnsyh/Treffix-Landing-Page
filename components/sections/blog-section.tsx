"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Copy, Lang } from "@/components/content";
import { articles, articleHref } from "@/components/content/articles";
import { BlogArtwork } from "@/components/sections/blog-artwork";
import { SectionHeading } from "@/components/ui/section-heading";

type CarouselLayout = {
  pinned: boolean;
  distance: number;
  sectionHeight: number;
};

const initialLayout: CarouselLayout = { pinned: false, distance: 0, sectionHeight: 0 };

export function BlogSection({ content, language }: { content: Copy; language: Lang }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState(initialLayout);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const horizontalOffset = useTransform(scrollYProgress, [0, 1], [0, -layout.distance]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const measure = () => {
      const shouldPin = window.matchMedia("(min-width: 1024px) and (min-height: 760px) and (hover: hover) and (pointer: fine)").matches && !reduceMotion && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const pinned = shouldPin && distance > 0;
      const sectionHeight = pinned ? window.innerHeight + distance : 0;

      setLayout((current) => {
        if (
          current.pinned === pinned &&
          Math.abs(current.distance - distance) < 1 &&
          Math.abs(current.sectionHeight - sectionHeight) < 1
        ) return current;
        return { pinned, distance, sectionHeight };
      });
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionQuery.addEventListener("change", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      reducedMotionQuery.removeEventListener("change", measure);
    };
  }, [language, reduceMotion]);

  function handleCarouselKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    if (layout.pinned) {
      window.scrollBy({
        top: direction * Math.min(320, Math.max(220, layout.distance / 2)),
        behavior: reduceMotion ? "instant" : "smooth",
      });
    } else {
      viewportRef.current?.scrollBy({
        left: direction * (viewportRef.current.clientWidth * 0.72),
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }
  }

  function handleCardFocus(event: React.FocusEvent<HTMLAnchorElement>) {
    if (!layout.pinned) return;
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = event.currentTarget.closest<HTMLElement>("article");
    if (!section || !viewport || !track || !card) return;

    const cardBounds = card.getBoundingClientRect();
    const viewportBounds = viewport.getBoundingClientRect();
    if (cardBounds.left >= viewportBounds.left && cardBounds.right <= viewportBounds.right) return;

    const targetTravel = Math.min(
      layout.distance,
      Math.max(0, cardBounds.right - track.getBoundingClientRect().left - viewport.clientWidth),
    );
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({
      top: sectionTop + targetTravel,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={layout.pinned ? { height: `${layout.sectionHeight}px` } : undefined}
      className="blog-section-scroll relative bg-[#f4f8ff]"
    >
      <div className="blog-section-stage flex items-center py-20 sm:py-28">
        <div className="container-wide min-w-0">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={content.blogEyebrow}
              title={content.blogTitle}
              description={content.blogText}
              className="max-w-[900px] [&>h2]:max-w-[900px] [&>h2]:text-[clamp(2.35rem,4.2vw,3.75rem)] [&>h2]:leading-[1.07]"
            />
            <Link href={`/${language}/blog`} className="mb-1 inline-flex min-h-11 w-fit shrink-0 items-center gap-3 rounded-full border border-[#10213d]/50 px-5 text-[11px] font-medium text-[#10213d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-500">
              {content.blogViewAll}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div
            ref={viewportRef}
            role="region"
            aria-label={language === "id" ? "Korsel artikel" : "Article carousel"}
            aria-describedby="blog-carousel-instructions"
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
            className={`mt-8 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 sm:mt-10 ${layout.pinned ? "overflow-hidden" : "overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-3"}`}
          >
            <p id="blog-carousel-instructions" className="sr-only">
              {language === "id"
                ? "Gunakan tombol panah kiri dan kanan untuk menjelajahi artikel. Di layar sentuh, geser secara horizontal."
                : "Use the left and right arrow keys to browse articles. On touch screens, swipe horizontally."}
            </p>
            <motion.div
              ref={trackRef}
              style={{ x: layout.pinned ? horizontalOffset : 0 }}
              className="flex w-max gap-5"
            >
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="relative h-[430px] w-[clamp(278px,25vw,320px)] flex-none snap-start overflow-hidden rounded-2xl bg-[#06152a] shadow-[0_16px_40px_rgba(8,31,65,.12)] sm:h-[440px]"
                >
                  <Link
                    href={articleHref(language, article.slug)}
                    onFocus={handleCardFocus}
                  className="group absolute inset-0 flex flex-col justify-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-300"
                  >
                  <BlogArtwork variant={article.slug} />
                    <div className="relative z-10 p-5 sm:p-6">
                      <span className="inline-flex rounded-full border border-white/20 bg-[#06152a]/45 px-3 py-1.5 text-[9px] font-bold tracking-[.15em] text-blue-100 backdrop-blur-sm">
                        {article.category[language].toUpperCase()}
                      </span>
                      <h3 className="mt-4 line-clamp-3 text-[20px] font-semibold leading-[1.22] tracking-[-.03em] text-white sm:text-[21px]">
                        {article.title[language]}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-[13px] leading-5 text-white/75">
                        {article.excerpt[language]}
                      </p>
                      <span className="mt-3 inline-flex min-h-10 items-center gap-2 text-[12px] font-semibold text-white/90">
                        {content.blogRead}
                        <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#030a14] via-[#030a14]/55 to-transparent" />
                  </Link>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
