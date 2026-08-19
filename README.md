# DevFlow — Premium Home Page & Interactive Project Planner

DevFlow is an interactive developer tool that turns project requirements, technical notes, and constraints into a structured build plan and engineering flowchart.

> **Submission for Acdyon Technologies Frontend Challenge (Part 2: The Premium Home Page)**

---

## Features

- **Live Interactive Project Planner**: Form accepting project details, requirements, technical notes, constraints, and dynamic technology stack chips.
- **Dynamic Engineering Flowchart**: Renders step dependencies and parallel work paths (e.g. Database and Backend running in parallel after Architecture) using BFS depth layout and SVG connections.
- **Detailed Step Inspection**: Clickable nodes displaying task checklists, technology badges, direct dependencies, and next steps in a side panel.
- **Strict Dark-Mode Design**: Clean, modern developer-tool aesthetic with zinc/neutral tones, responsive at both 390px and 1440px viewports.
- **Zero Fake Metrics / Data**: 100% honest product showcase without fake user counts, fake logos, fake testimonials, or fake confidence scores.
- **Swappable Architecture**: Client-side deterministic plan generator (`lib/plan-generator.ts`) structured to easily swap for a real backend API endpoint.

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## Technical Decisions & Trade-offs

See [`DECISIONS.md`](./DECISIONS.md) for details on engineering decisions, design trade-offs, and tool usage documentation.
