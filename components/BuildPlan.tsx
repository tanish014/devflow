"use client";

import { Pencil, RotateCcw } from "lucide-react";
import type { BuildPlan as BuildPlanType } from "@/types/plan";
import FlowChart from "./FlowChart";
import StepDetails from "./StepDetails";

interface BuildPlanProps {
  plan: BuildPlanType;
  selectedStepId: string | null;
  onSelectStep: (id: string) => void;
  onClearSelection: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
}

export default function BuildPlan({
  plan,
  selectedStepId,
  onSelectStep,
  onClearSelection,
  onEdit,
  onRegenerate,
}: BuildPlanProps) {
  const selectedStep = plan.steps.find((s) => s.id === selectedStepId) ?? null;

  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        {/* ── Plan Summary ───────────────────────────────────────────── */}
        <div className="mb-10 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 sm:p-8">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Build Plan
            </span>
          </div>

          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-100">
            {plan.projectName}
          </h2>

          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
            <span>{plan.steps.length} implementation steps</span>
            <span className="hidden text-zinc-700 sm:inline">·</span>
            <span>
              Stack:{" "}
              {plan.technologies.map((tech, i) => (
                <span key={tech}>
                  {i > 0 && " · "}
                  {tech}
                </span>
              ))}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-zinc-400">Ready for review</span>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-3 border-t border-zinc-800/40 pt-5">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 transition-colors duration-150 hover:border-zinc-700 hover:text-zinc-100"
            >
              <Pencil size={14} />
              Edit project
            </button>
            <button
              onClick={onRegenerate}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 transition-colors duration-150 hover:border-zinc-700 hover:text-zinc-100"
            >
              <RotateCcw size={14} />
              Regenerate plan
            </button>
          </div>
        </div>

        {/* ── Flowchart + Details ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Implementation Flow
            </h3>
            <FlowChart
              steps={plan.steps}
              selectedStepId={selectedStepId}
              onSelectStep={onSelectStep}
            />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedStep ? (
              <StepDetails
                step={selectedStep}
                allSteps={plan.steps}
                onClose={onClearSelection}
              />
            ) : (
              <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-zinc-800/60 text-sm text-zinc-600">
                Click a step to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
