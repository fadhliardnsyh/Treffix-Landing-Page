import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, type Lang } from "@/components/content";
import { ArticleIndex } from "@/components/sections/article-index";

const supportedLanguages: Lang[] = ["id", "en"];

function getLanguage(locale: string): Lang | undefined {
  return supportedLanguages.find((language) => language === locale);
}

export function generateStaticParams() {
  return supportedLanguages.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = getLanguage(locale);
  if (!language) notFound();

  return {
    title: language === "id" ? "Artikel Operasional Bisnis | Treffix" : "Business Operations Articles | Treffix",
    description: copy[language].blogText,
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language = getLanguage(locale);
  if (!language) notFound();

  const content = copy[language];

  return (
    <main className="relative min-h-screen bg-[#f4f8ff]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[84px] bg-[#030a14]" />

      <section className="container-wide pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <p className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[.17em] text-blue-600">
          <span className="h-px w-7 bg-blue-500" />
          {content.blogEyebrow}
        </p>
        <h1 className="max-w-[1080px] text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#0a1c37]">
          {content.blogTitle}
        </h1>
        <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-slate-600 sm:text-[16px]">{content.blogText}</p>
        <ArticleIndex language={language} readLabel={content.blogRead} />
      </section>
    </main>
  );
}
