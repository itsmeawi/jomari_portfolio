import { Cpu, Database, GitBranch, Globe, ShieldCheck, Zap } from "lucide-react";

export function ArchitectureShowcase() {
  const specs = [
    {
      icon: Cpu,
      title: "Fullstack TypeScript",
      category: "CORE RUNTIME",
      description:
        "Strict end-to-end type safety from Google Sheets row parsing to UI presentation. Zero implicit any types.",
      detail: "TypeScript 5.8 · React 19 · Next.js App Router",
    },
    {
      icon: Database,
      title: "Google Sheets CMS",
      category: "DATABASE ENGINE",
      description:
        "Headless relational CMS using Google Sheets API v4. Service Account authenticated with tab-based normalization.",
      detail: "Zero infrastructure cost · Instant stakeholder editing",
    },
    {
      icon: Zap,
      title: "ISR & Quota Guard",
      category: "PERFORMANCE LAYER",
      description:
        "Incremental Static Regeneration (ISR) and tag caching keep external calls 95% below the 300 req/min quota.",
      detail: "Sub-50ms TTFB · Instant Edge cache delivery",
    },
    {
      icon: ShieldCheck,
      title: "Formula Injection Shield",
      category: "SECURITY LAYER",
      description:
        "Runtime sanitization strips leading dangerous operators (=, +, -, @) before appending rows to Google Sheets.",
      detail: "Zod Schema Validation · Formula Sanitization",
    },
    {
      icon: GitBranch,
      title: "GitHub Version Control",
      category: "SOURCE & DEVOPS",
      description:
        "Trunk-based development with branch protection, PR previews, and automated linting & type checks.",
      detail: "Continuous Integration · Automated PR previews",
    },
    {
      icon: Globe,
      title: "Vercel Edge Delivery",
      category: "HOSTING & EDGE",
      description:
        "Global edge network deployment with serverless functions and automated zero-downtime releases.",
      detail: "99.99% Uptime SLA · Global Edge Caching",
    },
  ];

  return (
    <section id="architecture" className="py-16 md:py-24 border-b border-zinc-900 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production Architecture Specification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              HOW THIS WEB APP IS BUILT
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              An enterprise-grade, cost-efficient architecture pairing TypeScript and Google Sheets with Vercel Edge Serverless functions.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ESTIMATED INFRA COST: $0.00/MO</span>
          </div>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.title}
                className="glass-panel p-6 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                    <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                      {spec.category}
                    </span>
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">
                    {spec.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-900/60 font-mono text-[11px] text-zinc-500">
                  {spec.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
