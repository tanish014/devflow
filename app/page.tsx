"use client";

import { useState, useCallback, useRef } from "react";
import type { ProjectInput, BuildPlan as BuildPlanType, AppState } from "@/types/plan";
import { generatePlan } from "@/lib/plan-generator";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectBuilder from "@/components/ProjectBuilder";
import LoadingState from "@/components/LoadingState";
import BuildPlanSection from "@/components/BuildPlan";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [projectInput, setProjectInput] = useState<ProjectInput | null>(null);
  const [buildPlan, setBuildPlan] = useState<BuildPlanType | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const builderRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  // Scroll to the project builder section
  const scrollToBuilder = useCallback(() => {
    setAppState("input");
    // Wait for render then scroll
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // Handle plan generation
  const handleGenerate = useCallback((input: ProjectInput) => {
    setProjectInput(input);
    setSelectedStepId(null);
    setAppState("loading");

    // Scroll to loading state
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // Called when loading animation completes
  const handleLoadingComplete = useCallback(() => {
    if (!projectInput) return;
    const plan = generatePlan(projectInput);
    setBuildPlan(plan);
    setAppState("plan");

    // Scroll to the plan
    setTimeout(() => {
      planRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [projectInput]);

  // Edit project: go back to builder with current input
  const handleEdit = useCallback(() => {
    setAppState("input");
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // Regenerate plan with current input
  const handleRegenerate = useCallback(() => {
    if (!projectInput) return;
    setSelectedStepId(null);
    setAppState("loading");
  }, [projectInput]);

  return (
    <main className="flex-1">
      {/* Navbar */}
      <Navbar onBuildPlan={scrollToBuilder} />

      {/* Hero — always visible */}
      <Hero onBuildPlan={scrollToBuilder} />

      {/* Project Builder / Loading / Plan area */}
      <div ref={builderRef}>
        {appState === "input" && (
          <ProjectBuilder
            onGenerate={handleGenerate}
            initialInput={projectInput ?? undefined}
          />
        )}

        {appState === "loading" && (
          <LoadingState onComplete={handleLoadingComplete} />
        )}
      </div>

      <div ref={planRef}>
        {appState === "plan" && buildPlan && (
          <BuildPlanSection
            plan={buildPlan}
            selectedStepId={selectedStepId}
            onSelectStep={setSelectedStepId}
            onClearSelection={() => setSelectedStepId(null)}
            onEdit={handleEdit}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>

      {/* Static sections — always visible */}
      <HowItWorks />
      <Features />

      {/* Final CTA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-100">
            Start your next project with a plan.
          </h2>
          <p className="mb-8 text-sm text-zinc-500">
            Stop guessing what to build first. Let DevFlow map out the
            implementation order so you can start shipping.
          </p>
          <button
            onClick={scrollToBuilder}
            className="group inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-white"
          >
            Build a plan
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
