# Decisions

**Track:** Part 2 (home page)

## 1. Why this approach over the obvious alternative

The brief's question is really about the scraper track, but the closest thing I did was choose how the build plan gets generated. The obvious alternative was calling a real AI API (OpenAI, Claude, etc.) to generate the flowchart.

I didn't, on purpose. A real API needs a key, which breaks the "just works, no setup" goal. It's also non-deterministic — same input could give a different result each time, which makes it harder to demo and harder for me to explain why a step showed up. So `generatePlan()` is plain rule-based logic: it checks the stack and requirements you typed (needs auth? needs payments? frontend-only or full-stack?) and builds the steps from that. Less "smart," but I can point to the exact line that added any given step. It's written so a real API could swap in later without touching the UI.

## 2. One trade-off, and what I'd change with a full week

I built the flowchart myself with plain HTML/CSS cards and SVG lines, instead of using a library like React Flow. Mainly so I'd actually understand every part of it and could explain it easily, and it gave me keyboard navigation for free since everything's real buttons/divs.

With a full week I'd switch to React Flow — better line routing, drag-and-drop, zoom/pan — but I'd keep my own accessibility layer on top since libraries like that don't handle it well by default.

## 3. Where I used AI, and what I checked myself

Used AI to help scaffold components and boilerplate faster. What I personally checked afterward:
- Tested `generatePlan()` with different inputs (frontend-only vs full-stack) to make sure the steps made sense each time
- Went through the flowchart's layer-grouping logic by hand and fixed some SVG arrow positions
- Tested at 390px and 1440px, fixed a couple of layout bugs, tabbed through everything with just a keyboard
- Swept the whole app for fake stats, fake testimonials, or fake numbers and removed any I found

## Easter egg

Konami code (↑ ↑ ↓ ↓ ← → ← → B A) hidden in the footer.
