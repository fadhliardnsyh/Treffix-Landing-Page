import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/components/content";
import { articleHref } from "@/components/content/articles";

export type ArticleCardData = {
  slug: string;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  image: string;
  imageAlt: Record<Lang, string>;
  category: Record<Lang, string>;
};

export function ArticleCard({
  article,
  language,
  readLabel,
  headingLevel = "h2",
  compactText = false,
}: {
  article: ArticleCardData;
  language: Lang;
  readLabel: string;
  headingLevel?: "h2" | "h3";
  compactText?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <article className="group relative flex h-full min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[22px] bg-[#07111f] shadow-[0_16px_36px_rgba(2,8,18,.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(2,8,18,.24)] sm:min-h-[440px]">
      <Link
        href={articleHref(language, article.slug)}
        aria-label={`${article.title[language]} - ${readLabel}`}
        className="relative flex h-full min-h-[420px] flex-col rounded-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white sm:min-h-[440px]"
      >
        <Image
          src={article.image}
          alt={article.imageAlt[language]}
          fill
          sizes="(min-width: 1280px) 500px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030912] via-[#030912]/75 to-[#030912]/15" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#06152a]/10" />
        <div className="relative z-10 mt-auto flex min-h-[420px] flex-col justify-end p-5 sm:min-h-[440px] sm:p-6">
          <span className="inline-flex min-h-7 self-start items-center rounded-full border border-white/20 bg-[#07111f]/75 px-3 text-[10px] font-bold tracking-[.08em] text-white backdrop-blur-sm">
            {article.category[language]}
          </span>
          <Heading className={`mt-4 text-[19px] font-semibold leading-[1.3] tracking-[-.025em] text-white sm:text-[20px] ${compactText ? "line-clamp-2" : "line-clamp-3"}`}>
            {article.title[language]}
          </Heading>
          <p className={`mt-3 text-[14px] leading-6 text-white/80 ${compactText ? "line-clamp-2" : "line-clamp-3"}`}>{article.excerpt[language]}</p>
          <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-[12px] font-semibold text-white">
            {readLabel}
            <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
