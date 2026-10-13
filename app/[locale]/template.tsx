"use client";

import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

export default function LocaleTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} enter="route-content" exit="route-content" default="none">
      {children}
    </ViewTransition>
  );
}
