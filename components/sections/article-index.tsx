"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { articles, articleHref } from "@/components/content/articles";
import type { Lang } from "@/components/content";
import { BlogArtwork } from "@/components/sections/blog-artwork";

type ArticleIndexProps = {
  language: Lang;
  readLabel: string;
};

const PAGE_SIZE = 3;

export function ArticleIndex({ language, readLabel }: ArticleIndexProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const allLabel = language === "id" ? "Semua artikel" : "All articles";
  const categories = useMemo(
    () => Array.from(new Set(articles.map((article) => article.category[language]))),
    [language],
  );
  const filteredArticles = useMemo(
    () => activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category[language] === activeCategory),
    [activeCategory, language],
  );
  const pageCount = Math.ceil(filteredArticles.length / PAGE_SIZE);
  const visibleArticles = filteredArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setPage(1);
  }

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {language === "id" ? `Menampilkan ${visibleArticles.length} dari ${filteredArticles.length} artikel` : `Showing ${visibleArticles.length} of ${filteredArticles.length} articles`}
      </div>

      <div className="mt-9 grid gap-9 lg:mt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-16">
        <aside className="min-w-0 lg:pt-1">
          <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[.13em] text-[#0a1c37]">
            {language === "id" ? "Kategori artikel" : "Article categories"}
          </h2>
          <nav aria-label={language === "id" ? "Filter kategori artikel" : "Article category filters"} className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {[{ key: "all", label: allLabel }, ...categories.map((category) => ({ key: category, label: category }))].map(({ key, label }) => {
              const selected = activeCategory === key;
              const count = key === "all" ? articles.length : articles.filter((article) => article.category[language] === key).length;

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="article-grid"
                  onClick={() => selectCategory(key)}
                  className={`flex min-h-11 shrink-0 items-center justify-between gap-5 rounded-xl border px-4 text-left text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:w-full lg:border-transparent lg:px-3 ${selected ? "border-blue-100 bg-blue-50 text-blue-700 lg:border-blue-100" : "border-blue-100 bg-white text-slate-600 hover:border-blue-200 hover:bg-white hover:text-blue-700 lg:hover:bg-blue-50/70"}`}
                >
                  <span className="whitespace-nowrap">{label}</span>
                  <span className={`min-w-6 text-right text-[11px] tabular-nums ${selected ? "text-blue-600" : "text-slate-400"}`}>{count}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          <div id="article-grid" className="grid items-stretch gap-5 md:grid-cols-2 xl:gap-6">
            {visibleArticles.map((article) => (
              <article key={article.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-blue-100/90 bg-white shadow-[0_12px_34px_rgba(15,48,91,.055)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_44px_rgba(15,48,91,.11)]">
                <Link
                  href={articleHref(language, article.slug)}
                  aria-label={`${article.title[language]} - ${readLabel}`}
                  className="flex h-full flex-col rounded-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
                >
                  <div className="relative aspect-[1.45/1] w-full overflow-hidden bg-[#071a35]">
                    <BlogArtwork variant={article.slug} />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-[#06152a]/20" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="inline-flex min-h-7 self-start items-center rounded-full bg-blue-50 px-3 text-[10px] font-bold tracking-[.08em] text-blue-700">
                      {article.category[language]}
                    </span>
                    <h2 className="mt-4 text-[19px] font-semibold leading-[1.3] tracking-[-.025em] text-[#0a1c37] transition-colors group-hover:text-blue-700 sm:text-[20px]">
                      {article.title[language]}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-[14px] leading-6 text-slate-600">{article.excerpt[language]}</p>
                    <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-4 text-[12px] font-semibold text-blue-700">
                      {readLabel}
                      <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <nav aria-label={language === "id" ? "Navigasi halaman artikel" : "Article pagination"} className="mt-9 flex flex-wrap items-center justify-center gap-2.5 sm:mt-12">
              <button
                type="button"
                aria-label={language === "id" ? "Halaman sebelumnya" : "Previous page"}
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  aria-label={language === "id" ? `Halaman ${pageNumber}` : `Page ${pageNumber}`}
                  aria-current={page === pageNumber ? "page" : undefined}
                  onClick={() => setPage(pageNumber)}
                  className={`min-h-11 min-w-11 rounded-full border text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${page === pageNumber ? "border-blue-600 bg-blue-600 text-white" : "border-blue-100 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                aria-label={language === "id" ? "Halaman berikutnya" : "Next page"}
                disabled={page === pageCount}
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
