// ─── Plan Types ─────────────────────────────────────────────────────────────
// Single source of truth for all plan-related data structures.
// These types flow from the plan generator through every component.

export type StepStatus = "planned" | "ready" | "in-progress" | "complete";

export type PlanStep = {
  id: string;
  number: number;
  title: string;
  description: string;
  tasks: string[];
  technologies: string[];
  dependencies: string[]; // IDs of steps this depends on
  status: StepStatus;
};

export type BuildPlan = {
  projectName: string;
  summary: string;
  technologies: string[];
  steps: PlanStep[];
};

export type ProjectInput = {
  name: string;
  requirements: string;
  technicalNotes: string;
  constraints: string;
  techStack: string[];
};

export type AppState = "idle" | "input" | "loading" | "plan";
