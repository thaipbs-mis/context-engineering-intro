name: "React AI Assistant: Research Interface with Email Draft Component"
description: |

## Purpose
Build a React/TypeScript application with AI-powered research capabilities using OpenAI API and email draft generation. This demonstrates modern React patterns with AI integration, custom hooks, and component composition.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance

---

## Goal
Create a production-ready React application where users can research topics via a web interface, and the AI Assistant can generate email drafts based on research. The system should support streaming responses, error handling, and responsive design.

## Why
- **Business value**: Provides intuitive web interface for AI-powered research and communication
- **Integration**: Demonstrates advanced React patterns with AI streaming
- **Problems solved**: Reduces friction in research-based email workflows with modern UX

## What
A React web application where:
- Users input research queries through a chat interface
- AI searches using web search API integration
- AI can generate email drafts based on research context
- Results stream in real-time with loading states
- Responsive design works on all devices

### Success Criteria
- [ ] Chat interface successfully sends queries to AI
- [ ] AI responses stream with proper loading states
- [ ] Email draft component generates and displays drafts
- [ ] All components are properly typed with TypeScript
- [ ] All tests pass and code meets quality standards

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://platform.openai.com/docs/api-reference/chat
  why: OpenAI Chat API for streaming responses
  
- url: https://react.dev/reference/react/use
  why: React patterns for async data and streaming
  
- url: https://www.typescriptlang.org/docs/handbook/2/generics.html
  why: TypeScript generics for type-safe hooks
  
- url: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
  why: Server-sent events for streaming responses
  
- file: examples/components/Button.tsx
  why: Component pattern with TypeScript props
  
- file: examples/hooks/useApi.ts
  why: Custom hook pattern for API calls
  
- file: examples/utils/validation.ts
  why: Form validation patterns

- url: https://tailwindcss.com/docs/responsive-design
  why: Responsive design patterns we'll use
```

### Current Codebase tree
```bash
.
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── examples/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── PRPs/
│   └── templates/
│       └── prp_base.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Desired Codebase tree with files to be added
```bash
.
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   │   ├── Chat.tsx              # Main chat interface
│   │   │   ├── Chat.test.tsx         # Chat component tests
│   │   │   ├── ChatMessage.tsx       # Individual message component
│   │   │   ├── ChatInput.tsx         # Input with submit handling
│   │   │   └── index.ts              # Barrel export
│   │   ├── EmailDraft/
│   │   │   ├── EmailDraft.tsx        # Email draft display/edit
│   │   │   ├── EmailDraft.test.tsx   # Email component tests
│   │   │   ├── EmailForm.tsx         # Email form inputs
│   │   │   └── index.ts              # Barrel export
│   │   └── common/
│   │       ├── LoadingSpinner.tsx    # Reusable spinner
│   │       ├── ErrorBoundary.tsx     # Error handling wrapper
│   │       └── index.ts              # Barrel exports
│   ├── hooks/
│   │   ├── useAIChat.ts              # AI chat state management
│   │   ├── useStreamResponse.ts      # SSE streaming hook
│   │   └── useEmailDraft.ts          # Email draft management
│   ├── services/
│   │   ├── ai.service.ts             # OpenAI API integration
│   │   ├── search.service.ts         # Search API integration
│   │   └── storage.service.ts        # Local storage helpers
│   ├── types/
│   │   ├── chat.types.ts             # Chat-related types
│   │   ├── email.types.ts            # Email-related types
│   │   └── index.ts                  # Type exports
│   ├── utils/
│   │   ├── streamParser.ts           # Parse SSE streams
│   │   ├── sanitizer.ts              # Sanitize user input
│   │   └── formatters.ts             # Format messages/dates
│   ├── contexts/
│   │   └── AppContext.tsx            # Global app state
│   ├── styles/
│   │   └── globals.css               # Global styles/animations
│   └── App.tsx                       # Updated main app
├── .env.example                      # Environment template
├── README.md                         # Comprehensive docs
└── vercel.json                       # Deployment config
```

### Known Gotchas & Library Quirks
```typescript
// CRITICAL: OpenAI streaming requires EventSource polyfill for some browsers
// CRITICAL: React 18 automatic batching affects streaming updates
// CRITICAL: TypeScript strict mode - no implicit any allowed
// CRITICAL: Tailwind purges unused styles - use full class names
// CRITICAL: Vite env vars must be prefixed with VITE_
// CRITICAL: Always cleanup EventSource connections in useEffect
// CRITICAL: Use AbortController for cancelling API requests
```

