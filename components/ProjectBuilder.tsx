"use client";

import { useState, KeyboardEvent } from "react";
import { ArrowRight, X, Plus } from "lucide-react";
import type { ProjectInput } from "@/types/plan";

interface ProjectBuilderProps {
  onGenerate: (input: ProjectInput) => void;
  initialInput?: ProjectInput;
}

const defaultInput: ProjectInput = {
  name: "",
  requirements: "",
  technicalNotes: "",
  constraints: "",
  techStack: [],
};

const EXAMPLE_PLACEHOLDER = {
  name: "E-commerce Platform",
  requirements:
    "Users should be able to register, login, browse products, add products to cart and place orders.",
  technicalNotes: "React frontend, Node.js backend and PostgreSQL database.",
  constraints: "Must support authentication and should be deployable to AWS.",
};

export default function ProjectBuilder({
  onGenerate,
  initialInput,
}: ProjectBuilderProps) {
  const [input, setInput] = useState<ProjectInput>(initialInput ?? defaultInput);
  const [techInput, setTechInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(field: keyof ProjectInput, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function addTech(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (input.techStack.some((t) => t.toLowerCase() === trimmed.toLowerCase()))
      return;
    setInput((prev) => ({ ...prev, techStack: [...prev.techStack, trimmed] }));
    setTechInput("");
  }

  function removeTech(tech: string) {
    setInput((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  }

  function handleTechKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech(techInput);
    }
    if (e.key === "Backspace" && techInput === "" && input.techStack.length > 0) {
      removeTech(input.techStack[input.techStack.length - 1]);
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!input.name.trim()) newErrors.name = "Project name is required.";
    if (!input.requirements.trim())
      newErrors.requirements = "Add at least one requirement.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onGenerate(input);
  }

  return (
    <section id="product" className="px-5 py-20">
      <div className="mx-auto max-w-2xl">
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-100">
            Project Planner
          </h2>
          <p className="text-sm text-zinc-500">
            Add your project details and generate a build plan.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 sm:p-8">
          {/* Project Name */}
          <div className="mb-5">
            <label
              htmlFor="project-name"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Project name
            </label>
            <input
              id="project-name"
              type="text"
              value={input.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder={EXAMPLE_PLACEHOLDER.name}
              className={`w-full rounded-lg border bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors duration-150 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 ${
                errors.name ? "border-red-500/60" : "border-zinc-800"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="mb-5">
            <label
              htmlFor="requirements"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Requirements
            </label>
            <textarea
              id="requirements"
              rows={3}
              value={input.requirements}
              onChange={(e) => updateField("requirements", e.target.value)}
              placeholder={EXAMPLE_PLACEHOLDER.requirements}
              className={`w-full resize-none rounded-lg border bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors duration-150 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 ${
                errors.requirements ? "border-red-500/60" : "border-zinc-800"
              }`}
            />
            {errors.requirements && (
              <p className="mt-1 text-xs text-red-400">{errors.requirements}</p>
            )}
          </div>

          {/* Technical Notes */}
          <div className="mb-5">
            <label
              htmlFor="technical-notes"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Technical notes
            </label>
            <textarea
              id="technical-notes"
              rows={2}
              value={input.technicalNotes}
              onChange={(e) => updateField("technicalNotes", e.target.value)}
              placeholder={EXAMPLE_PLACEHOLDER.technicalNotes}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors duration-150 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
          </div>

          {/* Constraints */}
          <div className="mb-5">
            <label
              htmlFor="constraints"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Constraints
            </label>
            <textarea
              id="constraints"
              rows={2}
              value={input.constraints}
              onChange={(e) => updateField("constraints", e.target.value)}
              placeholder={EXAMPLE_PLACEHOLDER.constraints}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors duration-150 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
          </div>

          {/* Technology Stack */}
          <div className="mb-8">
            <label
              htmlFor="tech-stack"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Technology stack
            </label>
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2.5 transition-colors duration-150 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600">
              {input.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                >
                  {tech}
                  <button
                    onClick={() => removeTech(tech)}
                    className="ml-0.5 rounded text-zinc-500 transition-colors hover:text-zinc-200"
                    aria-label={`Remove ${tech}`}
                    type="button"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                id="tech-stack"
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder={
                  input.techStack.length === 0
                    ? "Type a technology and press Enter"
                    : "Add more..."
                }
                className="min-w-[120px] flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none"
              />
              {techInput.trim() && (
                <button
                  type="button"
                  onClick={() => addTech(techInput)}
                  className="rounded p-0.5 text-zinc-500 transition-colors hover:text-zinc-200"
                  aria-label="Add technology"
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
            <p className="mt-1.5 text-xs text-zinc-600">
              Press Enter to add each technology.
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-white"
          >
            Generate build plan
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
