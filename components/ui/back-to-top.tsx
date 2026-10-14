"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--blue)] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
    >
      <ArrowUp size={21} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