## Implementation Blueprint

### Type definitions and interfaces

```typescript
// types/chat.types.ts - Core chat types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    tokens?: number;
  };
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// types/email.types.ts - Email types
export interface EmailDraft {
  id: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  attachments?: Attachment[];
  createdAt: Date;
}

export interface EmailFormData {
  to: string;
  subject: string;
  body: string;
  basedOn?: string; // Research context
}

// types/index.ts - Utility types
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
```

### List of tasks to be completed

```yaml
Task 1: Setup Environment and Configuration
CREATE .env.example:
  - Include VITE_OPENAI_API_KEY placeholder
  - Add VITE_SEARCH_API_KEY placeholder
  - Follow Vite env var naming convention

UPDATE src/services/ai.service.ts:
  - Create OpenAI client singleton
  - Handle API key from env vars
  - Implement streaming chat method

Task 2: Create Chat Components
CREATE src/components/Chat/Chat.tsx:
  - PATTERN: Follow examples/components patterns
  - Use useAIChat hook for state
  - Implement auto-scroll to bottom
  - Handle loading and error states

CREATE src/components/Chat/ChatMessage.tsx:
  - PATTERN: Memoize with React.memo
  - Render markdown content
  - Show timestamp and metadata
  - Support copy-to-clipboard

CREATE src/components/Chat/ChatInput.tsx:
  - PATTERN: Controlled component
  - Handle Enter key submission
  - Show character count
  - Disable during loading

Task 3: Implement AI Hooks
CREATE src/hooks/useAIChat.ts:
  - PATTERN: Follow useApi.ts structure
  - Manage messages array state
  - Handle streaming responses
  - Implement retry logic

CREATE src/hooks/useStreamResponse.ts:
  - Use EventSource for SSE
  - Parse streaming JSON chunks
  - Handle connection errors
  - Cleanup on unmount

Task 4: Create Email Draft Components
CREATE src/components/EmailDraft/EmailDraft.tsx:
  - PATTERN: Component composition
  - Display formatted email
  - Edit mode with form
  - Copy to clipboard action

CREATE src/components/EmailDraft/EmailForm.tsx:
  - PATTERN: Form validation from examples
  - Validate email addresses
  - Auto-save to localStorage
  - Clear form action

Task 5: Implement Services
CREATE src/services/ai.service.ts:
  - Singleton pattern for API client
  - Stream chat completions
  - Handle rate limits
  - Format for frontend consumption

CREATE src/services/storage.service.ts:
  - Type-safe localStorage wrapper
  - Handle JSON serialization
  - Implement session storage
  - Add migration logic

Task 6: Add Global Context
CREATE src/contexts/AppContext.tsx:
  - PATTERN: Context + useReducer
  - Manage chat sessions
  - Store email drafts
  - Handle theme preferences

Task 7: Update Main App
UPDATE src/App.tsx:
  - Add routing if needed
  - Wrap with ErrorBoundary
  - Include global styles
  - Setup context providers

Task 8: Add Comprehensive Tests
CREATE tests for all components:
  - PATTERN: Testing Library best practices
  - Mock API responses
  - Test error states
  - Ensure accessibility

Task 9: Create Documentation
UPDATE README.md:
  - Setup instructions
  - API key configuration
  - Development workflow
  - Deployment guide
```

### Per task pseudocode

```typescript
// Task 3: useAIChat Hook Implementation
// Pseudocode with CRITICAL details
interface UseAIChatReturn {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  clearMessages: () => void;
}

export function useAIChat(): UseAIChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const sendMessage = useCallback(async (content: string) => {
    // PATTERN: Optimistic update
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    
    // CRITICAL: Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    try {
      // PATTERN: Streaming response handling
      const stream = await aiService.streamChat(
        messages.concat(userMessage),
        { signal: abortControllerRef.current.signal }
      );
      
      let assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // CRITICAL: Handle streaming chunks
      for await (const chunk of stream) {
        assistantMessage.content += chunk;
        // GOTCHA: React 18 batches these updates
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: assistantMessage.content }
              : msg
          )
        );
      }
    } catch (err) {
      // PATTERN: Differentiate error types
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [messages]);
  
  // CRITICAL: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  return { messages, sendMessage, loading, error, clearMessages };
}

// Task 4: Email Draft Component
interface EmailDraftProps {
  initialData?: Partial<EmailDraft>;
  onSave: (draft: EmailDraft) => void;
  context?: string; // Research context
}

export const EmailDraft: React.FC<EmailDraftProps> = ({ 
  initialData, 
  onSave, 
  context 
}) => {
  // PATTERN: Memoize expensive computations
  const suggestedContent = useMemo(() => {
    if (!context) return null;
    return generateEmailFromContext(context);
  }, [context]);
  
  // PATTERN: Form state management
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isValid
  } = useEmailForm(initialData);
  
  // CRITICAL: Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData && isValid) {
        localStorage.setItem('emailDraft', JSON.stringify(formData));
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [formData, isValid]);
  
  return (
    <div className="email-draft-container">
      {/* Component JSX */}
    </div>
  );
};
```

