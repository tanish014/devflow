"use client";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  onBuildPlan: () => void;
}

export default function Hero({ onBuildPlan }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center px-5 pt-16">
      {/* Subtle background gradient — restrained, not a glowing orb */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(63,63,70,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Small label */}
        <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400">
          Developer planning tool
        </div>

        {/* Main headline */}
        <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
          From scattered context to a plan you can ship.
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          DevFlow turns project requirements, technical notes, and constraints
          into a clear step-by-step engineering plan.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onBuildPlan}
            className="group inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-white"
          >
            Build a plan
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </button>
          <a
            href="#how-it-works"
            className="text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-200"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
