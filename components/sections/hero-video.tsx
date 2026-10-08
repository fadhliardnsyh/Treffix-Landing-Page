"use client";

import { useReducedMotion } from "framer-motion";

export function HeroVideo() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <video
      className="hero-video absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/hero-background.mp4" type="video/mp4" />
    </video>
  );
}
