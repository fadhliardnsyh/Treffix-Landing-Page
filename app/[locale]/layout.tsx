import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { copy, type Lang } from "@/components/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
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
      <body>
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
