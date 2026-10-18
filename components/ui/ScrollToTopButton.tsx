"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
      aria-label="Back to top"
    >
      <span>Top</span>
      <ArrowUp className="w-3.5 h-3.5" />
    </button>
  );
}
