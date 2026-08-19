"use client";

import { motion } from "framer-motion";
import type { PlanStep } from "@/types/plan";

interface FlowNodeProps {
  step: PlanStep;
  isSelected: boolean;
  onClick: () => void;
  animationDelay: number;
}

const statusColors: Record<string, string> = {
  planned: "bg-zinc-700",
  ready: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  complete: "bg-emerald-400",
};

const statusLabels: Record<string, string> = {
  planned: "Planned",
  ready: "Ready",
  "in-progress": "In progress",
  complete: "Complete",
};

export default function FlowNode({
  step,
  isSelected,
  onClick,
  animationDelay,
}: FlowNodeProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: animationDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative w-full rounded-xl border p-4 text-left transition-colors duration-150 sm:w-[220px] ${
        isSelected
          ? "border-zinc-500 bg-zinc-800/80 shadow-[0_0_20px_rgba(161,161,170,0.06)]"
          : "border-zinc-800/60 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900/80"
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Step ${step.number}: ${step.title}. Status: ${statusLabels[step.status]}`}
    >
      {/* Header row */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">
          Step {step.number}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${statusColors[step.status]}`}
          />
          {statusLabels[step.status]}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-1.5 text-sm font-medium text-zinc-200">
        {step.title}
      </h3>

      {/* Short description */}
      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-zinc-500">
        {step.description}
      </p>

      {/* Tech badges */}
      {step.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {step.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {step.technologies.length > 3 && (
            <span className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-500">
              +{step.technologies.length - 3}
            </span>
          )}
        </div>
      )}
    </motion.button>
  );
}
