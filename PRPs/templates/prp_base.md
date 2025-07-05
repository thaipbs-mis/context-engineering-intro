name: "Base PRP Template v2 - Context-Rich with Validation Loops (React/TypeScript)"
description: |

## Purpose
Template optimized for AI agents to implement React/TypeScript features with sufficient context and self-validation capabilities to achieve working code through iterative refinement.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
[What needs to be built - be specific about the end state and desires]

## Why
- [Business value and user impact]
- [Integration with existing features]
- [Problems this solves and for whom]

## What
[User-visible behavior and technical requirements]

### Success Criteria
- [ ] [Specific measurable outcomes]

## All Needed Context

### Documentation & References (list all context needed to implement the feature)
```yaml
# MUST READ - Include these in your context window
- url: [React documentation URL]
  why: [Specific hooks/patterns you'll need]
  
- file: [src/components/example.tsx]
  why: [Pattern to follow, gotchas to avoid]
  
- doc: [Library documentation URL] 
  section: [Specific section about TypeScript usage]
  critical: [Key insight that prevents common errors]

- docfile: [PRPs/ai_docs/file.md]
  why: [docs that the user has pasted in to the project]

```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase
```bash

```

### Desired Codebase tree with files to be added and responsibility of file
```bash

```

### Known Gotchas of our codebase & Library Quirks
```typescript
// CRITICAL: [Library name] requires [specific setup]
// Example: React hooks must be called at the top level
// Example: Vite requires .tsx extension for JSX content
// Example: We use strict TypeScript - no implicit any
// Example: State updates are batched in React 18
```

## Implementation Blueprint

### Type definitions and interfaces

Create the core TypeScript types and interfaces for type safety.
```typescript
Examples: 
 - Component prop interfaces
 - API response types
 - Redux/Context state types
 - Custom hook return types
 - Utility type helpers

```

### list of tasks to be completed to fullfill the PRP in the order they should be completed

```yaml
Task 1:
MODIFY src/components/ExistingComponent.tsx:
  - FIND pattern: "interface ComponentProps"
  - ADD new prop to interface
  - UPDATE component logic to use new prop

CREATE src/components/NewFeature/NewFeature.tsx:
  - MIRROR pattern from: src/components/SimilarFeature/SimilarFeature.tsx
  - MODIFY component name and core logic
  - KEEP error boundary pattern identical

CREATE src/hooks/useNewFeature.ts:
  - FOLLOW pattern from: src/hooks/useApi.ts
  - IMPLEMENT loading, error, and data states
  - USE proper TypeScript generics

...(...)

Task N:
...

```


### Per task pseudocode as needed added to each task
```typescript

// Task 1 - Component Implementation
// Pseudocode with CRITICAL details dont write entire code
interface NewFeatureProps {
  data: DataType;
  onAction: (id: string) => void;
}

export const NewFeature: React.FC<NewFeatureProps> = ({ data, onAction }) => {
  // PATTERN: Always use custom hooks for logic (see src/hooks/)
  const { loading, error, processedData } = useNewFeature(data);
  
  // GOTCHA: Memoize expensive computations
  const expensiveValue = useMemo(() => {
    // PATTERN: See src/utils/calculations.ts
    return calculateExpensive(processedData);
  }, [processedData]);
  
  // PATTERN: Handle loading and error states first
  if (loading) return <Spinner />; // see src/components/common/
  if (error) return <ErrorMessage error={error} />;
  
  // CRITICAL: Event handlers should be memoized
  const handleClick = useCallback((id: string) => {
    // PATTERN: Validate before calling parent
    if (isValidId(id)) {
      onAction(id);
    }
  }, [onAction]);
  
  return (
    // Component JSX following existing patterns
  );
};
```

### Integration Points
```yaml
COMPONENTS:
  - import in: src/App.tsx or relevant parent
  - pattern: "import { NewFeature } from './components/NewFeature';"
  
TYPES:
  - add to: src/types/index.ts
  - pattern: "export interface FeatureData { ... }"
  
STATE:
  - if using Context: src/contexts/AppContext.tsx
  - if using Redux: src/store/slices/featureSlice.ts
  
ROUTES:
  - add to: src/App.tsx or router config
  - pattern: "<Route path='/feature' element={<NewFeature />} />"
  
API:
  - add to: src/services/api.ts
  - pattern: "export const fetchFeature = async (id: string): Promise<FeatureData> => { ... }"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Run these FIRST - fix any errors before proceeding
npm run lint                         # ESLint check
npm run typecheck                    # TypeScript checking
npm run format                       # Prettier formatting

# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Unit Tests each new feature/file/function use existing test patterns
```typescript
// CREATE NewFeature.test.tsx with these test cases:
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { NewFeature } from './NewFeature';

describe('NewFeature', () => {
  it('renders with data correctly', () => {
    const mockData = { id: '1', name: 'Test' };
    render(<NewFeature data={mockData} onAction={vi.fn()} />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('calls onAction when clicked', () => {
    const onAction = vi.fn();
    const mockData = { id: '1', name: 'Test' };
    render(<NewFeature data={mockData} onAction={onAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalledWith('1');
  });
  
  it('shows loading state', () => {
    // Mock the hook to return loading state
    vi.mock('./useNewFeature', () => ({
      useNewFeature: () => ({ loading: true, error: null, data: null })
    }));
    
    render(<NewFeature data={{}} onAction={vi.fn()} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
```

```bash
# Run and iterate until passing:
npm run test NewFeature.test.tsx
# If failing: Read error, understand root cause, fix code, re-run (never mock to pass)
```

### Level 3: Integration Test
```bash
# Start the development server
npm run dev

# Test the component/page
# Navigate to: http://localhost:5173/feature
# Or test API integration:
curl http://localhost:5173/api/feature/1

# Expected: Component renders with data
# If error: Check browser console and network tab
```

## Final validation Checklist
- [ ] All tests pass: `npm run test`
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npm run typecheck`
- [ ] Build succeeds: `npm run build`
- [ ] Manual test successful: Component renders and functions
- [ ] Error cases handled gracefully
- [ ] Accessibility checked (keyboard nav, screen reader)
- [ ] Documentation/README updated if needed

---

## Anti-Patterns to Avoid
- ❌ Don't create new patterns when existing ones work
- ❌ Don't skip validation because "it should work"  
- ❌ Don't ignore failing tests - fix them
- ❌ Don't use any type - be specific with TypeScript
- ❌ Don't hardcode values that should be props/env vars
- ❌ Don't mutate state directly - use immutable updates
- ❌ Don't forget to clean up effects (useEffect return)
- ❌ Don't use index as key in dynamic lists