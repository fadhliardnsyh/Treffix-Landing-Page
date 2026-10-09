import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { copy, type Lang } from "@/components/content";
import { SiteHeader } from "@/components/site-header";

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
  const contactLink = process.env.NEXT_PUBLIC_TREFFIX_CONTACT_URL;

  return (
    <html lang={language}>
      <body>
        <SiteHeader language={language} content={copy[language]} contactLink={contactLink} />
        {children}
      </body>
    </html>
  );
}
