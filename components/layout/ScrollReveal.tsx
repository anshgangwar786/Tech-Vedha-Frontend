"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, [data-reveal-stagger]";
/** Stagger delays stop growing after this many children, so long lists don't lag behind. */
const MAX_STAGGER_INDEX = 8;
const DEFAULT_THRESHOLD = 0.15;

/**
 * Marks `.reveal` and `[data-reveal-stagger]` elements with `.is-inview` the first time they
 * scroll into view; the CSS in app/globals.css plays the entrance. Also picks up elements
 * added later (client navigation, filters, tabs). Renders nothing.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-ready")) return;
    root.classList.add("reveal-armed");

    const seen = new WeakSet<Element>();
    const reveal = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      }
    };
    /* One observer per threshold; `data-reveal-threshold="0.35"` waits until 35% is visible, and
       `"0"` fires on the first visible pixel (for very tall or clipped lists that can never show 15%). */
    const observers = new Map<number, IntersectionObserver>();
    const observerFor = (element: Element) => {
      const raw = element.getAttribute("data-reveal-threshold");
      const parsed = raw === null || raw.trim() === "" ? NaN : Number(raw);
      const threshold = parsed >= 0 && parsed <= 1 ? parsed : DEFAULT_THRESHOLD;
      let observer = observers.get(threshold);
      if (!observer) {
        observer = new IntersectionObserver(reveal, { threshold, rootMargin: "0px 0px -8% 0px" });
        observers.set(threshold, observer);
      }
      return observer;
    };

    const watch = (element: Element) => {
      if (seen.has(element)) return;
      seen.add(element);
      if (element.hasAttribute("data-reveal-stagger")) {
        Array.from(element.children).forEach((child, index) => {
          (child as HTMLElement).style.setProperty("--i", String(Math.min(index, MAX_STAGGER_INDEX)));
        });
      }
      observerFor(element).observe(element);
    };

    const scan = (node: Node) => {
      if (!(node instanceof Element)) return;
      if (node.matches(SELECTOR)) watch(node);
      node.querySelectorAll(SELECTOR).forEach(watch);
    };

    scan(document.body);
    const added = new MutationObserver((mutations) => {
      for (const mutation of mutations) mutation.addedNodes.forEach(scan);
    });
    added.observe(document.body, { childList: true, subtree: true });

    return () => {
      added.disconnect();
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return null;
}
