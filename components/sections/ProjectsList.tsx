"use client";

import { useState } from "react";
import { Project, ProjectFilterCategory } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight, FolderGit2, Star } from "lucide-react";

interface ProjectsListProps {
  initialProjects: Project[];
}

const CATEGORIES: ProjectFilterCategory[] = [
  "All",
  "Fullstack",
  "Frontend / UI",
  "Backend / API",
  "Open Source",
];

export function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectFilterCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Selected Portfolio Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              FEATURED ENGINEERING SYSTEMS
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              High-throughput applications, design systems, and developer tools built with strict TypeScript and modern edge architectures.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-950/80 border border-zinc-800">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === category
                    ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const indexStr = (index + 1).toString().padStart(2, "0");

            return (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-900 text-xs font-mono text-zinc-500">
                    <span className="text-zinc-400 font-bold tracking-widest">
                      // {indexStr}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-amber-950/50 text-amber-300 border border-amber-800/40">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5 space-y-2.5">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Bottom tech stack & actions */}
                <div className="mt-6 pt-5 border-t border-zinc-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-400 border border-zinc-800/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-3 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-200 hover:text-emerald-300 transition-colors"
                        title="Open Live Deployment"
                      >
                        <span>Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
