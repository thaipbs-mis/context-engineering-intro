

## Tech Stack
**Frontend**: Vite, React 18, TypeScript, Tailwind CSS, Shadcn/ui, Zustand, Framer Motion, react-i18next (Thai default), Recharts  
**API**: Tanstack Query  
**Backend**: Supabase  
**Testing**: Vitest, Playwright, Testing Library

## Code Structure
- Max 300 lines per file
- Organize by feature: `components/`, `hooks/`, `utils/`, `types/`, `services/`
- Named exports (except pages)
- Use `@/` for src imports
- Environment vars: `import.meta.env`

## Testing
- Vitest tests for all new features
- Co-locate tests (`.test.tsx`)
- Cover: expected use, edge case, failure case
- React Testing Library for components

## Conventions
- TypeScript strict mode
- Functional components only
- ESLint + Prettier
- No `any` types
- JSDoc for complex functions

## Key Features
- HMR, TypeScript strict, @/ paths
- Dark/light themes, responsive design
- Test coverage, error boundaries
- Mobile navigation, user dropdown

## AI Rules
- Ask when uncertain
- Only use installed packages
- Verify paths before use
- Don't delete code without instruction