"use client";

import { Layers, GitFork, ListChecks, Cloud } from "lucide-react";

const features = [
  {
    title: "Context-aware planning",
    description:
      "Generates steps based on your actual requirements, tech stack, and constraints — not a generic template.",
    icon: Layers,
  },
  {
    title: "Dependency mapping",
    description:
      "Shows which components depend on each other and what can be built in parallel.",
    icon: GitFork,
  },
  {
    title: "Step-by-step implementation",
    description:
      "Each step includes specific tasks, technologies needed, and clear dependencies.",
    icon: ListChecks,
  },
  {
    title: "Deployment planning",
    description:
      "Includes containerization, cloud deployment, and production readiness as part of the plan.",
    icon: Cloud,
  },
];

export default function Features() {
  return (
    <section id="features" className="px-5 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-100">
            Features
          </h2>
          <p className="text-sm text-zinc-500">
            What makes DevFlow useful for engineering planning.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
                <feature.icon size={18} className="text-zinc-400" />
              </div>
              <h3 className="mb-2 text-sm font-medium text-zinc-200">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
