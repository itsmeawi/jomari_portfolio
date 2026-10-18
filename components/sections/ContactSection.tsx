"use client";

import { useState, useTransition } from "react";
import { submitContactInquiry } from "@/app/actions/contact";
import { type ActionResponse } from "@/types";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactSectionProps {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

export function ContactSection({ email, githubUrl, linkedinUrl }: ContactSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<ActionResponse<{ id: string }> | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitContactInquiry(null, formData);
      setResponse(result);
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Communications</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                INITIATE CONTACT
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Whether you have an engineering challenge, an ambitious web product to architect, or want to explore technical advisory, I would love to connect.
              </p>
            </div>

            {/* Email quick copy */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                Primary Direct Inquiries:
              </span>
              <CopyEmailButton email={email} />
            </div>

            {/* Social / Profiles */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                External Profiles:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <span className="text-zinc-600">↗</span>
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                  <span className="text-zinc-600">↗</span>
                </a>
              </div>
            </div>

            {/* Status note */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 text-xs font-mono text-zinc-400 space-y-1">
              <div className="text-zinc-200 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Response SLA: Within 24 Hours</span>
              </div>
              <p className="text-zinc-500">
                Messages submitted via the form below are streamed directly into my authenticated Google Sheets queue via serverless actions.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative">
              {response?.success ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Transmission Successful</h3>
                  <p className="text-sm text-zinc-400 max-w-md">
                    {response.message}
                  </p>
                  <button
                    onClick={() => setResponse(null)}
                    className="mt-4 px-4 py-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 font-mono text-xs text-zinc-500">
                    <span>SECURE_DATA_TRANSMISSION</span>
                    <span>SSL_ENCRYPTED</span>
                  </div>

                  {response && !response.success && (
                    <div className="p-3.5 rounded-lg border border-red-900/50 bg-red-950/30 text-xs text-red-300 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>{response.message}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs text-zinc-400"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                      />
                      {response?.errors?.name && (
                        <p className="text-[11px] text-red-400 font-mono">
                          {response.errors.name[0]}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs text-zinc-400"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ada@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                      />
                      {response?.errors?.email && (
                        <p className="text-[11px] text-red-400 font-mono">
                          {response.errors.email[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="block font-mono text-xs text-zinc-400"
                    >
                      Subject / Project Scope
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      defaultValue="Fullstack Project Inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs text-zinc-400"
                    >
                      Message Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Share project goals, timeline, and tech stack requirements..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-mono resize-y"
                    />
                    {response?.errors?.message && (
                      <p className="text-[11px] text-red-400 font-mono">
                        {response.errors.message[0]}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Streaming to Google Sheets...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
