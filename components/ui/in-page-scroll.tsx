"use client";

import { useEffect } from "react";

const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);
let animationFrame = 0;

function stopAnimation() {
  if (!animationFrame) return;
  window.cancelAnimationFrame(animationFrame);
  animationFrame = 0;
}

export function cancelInPageScrollAnimation() {
  stopAnimation();
}

function getScrollDuration(distance: number) {
  return Math.min(1300, Math.max(260, 260 + distance * 0.32));
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function scrollWindowToY(targetY: number) {
  stopAnimation();

  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const clampedTargetY = Math.max(0, Math.min(targetY, maxY));
  const distance = clampedTargetY - startY;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || Math.abs(distance) < 2) {
    window.scrollTo({ top: clampedTargetY, behavior: "instant" });
    return 0;
  }

  const duration = getScrollDuration(Math.abs(distance));
  const startTime = performance.now();

  const animate = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo({
      top: startY + distance * easeInOutCubic(progress),
      behavior: "instant",
    });

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      animationFrame = 0;
    }
  };

  animationFrame = window.requestAnimationFrame(animate);
  return duration;
}

/** Smoothly scrolls to a same-page target, with an optional URL hash. */
export function scrollToInPageTarget(target: string | HTMLElement, hash?: string) {
  const targetElement = typeof target === "string"
    ? document.getElementById(target.replace(/^#/, ""))
    : target;
  if (!targetElement) return;

  const targetHash = hash ?? (typeof target === "string"
    ? `#${encodeURIComponent(target.replace(/^#/, ""))}`
    : targetElement.id ? `#${encodeURIComponent(targetElement.id)}` : undefined);

  if (targetHash && window.location.hash !== targetHash) {
    window.history.pushState(null, "", targetHash);
  }

  const headerHeight = document.querySelector<HTMLElement>("[data-site-header]")?.getBoundingClientRect().height ?? 68;
  const sectionOffset = Number.parseFloat(getComputedStyle(targetElement).scrollMarginTop) || 0;
  const topOffset = Math.max(headerHeight + 12, sectionOffset);
  const targetY = window.scrollY + targetElement.getBoundingClientRect().top - topOffset;
  scrollWindowToY(targetY);
}

export function InPageScroll() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;

      let targetId: string;
      try {
        targetId = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      if (target.hasAttribute("tabindex")) {
        target.focus({ preventScroll: true });
      }
      scrollToInPageTarget(target, url.hash);
    };

    const handleScrollInput = (event: Event) => {
      if (!event.defaultPrevented) stopAnimation();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!SCROLL_KEYS.has(event.key)) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (!event.defaultPrevented) stopAnimation();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("wheel", handleScrollInput, { passive: true });
    window.addEventListener("touchmove", handleScrollInput, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("wheel", handleScrollInput);
      window.removeEventListener("touchmove", handleScrollInput);
      window.removeEventListener("keydown", handleKeyDown);
      stopAnimation();
    };
  }, []);

  return null;
}
