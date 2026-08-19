"use client";

import { FileText, GitBranch, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add project context",
    description:
      "Enter your project requirements, technical notes, constraints, and technology stack.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Generate the build plan",
    description:
      "DevFlow analyzes your input and creates a structured, dependency-aware engineering plan.",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Follow the implementation flow",
    description:
      "See exactly what to build first, what depends on it, and what comes next.",
    icon: ArrowRight,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-100">
            How it works
          </h2>
          <p className="text-sm text-zinc-500">
            Three steps from requirements to a structured plan.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-medium text-zinc-400">
                  {step.number}
                </span>
                <step.icon size={18} className="text-zinc-500" />
              </div>
              <h3 className="mb-2 text-sm font-medium text-zinc-200">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
