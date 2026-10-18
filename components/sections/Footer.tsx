import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-[#060608] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-mono text-xs font-semibold text-zinc-300">
              JOMARI.DEV
            </span>
            <span className="hidden sm:inline text-zinc-700">/</span>
            <span className="font-mono text-xs text-zinc-500">
              © 2026 · All rights reserved.
            </span>
          </div>

          <div className="font-mono text-[11px] text-zinc-500 text-center">
            Engineered with <span className="text-zinc-300">TypeScript</span>,{" "}
            <span className="text-zinc-300">Google Sheets CMS</span> &{" "}
            <span className="text-zinc-300">Vercel Edge</span>
          </div>

          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
