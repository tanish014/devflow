"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import type { PlanStep } from "@/types/plan";
import FlowNode from "./FlowNode";

interface FlowChartProps {
  steps: PlanStep[];
  selectedStepId: string | null;
  onSelectStep: (id: string) => void;
}

// ─── Layout Engine ──────────────────────────────────────────────────────────
// Groups steps into "layers" by dependency depth using BFS.
// Steps at the same depth are rendered side-by-side (parallel work).

type LayoutNode = {
  step: PlanStep;
  layer: number;
  indexInLayer: number;
  layerSize: number;
};

function computeLayout(steps: PlanStep[]): LayoutNode[] {
  const stepMap = new Map<string, PlanStep>();
  steps.forEach((s) => stepMap.set(s.id, s));

  // Compute layer depth for each step via BFS
  const depth = new Map<string, number>();

  // Find roots: steps with no dependencies or whose deps aren't in the plan
  const roots = steps.filter(
    (s) =>
      s.dependencies.length === 0 ||
      s.dependencies.every((d) => !stepMap.has(d))
  );
  roots.forEach((r) => depth.set(r.id, 0));

  // BFS to assign depths
  const queue = [...roots];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentDepth = depth.get(current.id) ?? 0;

    // Find children: steps that depend on current
    const children = steps.filter((s) =>
      s.dependencies.includes(current.id)
    );
    for (const child of children) {
      const existingDepth = depth.get(child.id) ?? -1;
      const newDepth = currentDepth + 1;
      if (newDepth > existingDepth) {
        depth.set(child.id, newDepth);
        queue.push(child);
      }
    }
  }

  // Assign depths to any orphans (shouldn't happen, but safety)
  steps.forEach((s) => {
    if (!depth.has(s.id)) depth.set(s.id, 0);
  });

  // Group by layer
  const layers = new Map<number, PlanStep[]>();
  steps.forEach((s) => {
    const d = depth.get(s.id) ?? 0;
    if (!layers.has(d)) layers.set(d, []);
    layers.get(d)!.push(s);
  });

  // Build layout nodes
  const result: LayoutNode[] = [];
  layers.forEach((layerSteps, layerIndex) => {
    layerSteps.forEach((step, indexInLayer) => {
      result.push({
        step,
        layer: layerIndex,
        indexInLayer,
        layerSize: layerSteps.length,
      });
    });
  });

  return result;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function FlowChart({
  steps,
  selectedStepId,
  onSelectStep,
}: FlowChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [connections, setConnections] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const layoutNodes = useMemo(() => computeLayout(steps), [steps]);

  // Group layout nodes by layer for rendering
  const layerGroups = useMemo(() => {
    const groups = new Map<number, LayoutNode[]>();
    layoutNodes.forEach((node) => {
      if (!groups.has(node.layer)) groups.set(node.layer, []);
      groups.get(node.layer)!.push(node);
    });
    return Array.from(groups.entries()).sort(([a], [b]) => a - b);
  }, [layoutNodes]);

  // Calculate SVG connections between parent and child nodes
  const updateConnections = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newConns: { x1: number; y1: number; x2: number; y2: number }[] = [];

    steps.forEach((step) => {
      const childEl = nodeRefs.current.get(step.id);
      if (!childEl) return;

      step.dependencies.forEach((depId) => {
        const parentEl = nodeRefs.current.get(depId);
        if (!parentEl) return;

        const parentRect = parentEl.getBoundingClientRect();
        const childRect = childEl.getBoundingClientRect();

        newConns.push({
          x1: parentRect.left + parentRect.width / 2 - containerRect.left,
          y1: parentRect.bottom - containerRect.top,
          x2: childRect.left + childRect.width / 2 - containerRect.left,
          y2: childRect.top - containerRect.top,
        });
      });
    });

    setConnections(newConns);
  }, [steps]);

  // Recalculate connections after nodes animate in and on resize
  useEffect(() => {
    // Wait for animations to settle
    const timer = setTimeout(updateConnections, 800);
    window.addEventListener("resize", updateConnections);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateConnections);
    };
  }, [updateConnections, steps]);

  // Additional recalculation pass after full animation
  useEffect(() => {
    const timer = setTimeout(updateConnections, 2000);
    return () => clearTimeout(timer);
  }, [updateConnections, steps]);

  return (
    <div className="relative w-full overflow-x-auto" ref={containerRef}>
      {/* SVG arrows layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {connections.map((conn, i) => {
          const midY = (conn.y1 + conn.y2) / 2;
          return (
            <g key={i}>
              <path
                d={`M ${conn.x1} ${conn.y1} C ${conn.x1} ${midY}, ${conn.x2} ${midY}, ${conn.x2} ${conn.y2}`}
                fill="none"
                stroke="rgb(63, 63, 70)"
                strokeWidth="1.5"
              />
              {/* Arrowhead */}
              <polygon
                points={`${conn.x2 - 4},${conn.y2 - 6} ${conn.x2},${conn.y2} ${conn.x2 + 4},${conn.y2 - 6}`}
                fill="rgb(63, 63, 70)"
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes layer */}
      <div className="relative z-10 flex flex-col items-center gap-6 py-4">
        {layerGroups.map(([layerIndex, nodes]) => (
          <div
            key={layerIndex}
            className={`flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5 ${
              nodes.length === 1 ? "" : ""
            }`}
          >
            {nodes.map((layoutNode) => (
              <div
                key={layoutNode.step.id}
                ref={(el) => {
                  if (el) nodeRefs.current.set(layoutNode.step.id, el);
                }}
              >
                <FlowNode
                  step={layoutNode.step}
                  isSelected={selectedStepId === layoutNode.step.id}
                  onClick={() => onSelectStep(layoutNode.step.id)}
                  animationDelay={layoutNode.layer * 0.25}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
