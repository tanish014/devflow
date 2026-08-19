"use client";

import { useEffect, useState } from "react";

interface LoadingStateProps {
  onComplete: () => void;
}

const STAGES = [
  "Reading requirements...",
  "Identifying technical components...",
  "Planning implementation order...",
  "Mapping dependencies...",
  "Preparing build plan...",
];

const STAGE_DELAY = 800; // ms between stages

export default function LoadingState({ onComplete }: LoadingStateProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, STAGE_DELAY);
      return () => clearTimeout(timer);
    } else {
      // Final stage — wait a beat then complete
      const timer = setTimeout(onComplete, STAGE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [currentStage, onComplete]);

  return (
    <section className="flex min-h-[50vh] items-center justify-center px-5 py-20">
      <div className="mx-auto max-w-md text-center">
        {/* Spinner */}
        <div className="mx-auto mb-8 h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />

        {/* Stage messages */}
        <div className="space-y-2">
          {STAGES.map((stage, i) => (
            <p
              key={stage}
              className={`text-sm transition-all duration-300 ${
                i < currentStage
                  ? "text-zinc-600"
                  : i === currentStage
                    ? "text-zinc-200"
                    : "text-zinc-800"
              }`}
            >
              {i <= currentStage ? stage : ""}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
