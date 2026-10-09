import Home from "@/components/home";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? { title: "Treffix | Fleet Tracking, HRMS & AI CCTV", description: "Explore FixTrack fleet and vehicle tracking, FixWork HRMS and workforce management, and FixSight AI CCTV for camera monitoring and PPE detection." }
    : { title: "Treffix | Pelacakan Armada, HRMS & CCTV AI", description: "Kenali FixTrack untuk pelacakan armada dan kendaraan, FixWork untuk HRMS dan manajemen tenaga kerja, serta FixSight AI CCTV untuk pemantauan kamera dan deteksi APD." };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "id" && locale !== "en") notFound();
  const language = locale;
  return <Home language={language} />;
}
