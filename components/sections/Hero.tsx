import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Profile } from "@/types";
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Cpu } from "lucide-react";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="about" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top telemetry row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <StatusBeacon
            label={profile.status}
            isAvailable={profile.availability === "available"}
          />
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              LOCATION: {profile.location}
            </span>
          </div>
        </div>

        {/* Main Display Typography */}
        <div className="space-y-6 max-w-5xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Fullstack Software Architecture & UI Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            SCULPTING TECHNICAL PERFORMANCE INTO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
              IMMERSIVE DIGITAL PRODUCTS.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-3xl">
            {profile.bio}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs font-semibold tracking-tight transition-all shadow-md hover:shadow-zinc-700/20 active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 hover:border-zinc-500 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-mono text-xs font-medium transition-all active:scale-95"
            >
              <span>Initiate Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <CopyEmailButton email={profile.email} />
          </div>
        </div>

        {/* Architectural Highlights / High-density telemetry cards */}
        <div className="mt-14 pt-8 border-t border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-zinc-500 font-mono text-[10px] uppercase">
              <span>CORE LANGUAGE</span>
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-100 font-mono">TypeScript 5.8</div>
            <p className="text-xs text-zinc-500">100% strict type safety & Zod contracts</p>
          </div>

          <div className="glass-panel p-4 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-zinc-500 font-mono text-[10px] uppercase">
              <span>DATABASE / CMS</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-100 font-mono">Google Sheets API</div>
            <p className="text-xs text-zinc-500">Headless relational CMS via Service Account</p>
          </div>

          <div className="glass-panel p-4 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-zinc-500 font-mono text-[10px] uppercase">
              <span>PLATFORM / DEPLOY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-100 font-mono">Vercel Edge & RSC</div>
            <p className="text-xs text-zinc-500">Server Actions + Incremental Static Caching</p>
          </div>

          <div className="glass-panel p-4 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-zinc-500 font-mono text-[10px] uppercase">
              <span>SOURCE / PIPELINE</span>
              <span className="text-zinc-400 font-mono text-xs">CI/CD</span>
            </div>
            <div className="text-sm font-semibold text-zinc-100 font-mono">GitHub Workflows</div>
            <p className="text-xs text-zinc-500">Branch protection & zero-downtime deployment</p>
          </div>
        </div>

        {/* Technical Skills Marquee / Pills */}
        <div className="mt-8 space-y-2">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            Verified Production Technologies:
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="tech-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
