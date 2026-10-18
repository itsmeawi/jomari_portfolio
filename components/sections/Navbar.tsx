"use client";

import { useState } from "react";
import Link from "next/link";
import { SystemClock } from "@/components/ui/SystemClock";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";

interface NavbarProps {
  githubUrl?: string;
  linkedinUrl?: string;
}

export function Navbar({
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "[1] About", href: "#about" },
    { label: "[2] Projects", href: "#projects" },
    { label: "[3] Experience", href: "#experience" },
    { label: "[4] Stack", href: "#architecture" },
    { label: "[5] Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#08080a]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group text-zinc-100 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 group-hover:border-zinc-500 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-zinc-100 group-hover:text-emerald-300 transition-colors">
                Jomari
              </span>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                Dev_2026
              </span>
            </div>
          </Link>

          <span className="hidden md:inline-block text-zinc-800">|</span>

          {/* System status & clock */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYS_ACTIVE</span>
            </div>
            <SystemClock />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-tight text-zinc-400 hover:text-zinc-100 hover:underline decoration-zinc-600 underline-offset-4 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* External Links & Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800/60 transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800/60 transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs font-medium transition-all shadow-sm hover:shadow-emerald-500/10"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0c0c0f] px-4 pt-3 pb-5 space-y-3">
          <div className="py-2 border-b border-zinc-900 flex justify-between items-center">
            <SystemClock />
            <span className="font-mono text-[10px] text-emerald-400">ONLINE</span>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm text-zinc-300 hover:text-white py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-3 rounded bg-zinc-100 text-zinc-950 font-mono text-xs font-semibold"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
