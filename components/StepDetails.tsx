"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import type { PlanStep } from "@/types/plan";

interface StepDetailsProps {
  step: PlanStep | null;
  allSteps: PlanStep[];
  onClose: () => void;
}

const statusLabels: Record<string, string> = {
  planned: "Planned",
  ready: "Ready",
  "in-progress": "In progress",
  complete: "Complete",
};

const statusColors: Record<string, string> = {
  planned: "text-zinc-500",
  ready: "text-emerald-400",
  "in-progress": "text-amber-400",
  complete: "text-emerald-400",
};

export default function StepDetails({
  step,
  allSteps,
  onClose,
}: StepDetailsProps) {
  if (!step) return null;

  // Resolve dependency names
  const dependencyNames = step.dependencies
    .map((depId) => allSteps.find((s) => s.id === depId)?.title)
    .filter(Boolean);

  // Find next step (depends on this one)
  const nextSteps = allSteps.filter((s) =>
    s.dependencies.includes(step.id)
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-5 sm:p-6"
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Step {step.number}
            </span>
            <h3 className="text-lg font-semibold text-zinc-100">
              {step.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-500 transition-colors duration-150 hover:text-zinc-300"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status */}
        <div className="mb-4">
          <span className={`text-sm font-medium ${statusColors[step.status]}`}>
            {statusLabels[step.status]}
          </span>
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
          {step.description}
        </p>

        {/* Tasks */}
        <div className="mb-5">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Tasks
          </h4>
          <ol className="space-y-1.5">
            {step.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-zinc-800 text-[10px] text-zinc-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {task}
              </li>
            ))}
          </ol>
        </div>

        {/* Technologies */}
        {step.technologies.length > 0 && (
          <div className="mb-5">
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {step.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-zinc-800/80 px-2 py-1 text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dependencies */}
        {dependencyNames.length > 0 && (
          <div className="mb-5">
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Depends on
            </h4>
            <p className="text-sm text-zinc-400">
              {dependencyNames.join(", ")}
            </p>
          </div>
        )}

        {/* Next step */}
        {nextSteps.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Next {nextSteps.length === 1 ? "step" : "steps"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {nextSteps.map((ns) => (
                <span
                  key={ns.id}
                  className="inline-flex items-center gap-1 text-sm text-zinc-400"
                >
                  <ChevronRight size={12} className="text-zinc-600" />
                  {ns.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
