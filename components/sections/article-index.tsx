"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles } from "@/components/content/articles";
import type { Lang } from "@/components/content";
import { ArticleCard } from "@/components/sections/article-card";

type ArticleIndexProps = {
  language: Lang;
  readLabel: string;
};

const PAGE_SIZE = 10;

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
          <div id="article-grid" className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 xl:gap-6">
            {visibleArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} language={language} readLabel={readLabel} compactText />
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
