import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { articles, getArticle, articleHref, type Article } from "@/components/content/articles";
import { articlePageCopy, copy, type Lang } from "@/components/content";
import { ArticleCard } from "@/components/sections/article-card";
import { siteUrl } from "@/lib/site";
import { getSocialImageUrl } from "@/lib/social-image";

const supportedLanguages: Lang[] = ["id", "en"];

function getLanguage(locale: string): Lang | undefined {
  return supportedLanguages.find((language) => language === locale);
}

function headingId(heading: string, index: number) {
  const slug = heading
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "section"}-${index + 1}`;
}

function getRelatedArticles(article: Article) {
  return article.relatedSlugs
    .map((slug) => getArticle(slug))
    .filter((related) => related !== undefined);
}

function formatPublishedDate(date: string | null, language: Lang, fallback: string) {
  if (!date) return fallback;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return fallback;

  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function getShareLinks(title: string, url: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return [
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];
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
  const socialImage = getSocialImageUrl(article.image);

  return {
    title: `${article.title[language]} | Treffix`,
    description: article.description[language],
    openGraph: {
      title: `${article.title[language]} | Treffix`,
      description: article.description[language],
      siteName: "Treffix",
      type: "article",
      images: [{ url: socialImage, type: "image/jpeg", alt: article.imageAlt[language] }],
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title[language]} | Treffix`,
      description: article.description[language],
      images: [{ url: socialImage, alt: article.imageAlt[language] }],
    },
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
  const articleLabels = articlePageCopy[language];
  const sections = article.sections[language];
  const sectionLinks = sections.map((section, index) => ({
    id: headingId(section.heading, index),
    heading: section.heading,
  }));
  const relatedArticles = getRelatedArticles(article);
  const publishedDate = formatPublishedDate(article.publishedAt, language, articleLabels.datePending);
  const canonicalUrl = new URL(articleHref(language, article.slug), siteUrl).toString();
  const shareLinks = getShareLinks(article.title[language], canonicalUrl);

  return (
    <main id="main-content" className="relative min-h-screen bg-white text-[#101828]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[84px] bg-[#030a14]" />

      <article className="container-wide relative pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <header className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,.98fr)] lg:gap-12 xl:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#e9eff7] sm:rounded-[28px] lg:aspect-[1.28/1]">
            <Image
              src={article.image}
              alt={article.imageAlt[language]}
              fill
              priority
              sizes="(min-width: 1280px) 570px, (min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <nav aria-label={articleLabels.breadcrumb} className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500 sm:text-xs">
              <Link href={`/${language}`} className="rounded-sm transition-colors hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]">
                {content.homeLabel}
              </Link>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <Link href={`/${language}/blog`} className="rounded-sm transition-colors hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]">
                {content.blogEyebrow}
              </Link>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span aria-current="page" className="text-slate-700">{article.category[language]}</span>
            </nav>

            <p className="section-eyebrow text-[10px] font-bold uppercase tracking-[.12em]">
              {article.category[language]}
            </p>
            <h1 className="mt-4 text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.04] tracking-[-.055em] text-[#101828] [text-wrap:balance]">
              {article.title[language]}
            </h1>
            <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
              {article.description[language]}
            </p>

            <div className="mt-7 flex flex-col gap-5 border-t border-slate-200 pt-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5 text-[12px] text-slate-500 sm:text-[13px]">
                <CalendarDays size={16} className="shrink-0 text-[var(--blue)]" aria-hidden="true" />
                <time dateTime={article.publishedAt ?? undefined}>{publishedDate}</time>
              </div>
              <div aria-label={articleLabels.share} className="flex flex-wrap items-center gap-2">
                {shareLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${articleLabels.share}: ${item.label}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-slate-200 px-3.5 text-[11px] font-semibold text-slate-600 transition-colors hover:border-[var(--blue)]/35 hover:bg-[var(--blue)]/5 hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                  >
                    {item.label}
                    <ArrowUpRight size={12} className="ml-1.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto mt-12 grid max-w-[1120px] gap-8 border-t border-slate-200 pt-8 sm:mt-16 sm:pt-10 lg:grid-cols-[240px_minmax(0,760px)] lg:gap-16 xl:gap-20">
          <aside className="min-w-0">
            <details className="group rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,35,62,.035)] lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-[11px] font-bold uppercase tracking-[.12em] text-slate-500 [&::-webkit-details-marker]:hidden">
                {articleLabels.contents}
                <ChevronDown size={16} className="shrink-0 text-[var(--blue)] transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ol className="space-y-1 border-t border-slate-100 px-3 py-3">
                {sectionLinks.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex min-h-10 items-start gap-3 rounded-lg px-2.5 py-2 text-[13px] leading-5 text-slate-600 transition-colors hover:bg-[var(--blue)]/5 hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--blue)]">
                      <span className="mt-0.5 shrink-0 font-mono text-[10px] text-[#071a35]">{String(index + 1).padStart(2, "0")}</span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <nav aria-label={articleLabels.contents} className="sticky top-28 hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,35,62,.035)] lg:block">
              <h2 className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{articleLabels.contents}</h2>
              <ol className="mt-4 space-y-1">
                {sectionLinks.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex items-start gap-3 rounded-lg px-2.5 py-2.5 text-[12px] leading-5 text-slate-600 transition-colors hover:bg-[var(--blue)]/5 hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--blue)]">
                      <span className="mt-0.5 shrink-0 font-mono text-[10px] text-[#071a35]">{String(index + 1).padStart(2, "0")}</span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 max-w-[760px]">
            {sections.map((section, index) => {
              const id = sectionLinks[index]!.id;
              return (
                <section key={id} id={id} aria-labelledby={`${id}-heading`} className="mb-10 scroll-mt-28 last:mb-0 sm:mb-12">
                  <h2 id={`${id}-heading`} className="text-[23px] font-semibold leading-[1.2] tracking-[-.035em] text-[#101828] sm:text-[28px]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[15px] leading-[1.85] text-slate-600 sm:text-[16px] sm:leading-[1.9]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}

            <Link href={`/${language}/blog`} className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-5 text-[12px] font-semibold text-slate-700 transition-colors hover:border-[var(--blue)]/35 hover:bg-[var(--blue)]/5 hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--blue)]">
              {content.blogBack}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <section aria-labelledby="other-articles-title" className="mt-16 border-t border-slate-200 pt-10 sm:mt-20 sm:pt-12">
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
              <div>
                <h2 id="other-articles-title" className="text-[28px] font-semibold tracking-[-.045em] text-[#101828] sm:text-[34px]">
                  {articleLabels.related}
                </h2>
              </div>
              <Link href={`/${language}/blog`} className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[12px] font-semibold text-[#071a35] transition-colors hover:text-[#071a35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--blue)]">
                {content.blogViewAll}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard
                  key={related.slug}
                  article={related}
                  language={language}
                  readLabel={content.blogRead}
                  headingLevel="h3"
                  compactText
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
