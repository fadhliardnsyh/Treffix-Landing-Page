"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function ContactCtaRouteVisibility({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (/^\/(?:id|en)\/blog(?:\/|$)/.test(pathname ?? "")) return null;

  return children;
}
