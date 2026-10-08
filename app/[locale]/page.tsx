import Home from "@/components/home";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? { title: "Treffix | Connected Operations", description: "Connect fleet, workforce, warehouse, and operational data with Treffix IoT, data, and AI solutions." }
    : { title: "Treffix | Operasional Terhubung", description: "Hubungkan armada, tenaga kerja, gudang, dan data operasional dengan solusi IoT, data, dan AI dari Treffix." };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "id" && locale !== "en") notFound();
  const language = locale;
  return <Home language={language} />;
}
