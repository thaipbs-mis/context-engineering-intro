# Execute React/TypeScript PRP

Implement a React/TypeScript feature using the PRP file.

## PRP File: $ARGUMENTS

## Execution Process

1. **Load PRP**
   - Read the specified PRP file
   - Understand all React component requirements
   - Review TypeScript interfaces and types needed
   - Follow all instructions in the PRP and extend the research if needed
   - Ensure you have all needed context to implement the PRP fully
   - Do more web searches for React patterns and TypeScript best practices as needed

2. **ULTRATHINK**
   - Think hard before you execute the plan. Create a comprehensive plan addressing all requirements.
   - Plan component hierarchy and data flow
   - Design TypeScript interfaces and types first
   - Identify custom hooks needed
   - Plan state management approach
   - Break down complex components into smaller, manageable pieces using your todos tools.
   - Use the TodoWrite tool to create and track your implementation plan.
   - Identify React patterns from existing code to follow.

3. **Execute the plan**
   - Create TypeScript types/interfaces first
   - Implement React components following the hierarchy
   - Create custom hooks as needed
   - Add proper error boundaries
   - Implement responsive design
   - Write unit tests alongside components
   - Ensure accessibility (ARIA labels, keyboard navigation)

4. **Validate**
   ```bash
   # TypeScript compilation
   npm run typecheck
   
   # Linting
   npm run lint
   
   # Run tests
   npm run test
   
   # Build check
   npm run build
   
   # Format code
   npm run format
   ```
   - Fix any TypeScript errors first
   - Address linting issues
   - Ensure all tests pass
   - Verify build succeeds
   - Re-run until all pass

5. **Complete**
   - Ensure all checklist items done
   - Run final validation suite: `npm run lint && npm run typecheck && npm run test && npm run build`
   - Test component in browser (npm run dev)
   - Check responsive design
   - Verify accessibility
   - Report completion status
   - Read the PRP again to ensure you have implemented everything

6. **Reference the PRP**
   - You can always reference the PRP again if needed
   - Double-check all TypeScript types are properly defined
   - Ensure all React best practices are followed

Note: Common issues to watch for:
- TypeScript strict mode errors (no implicit any)
- React hook dependency arrays
- Proper cleanup in useEffect
- Accessibility requirements
- Responsive design breakpoints