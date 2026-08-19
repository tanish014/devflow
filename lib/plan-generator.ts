// ─── Plan Generator ─────────────────────────────────────────────────────────
// Deterministic, client-side plan generation.
// Structured so this function could later become POST /api/generate-plan
// without touching any UI code.

import { BuildPlan, PlanStep, ProjectInput } from "@/types/plan";

// ─── Keyword Detection ─────────────────────────────────────────────────────

function normalize(text: string): string {
  return text.toLowerCase();
}

function hasAny(text: string, keywords: string[]): boolean {
  const normalized = normalize(text);
  return keywords.some((kw) => normalized.includes(kw));
}

function detectCategories(input: ProjectInput) {
  const allText = [
    input.requirements,
    input.technicalNotes,
    input.constraints,
    ...input.techStack,
  ].join(" ");

  const techStackText = [...input.techStack, input.technicalNotes].join(" ");

  return {
    hasDatabase: hasAny(techStackText, [
      "postgresql",
      "postgres",
      "mongodb",
      "mysql",
      "sqlite",
      "redis",
      "supabase",
      "prisma",
      "drizzle",
      "database",
      "db",
      "sql",
    ]),
    hasBackend: hasAny(techStackText, [
      "node",
      "express",
      "fastify",
      "nest",
      "django",
      "flask",
      "rails",
      "spring",
      "api",
      "backend",
      "server",
      "graphql",
      "rest",
    ]),
    hasFrontend: hasAny(techStackText, [
      "react",
      "vue",
      "angular",
      "svelte",
      "next",
      "nuxt",
      "remix",
      "frontend",
      "ui",
      "tailwind",
      "css",
    ]),
    hasContainerization: hasAny(techStackText, [
      "docker",
      "kubernetes",
      "k8s",
      "container",
      "compose",
    ]),
    hasCloud: hasAny(allText, [
      "aws",
      "gcp",
      "azure",
      "vercel",
      "netlify",
      "heroku",
      "railway",
      "fly.io",
      "deploy",
      "cloud",
    ]),
    hasAuth: hasAny(allText, [
      "auth",
      "login",
      "register",
      "signup",
      "sign up",
      "sign in",
      "session",
      "jwt",
      "oauth",
      "password",
    ]),
    hasPayments: hasAny(allText, [
      "payment",
      "checkout",
      "stripe",
      "billing",
      "subscription",
      "purchase",
      "order",
      "cart",
    ]),
    hasTesting: hasAny(allText, [
      "test",
      "jest",
      "vitest",
      "cypress",
      "playwright",
      "testing",
      "tdd",
      "ci",
      "cd",
    ]),
    hasStateManagement: hasAny(techStackText, [
      "redux",
      "zustand",
      "mobx",
      "recoil",
      "jotai",
      "state management",
    ]),
  };
}

// ─── Tech Extraction ────────────────────────────────────────────────────────

function extractTechnologies(
  input: ProjectInput,
  stepKeywords: string[]
): string[] {
  const allTech = [...input.techStack];
  const techText = [input.technicalNotes, ...input.techStack].join(" ");
  const normalized = normalize(techText);

  // Return only the techs from the user's stack that are relevant to this step
  return allTech.filter((tech) => {
    const t = normalize(tech);
    return stepKeywords.some(
      (kw) => t.includes(kw) || normalize(kw).includes(t)
    );
  });
}

// ─── Step Builders ──────────────────────────────────────────────────────────

let stepCounter = 0;

function makeStep(
  partial: Omit<PlanStep, "id" | "number" | "status">
): PlanStep {
  stepCounter++;
  return {
    id: partial.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    number: stepCounter,
    status: stepCounter === 1 ? "ready" : "planned",
    ...partial,
  };
}

// ─── Main Generator ─────────────────────────────────────────────────────────

