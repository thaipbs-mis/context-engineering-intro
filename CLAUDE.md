### 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.
- **Use npm/yarn** for dependency management and script execution.

### 🧱 Code Structure & Modularity
- **Never create a file longer than 300 lines of code.** If a file approaches this limit, refactor by splitting it into modules or components.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
  For React apps this looks like:
    - `components/` - Reusable UI components
    - `hooks/` - Custom React hooks
    - `utils/` - Utility functions and helpers
    - `types/` - TypeScript type definitions
    - `services/` - API clients and external service integrations
- **Use named exports** for components and utilities, default exports only for pages.
- **Use absolute imports** with the `@/` alias for src directory.
- **Use environment variables** through Vite's import.meta.env.

### 🧪 Testing & Reliability
- **Always create Vitest unit tests for new features** (components, hooks, utilities).
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it.
- **Tests should live alongside the code** with `.test.tsx` or `.spec.tsx` extension.
  - Include at least:
    - 1 test for expected use
    - 1 edge case
    - 1 failure case
- **Use React Testing Library** for component tests.

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.

### 📎 Style & Conventions
- **Use TypeScript** with strict mode enabled.
- **Use React functional components** with hooks (no class components).
- **Follow ESLint rules** and format with Prettier.
- **Use proper TypeScript types** (avoid `any`).
- Write **JSDoc comments for complex functions**:
  ```typescript
  /**
   * Brief summary.
   * 
   * @param param1 - Description
   * @returns Description
   */
  function example(param1: string): number {
    // implementation
  }
  ```

### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline comment** explaining the why, not just the what.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use npm packages that are installed in package.json.
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.