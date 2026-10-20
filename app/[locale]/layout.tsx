import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { copy, type Lang } from "@/components/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/site";
import { getSocialImageUrl } from "@/lib/social-image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  openGraph: {
    type: "website",
    siteName: "Treffix",
    title: "Treffix | Smarter Operations, Connected by AI",
    description: "Explore integrated fleet tracking, workforce management, and AI CCTV solutions from Treffix.",
    images: [{ url: getSocialImageUrl("/og-cover.jpg"), width: 1200, height: 630, type: "image/jpeg", alt: "Treffix — smarter operations, connected by AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treffix | Smarter Operations, Connected by AI",
    description: "Explore integrated fleet tracking, workforce management, and AI CCTV solutions from Treffix.",
    images: [{ url: getSocialImageUrl("/og-cover.jpg"), alt: "Treffix — smarter operations, connected by AI" }],
  },
  icons: {
    icon: [{ url: "/treffix-icon.svg", type: "image/svg+xml", sizes: "any" }],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const language: Lang = locale === "en" ? "en" : "id";

  return (
    <html lang={language}>
      <body className={poppins.variable}>
        <SiteHeader language={language} content={copy[language]} />
        {children}
        <SiteFooter
          language={language}
          content={copy[language]}
          contactLink={process.env.NEXT_PUBLIC_TREFFIX_CONTACT_URL}
          contactDetails={{
            address: process.env.NEXT_PUBLIC_TREFFIX_ADDRESS || "PT. Lalu Lintas Lancar Permata Regency D/37, Jl H Kelik, Srengseng, Kembangan, Jakarta Barat.",
            phone: process.env.NEXT_PUBLIC_TREFFIX_PHONE || "+62 81120253182",
            email: process.env.NEXT_PUBLIC_TREFFIX_EMAIL || "marketing@treffix.id",
          }}
          socialLinks={{
            instagram: "https://www.instagram.com/treffix.id/",
            linkedin: "https://www.linkedin.com/company/treffix-id/",
          }}
        />
      </body>
    </html>
  );
}