export function generatePlan(input: ProjectInput): BuildPlan {
  stepCounter = 0;
  const cats = detectCategories(input);
  const steps: PlanStep[] = [];

  // ── 1. Always start with Architecture & Setup ──
  steps.push(
    makeStep({
      title: "Architecture & Setup",
      description:
        "Define the project structure, initialize repositories, and configure the development environment.",
      tasks: [
        "Initialize project repository and version control",
        "Set up development environment and tooling",
        "Define folder structure and coding conventions",
        "Configure linting, formatting, and editor settings",
        "Set up environment variables and configuration management",
      ],
      technologies: input.techStack.length > 0 ? [input.techStack[0]] : [],
      dependencies: [],
    })
  );

  // ── 2. Database (if detected) ──
  if (cats.hasDatabase) {
    const dbTech = extractTechnologies(input, [
      "postgresql",
      "postgres",
      "mongodb",
      "mysql",
      "sqlite",
      "redis",
      "supabase",
      "prisma",
      "drizzle",
      "sql",
    ]);
    steps.push(
      makeStep({
        title: "Database Design",
        description:
          "Design the data model, create schemas, and set up database infrastructure.",
        tasks: [
          "Design entity-relationship model",
          "Create database schemas and migrations",
          "Set up database connection and pooling",
          "Implement seed data for development",
          "Configure database indexing strategy",
        ],
        technologies: dbTech.length > 0 ? dbTech : ["Database"],
        dependencies: ["architecture---setup"],
      })
    );
  }

  // ── 3. Backend (if detected) ──
  if (cats.hasBackend) {
    const backendTech = extractTechnologies(input, [
      "node",
      "express",
      "fastify",
      "nest",
      "django",
      "flask",
      "rails",
      "spring",
      "graphql",
    ]);
    const backendDeps = ["architecture---setup"];
    if (cats.hasDatabase) backendDeps.push("database-design");

    steps.push(
      makeStep({
        title: "Backend API",
        description:
          "Build the server-side API, business logic, and data access layer.",
        tasks: [
          "Create application structure and entry point",
          "Configure API routes and controllers",
          "Implement data validation and error handling",
          cats.hasDatabase
            ? "Connect to database and implement data access"
            : "Set up data layer and storage",
          "Add request logging and monitoring",
        ],
        technologies:
          backendTech.length > 0 ? backendTech : ["Node.js", "Express"],
        dependencies: backendDeps,
      })
    );
  }

  // ── 4. Authentication (if detected) ──
  if (cats.hasAuth) {
    const authDeps = ["architecture---setup"];
    if (cats.hasBackend) authDeps.push("backend-api");

    steps.push(
      makeStep({
        title: "Authentication",
        description:
          "Implement user authentication, session management, and access control.",
        tasks: [
          "Design authentication flow and user model",
          "Implement registration and login endpoints",
          "Set up session or token-based authentication",
          "Add password hashing and security measures",
          "Implement role-based access control",
        ],
        technologies: extractTechnologies(input, ["jwt", "oauth", "auth"]),
        dependencies: authDeps,
      })
    );
  }

  // ── 5. Frontend (if detected) ──
  if (cats.hasFrontend) {
    const frontendTech = extractTechnologies(input, [
      "react",
      "vue",
      "angular",
      "svelte",
      "next",
      "nuxt",
      "remix",
      "tailwind",
      "css",
      "typescript",
    ]);
    const frontendDeps: string[] = [];
    if (cats.hasBackend) frontendDeps.push("backend-api");
    else frontendDeps.push("architecture---setup");
    if (cats.hasAuth) frontendDeps.push("authentication");

    steps.push(
      makeStep({
        title: "Frontend Development",
        description:
          "Build the user interface, components, and client-side interactions.",
        tasks: [
          "Set up component architecture and routing",
          "Build core UI components and layouts",
          "Implement forms, validation, and user feedback",
          cats.hasBackend
            ? "Connect to backend API and handle data fetching"
            : "Implement client-side data management",
          "Add responsive design and accessibility",
        ],
        technologies:
          frontendTech.length > 0 ? frontendTech : ["React", "TypeScript"],
        dependencies: frontendDeps,
      })
    );
  }

  // ── 5b. State Management (if detected and has frontend) ──
  if (cats.hasStateManagement && cats.hasFrontend) {
    const smTech = extractTechnologies(input, [
      "redux",
      "zustand",
      "mobx",
      "recoil",
      "jotai",
    ]);
    steps.push(
      makeStep({
        title: "State Management",
        description:
          "Configure global state management and data flow patterns.",
        tasks: [
          "Set up state management library",
          "Define stores and state shape",
          "Implement actions and selectors",
          "Connect components to state",
        ],
        technologies: smTech,
        dependencies: ["frontend-development"],
      })
    );
  }

  // ── 6. Payments (if detected) ──
  if (cats.hasPayments) {
    const payDeps: string[] = [];
    if (cats.hasFrontend) payDeps.push("frontend-development");
    if (cats.hasBackend) payDeps.push("backend-api");
    if (payDeps.length === 0) payDeps.push("architecture---setup");

    steps.push(
      makeStep({
        title: "Payment Integration",
        description:
          "Integrate payment processing, checkout flow, and order management.",
        tasks: [
          "Set up payment provider integration",
          "Build checkout and payment UI",
          "Implement order processing logic",
          "Add payment confirmation and receipts",
          "Handle payment errors and edge cases",
        ],
        technologies: extractTechnologies(input, ["stripe", "payment"]),
        dependencies: payDeps,
      })
    );
  }

  // ── 7. Testing ──
  {
    const lastContentStep = steps[steps.length - 1];
    steps.push(
      makeStep({
        title: "Testing",
        description:
          "Write and run tests to verify functionality, integration, and edge cases.",
        tasks: [
          "Set up testing framework and configuration",
          "Write unit tests for core business logic",
          cats.hasBackend
            ? "Write API integration tests"
            : "Write component tests",
          cats.hasFrontend ? "Write UI component tests" : "Write module tests",
          "Run tests and fix identified issues",
        ],
        technologies: extractTechnologies(input, [
          "jest",
          "vitest",
          "cypress",
          "playwright",
        ]),
        dependencies: [lastContentStep.id],
      })
    );
  }

  // ── 8. Containerization (if detected) ──
  if (cats.hasContainerization) {
    const containerTech = extractTechnologies(input, [
      "docker",
      "kubernetes",
      "k8s",
      "compose",
    ]);
    steps.push(
      makeStep({
        title: "Containerization",
        description:
          "Package the application in containers for consistent deployment.",
        tasks: [
          "Create Dockerfile for the application",
          "Configure multi-stage builds for optimization",
          "Set up Docker Compose for local development",
          "Test container builds and runtime",
        ],
        technologies:
          containerTech.length > 0 ? containerTech : ["Docker"],
        dependencies: ["testing"],
      })
    );
  }

  // ── 9. Deployment (if cloud detected) ──
  if (cats.hasCloud) {
    const cloudTech = extractTechnologies(input, [
      "aws",
      "gcp",
      "azure",
      "vercel",
      "netlify",
      "heroku",
      "railway",
    ]);
    const deployDeps = cats.hasContainerization
      ? ["containerization"]
      : ["testing"];

    steps.push(
      makeStep({
        title: "Deployment",
        description:
          "Configure cloud infrastructure and deploy the application.",
        tasks: [
          "Set up cloud provider and project configuration",
          "Configure CI/CD pipeline",
          "Set up environment variables and secrets",
          "Deploy application to staging environment",
          "Verify deployment and run smoke tests",
        ],
        technologies: cloudTech.length > 0 ? cloudTech : ["Cloud"],
        dependencies: deployDeps,
      })
    );
  }

  // ── 10. Always end with Production ──
  {
    const lastStep = steps[steps.length - 1];
    steps.push(
      makeStep({
        title: "Production",
        description:
          "Final production readiness checks, monitoring setup, and launch preparation.",
        tasks: [
          "Run final production build and verification",
          "Configure monitoring and error tracking",
          "Set up logging and alerting",
          "Perform security review and hardening",
          "Document deployment and runbook procedures",
        ],
        technologies: [],
        dependencies: [lastStep.id],
      })
    );
  }

  // ── Renumber steps sequentially ──
  steps.forEach((step, i) => {
    step.number = i + 1;
    step.status = i === 0 ? "ready" : "planned";
  });

  // ── Build summary ──
  const allTech =
    input.techStack.length > 0
      ? input.techStack
      : steps.flatMap((s) => s.technologies).filter(Boolean);
  const uniqueTech = [...new Set(allTech)];

  return {
    projectName: input.name,
    summary: `${steps.length} implementation steps to build ${input.name} using ${uniqueTech.join(", ")}.`,
    technologies: uniqueTech,
    steps,
  };
}
