import { Experience } from "@/types";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
            <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
            <span>Career Progression & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WORK EXPERIENCE
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            A track record of engineering scalable web systems, mentoring engineering teams, and optimizing production runtimes.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-12">
          {experiences.map((exp, index) => {
            const isCurrent = index === 0;

            return (
              <div key={exp.id} className="relative group">
                {/* Timeline node marker */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    isCurrent
                      ? "border-emerald-400 bg-emerald-950"
                      : "border-zinc-700 bg-zinc-950"
                  } group-hover:scale-125 transition-transform duration-200`}
                >
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  )}
                </div>

                {/* Experience Card */}
                <div className="glass-panel p-6 sm:p-7 rounded-xl transition-all duration-300">
                  {/* Role & Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-900">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-sm text-zinc-300 font-semibold">
                          {exp.company}
                        </span>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                          >
                            ↗
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements List */}
                  {exp.achievements.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                        Key Engineering Outcomes:
                      </div>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs text-zinc-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack tags */}
                  {exp.technologies.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
