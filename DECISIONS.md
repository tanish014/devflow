# Engineering Decisions & Reflection

## 1. Track Choice

I am submitting for **Part 2: The Premium Home Page track**.  
*(Note: The ingestion-strategy question in the assessment prompt is specific to Part 1, so I am focusing on the frontend product experience here).*

---

## 2. Trade-Off Made Under the Time Limit

**Decision:** I built the flowchart using custom HTML/CSS cards combined with inline SVG arrows calculated using a simple BFS (Breadth-First Search) depth grouping algorithm, rather than pulling in a heavy external library like React Flow or D3.js.

**Why:**
- **Simplicity & Speed:** I wanted something lightweight and easy to explain line-by-line during an interview without getting bogged down in complex third-party library abstractions.
- **Accessibility:** Using standard HTML elements meant the flowchart nodes naturally support keyboard navigation (`Tab`, `Enter`, `Space`) and focus outlines right out of the box.

**What I'd do with a full week:**
Given a full week, I would integrate **React Flow**. That would give users interactive drag-and-drop nodes, smooth canvas panning/zooming, automatic curved line routing to avoid overlaps in large graphs, and a mini-map preview — while keeping custom keyboard navigation wrappers for accessibility.

---

## 3. How AI Tools Were Used & What I Personally Verified

I used AI assistance for initial component boilerplate and layout scaffolding, but I manually reviewed, tuned, and verified all the logic and design details:

1. **Plan Generation Logic (`lib/plan-generator.ts`)**: I tested the keyword detection logic with various inputs (frontend-only stacks like React+TypeScript vs full-stack setups with Node, Postgres, and Docker) to ensure the generated flowchart steps and parallel branches made practical sense.
2. **Flowchart Positioning & Arrows (`components/FlowChart.tsx`)**: I verified the layer grouping algorithm to make sure parallel steps (like Backend and Database) display side-by-side cleanly, and fixed the SVG coordinate math for the connection arrows.
3. **Responsive Design & Accessibility**: I manually tested the layout at mobile (390px) and desktop (1440px) screen sizes to fix text clipping and stacking issues. I also verified keyboard navigation through form inputs and flowchart nodes.
4. **Product Honesty**: I did a strict sweep across the app to make sure there are no fake metrics, fake customer counts, or fake testimonials anywhere.

---

## 4. Easter Egg

I added a small Konami code listener (`↑ ↑ ↓ ↓ ← → ← → B A`) in `Footer.tsx` that reveals a quick hidden message when typed on the keyboard!
