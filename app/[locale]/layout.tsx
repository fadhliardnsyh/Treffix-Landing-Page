import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";

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
  const language = locale === "en" ? "en" : "id";

  return (
    <html lang={language}>
      <body>{children}</body>
    </html>
  );
}
