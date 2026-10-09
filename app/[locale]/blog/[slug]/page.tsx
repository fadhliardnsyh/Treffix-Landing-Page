import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/components/content/articles";
import { copy, type Lang } from "@/components/content";

const supportedLanguages: Lang[] = ["id", "en"];

function getLanguage(locale: string): Lang | undefined {
  return supportedLanguages.find((language) => language === locale);
}

export function generateStaticParams() {
  return supportedLanguages.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const language = getLanguage(locale);
  const article = getArticle(slug);

  if (!language || !article) notFound();

  return {
    title: `${article.title[language]} | Treffix`,
    description: article.description[language],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const language = getLanguage(locale);
  const article = getArticle(slug);

  if (!language || !article) notFound();

  const content = copy[language];
  const sections = article.sections[language];

  return (
    <main id="main-content" className="relative min-h-screen bg-[#f4f8ff]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[84px] bg-[#030a14]" />

      <article className="container-wide pb-12 pt-28 sm:pb-16 sm:pt-32">
        <nav aria-label={language === "id" ? "Jejak navigasi" : "Breadcrumb"} className="mb-8 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
          <Link href={`/${language}`} className="rounded-sm text-blue-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
            Treffix
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${language}/blog`} className="rounded-sm hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
            {content.blogEyebrow}
          </Link>
        </nav>

        <div className="mx-auto max-w-[820px]">
          <p className="text-[10px] font-bold tracking-[.17em] text-blue-600">{article.category[language].toUpperCase()}</p>
          <h1 className="mt-4 text-[34px] font-semibold leading-[1.12] tracking-[-.045em] text-[#0a1c37] sm:text-[48px]">
            {article.title[language]}
          </h1>
          <p className="mt-5 max-w-[700px] text-[16px] leading-7 text-slate-600">
            {article.description[language]}
          </p>

          <div className="mt-10 border-t border-blue-100 pt-8 sm:mt-12 sm:pt-10">
            {sections.map((section) => (
              <section key={section.heading} className="mb-9 last:mb-0">
                <h2 className="text-[22px] font-semibold leading-tight tracking-[-.025em] text-[#0a1c37] sm:text-[25px]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[15px] leading-7 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <Link href={`/${language}/blog`} className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[12px] font-semibold text-blue-600 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-500">
            {content.blogBack}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
  );
}
