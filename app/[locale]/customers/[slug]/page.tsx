import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "@/components/content";
import { customerPages, getCustomerLabel } from "@/components/content/customers";
import { CustomerDetailPage } from "@/components/sections/customer-detail-page";

export function generateStaticParams() {
  return ["id", "en"].flatMap((locale) =>
    Object.keys(customerPages).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "id" && locale !== "en") return {};
  const language: Lang = locale;
  const label = getCustomerLabel(slug, language);
  const page = customerPages[slug];
  if (!label || !page) return {};
  return {
    title: `${label} | Treffix`,
    description: page[language].intro,
  };
}

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "id" && locale !== "en") notFound();
  const page = customerPages[slug];
  if (!page) notFound();
  return <CustomerDetailPage page={page} language={locale} />;
}
