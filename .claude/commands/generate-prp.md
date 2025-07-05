# Create PRP

## Feature file: $ARGUMENTS

Generate a complete PRP for React/TypeScript feature implementation with thorough research. Ensure context is passed to the AI agent to enable self-validation and iterative refinement. Read the feature file first to understand what needs to be created, how the examples provided help, and any other considerations.

The AI agent only gets the context you are appending to the PRP and training data. Assume the AI agent has access to the codebase and the same knowledge cutoff as you, so its important that your research findings are included or referenced in the PRP. The Agent has Websearch capabilities, so pass urls to documentation and examples.

## Research Process

1. **Codebase Analysis**
   - Search for similar React components/patterns in the codebase
   - Identify TypeScript interfaces and types to reference
   - Note existing component conventions to follow
   - Check test patterns (Vitest/React Testing Library)
   - Review custom hooks patterns
   - Analyze state management approach

2. **External Research**
   - React documentation (hooks, patterns, best practices)
   - TypeScript handbook (generics, utility types, strict mode)
   - Vite documentation (env vars, build optimization)
   - UI library documentation if used (Tailwind, MUI, etc.)
   - Implementation examples (GitHub/blogs/official examples)
   - Common React pitfalls and performance considerations

3. **User Clarification** (if needed)
   - Component composition patterns to follow?
   - State management approach (Context, Redux, Zustand)?
   - Styling approach (CSS modules, Tailwind, styled-components)?
   - Accessibility requirements?

## PRP Generation

Using PRPs/templates/prp_base.md as template:

### Critical Context to Include and pass to the AI agent as part of the PRP
- **Documentation**: React.dev URLs, TypeScript docs, library APIs
- **Code Examples**: Component patterns, hooks, utils from codebase
- **Gotchas**: React 18 behaviors, TypeScript strict mode, Vite specifics
- **Patterns**: Component structure, naming conventions, test patterns

### Implementation Blueprint
- Start with TypeScript interfaces/types
- Component hierarchy and composition plan
- Custom hooks design if needed
- State management approach
- Error boundary strategy
- Include responsive design considerations
- List tasks to be completed to fulfill the PRP in the order they should be completed

### Validation Gates (Must be Executable) for React/TypeScript
```bash
# Syntax/Style
npm run lint && npm run typecheck

# Format code
npm run format

# Unit Tests
npm run test

# Build check
npm run build
```

*** CRITICAL AFTER YOU ARE DONE RESEARCHING AND EXPLORING THE CODEBASE BEFORE YOU START WRITING THE PRP ***

*** ULTRATHINK ABOUT THE PRP AND PLAN YOUR APPROACH THEN START WRITING THE PRP ***

## Output
Save as: `PRPs/{feature-name}.md`

## Quality Checklist
- [ ] All necessary context included
- [ ] Validation gates are executable by AI
- [ ] References existing patterns
- [ ] Clear implementation path
- [ ] Error handling documented

Score the PRP on a scale of 1-10 (confidence level to succeed in one-pass implementation using claude codes)

Remember: The goal is one-pass implementation success through comprehensive context.