### Integration Points
```yaml
COMPONENTS:
  - import in: src/App.tsx
  - pattern: |
      import { Chat } from './components/Chat';
      import { EmailDraft } from './components/EmailDraft';
  
STATE:
  - Context Provider: src/contexts/AppContext.tsx
  - pattern: |
      <AppProvider>
        <App />
      </AppProvider>
  
SERVICES:
  - API configuration: src/services/ai.service.ts
  - pattern: |
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      if (!API_KEY) throw new Error('API key required');
  
STYLES:
  - Tailwind classes throughout
  - Global styles in src/styles/globals.css
  - Component-specific styles co-located
  
ROUTING (if needed):
  - React Router in App.tsx
  - pattern: |
      <Route path="/" element={<Chat />} />
      <Route path="/drafts" element={<EmailDrafts />} />
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Run these FIRST - fix any errors before proceeding
npm run lint                    # ESLint with React rules
npm run typecheck              # TypeScript strict mode
npm run format                 # Prettier formatting

# Expected: No errors. If errors, READ and fix.
```

### Level 2: Unit Tests
```typescript
// Chat.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chat } from './Chat';

describe('Chat Component', () => {
  it('sends message on submit', async () => {
    const user = userEvent.setup();
    render(<Chat />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const button = screen.getByRole('button', { name: 'Send' });
    
    await user.type(input, 'Test message');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });
  
  it('shows loading state during API call', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Type your message...');
    
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.submit(input.closest('form')!);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  
  it('handles API errors gracefully', async () => {
    // Mock API to return error
    vi.mock('../services/ai.service', () => ({
      streamChat: vi.fn().mockRejectedValue(new Error('API Error'))
    }));
    
    render(<Chat />);
    // ... test error handling
  });
});

// useAIChat.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAIChat } from './useAIChat';

describe('useAIChat Hook', () => {
  it('adds user message optimistically', async () => {
    const { result } = renderHook(() => useAIChat());
    
    act(() => {
      result.current.sendMessage('Hello AI');
    });
    
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe('user');
  });
});
```

```bash
# Run tests iteratively until passing:
npm run test
# Or watch mode:
npm run test -- --watch

# Check coverage:
npm run test:coverage
```

### Level 3: Integration Test
```bash
# Start dev server
npm run dev

# Manual testing checklist:
# 1. Open http://localhost:5173
# 2. Type a research query
# 3. Verify streaming response appears
# 4. Click "Generate Email Draft"
# 5. Verify email form populates
# 6. Test form validation
# 7. Check responsive design on mobile
# 8. Test error states (invalid API key)

# E2E test with Playwright (if configured):
npm run test:e2e
```

## Final validation Checklist
- [ ] All tests pass: `npm run test`
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npm run typecheck`
- [ ] Build succeeds: `npm run build`
- [ ] Streaming responses work smoothly
- [ ] Email drafts generate correctly
- [ ] Error states show user-friendly messages
- [ ] Responsive design works on mobile
- [ ] Accessibility audit passes
- [ ] README includes setup instructions
- [ ] .env.example has all required vars

---

## Anti-Patterns to Avoid
- ❌ Don't hardcode API keys - use env vars
- ❌ Don't use any type - be specific with TypeScript
- ❌ Don't forget to cleanup EventSource/AbortController
- ❌ Don't mutate state directly in React
- ❌ Don't skip loading/error states
- ❌ Don't use index as key in dynamic lists
- ❌ Don't forget ARIA labels for accessibility
- ❌ Don't block UI during API calls

## Confidence Score: 9/10

High confidence due to:
- Clear React patterns from examples
- Well-documented OpenAI streaming API
- Established TypeScript patterns
- Comprehensive test coverage approach

Minor uncertainty on optimal streaming chunk size for UX, but can be tuned based on user feedback.