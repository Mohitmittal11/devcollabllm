import { create } from 'zustand';
import { ChatMessage, CodeSnippet } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  selectedModel: 'deepseek' | 'llama';
  fetchMessages: (projectId: string) => Promise<void>;
  sendMessage: (projectId: string, userId: string, content: string) => Promise<void>;
  setSelectedModel: (model: 'deepseek' | 'llama') => void;
  searchMessages: (query: string) => ChatMessage[];
}

// Mock data
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    projectId: '1',
    userId: '1',
    content: 'How do I implement authentication in React?',
    timestamp: '2023-06-10T09:30:00Z',
    type: 'user',
  },
  {
    id: '2',
    projectId: '1',
    userId: 'ai',
    content: 'You can implement authentication in React using various methods. Here\'s a simple example using JWT:',
    timestamp: '2023-06-10T09:31:00Z',
    type: 'ai',
    model: 'deepseek',
    codeSnippets: [
      {
        id: '1',
        language: 'javascript',
        code: `// Authentication service
const login = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};`,
      },
    ],
  },
  {
    id: '3',
    projectId: '1',
    userId: '1',
    content: 'Can you show me how to create protected routes?',
    timestamp: '2023-06-10T09:35:00Z',
    type: 'user',
  },
  {
    id: '4',
    projectId: '1',
    userId: 'ai',
    content: 'Sure! Here\'s how you can create protected routes in React using React Router:',
    timestamp: '2023-06-10T09:36:00Z',
    type: 'ai',
    model: 'deepseek',
    codeSnippets: [
      {
        id: '2',
        language: 'jsx',
        code: `import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
};

// In your router setup:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
]);`,
      },
    ],
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  selectedModel: 'deepseek',

  fetchMessages: async (projectId: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredMessages = mockMessages.filter(msg => msg.projectId === projectId);
      set({ messages: filteredMessages });
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (projectId: string, userId: string, content: string) => {
    set({ isLoading: true });
    
    try {
      // Add user message
      const userMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        projectId,
        userId,
        content,
        timestamp: new Date().toISOString(),
        type: 'user',
      };
      
      set((state) => ({
        messages: [...state.messages, userMessage],
      }));
      
      // Simulate API call for AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response based on selected model
      const model = get().selectedModel;
      
      let aiResponse: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        projectId,
        userId: 'ai',
        content: 'I\'m analyzing your request...',
        timestamp: new Date().toISOString(),
        type: 'ai',
        model,
      };
      
      // Different responses based on model and content
      if (content.toLowerCase().includes('bug') || content.toLowerCase().includes('error')) {
        aiResponse.content = 'I\'ve analyzed your code and found a potential issue:';
        aiResponse.codeSnippets = [
          {
            id: Math.random().toString(36).substring(2, 9),
            language: 'javascript',
            code: `// The problem might be here
function processData(data) {
  // You're trying to access properties of undefined
  return data.items.map(item => item.value);
}

// Fix:
function processData(data) {
  // Add null check
  if (!data || !data.items) return [];
  return data.items.map(item => item.value);
}`,
          },
        ];
      } else if (content.toLowerCase().includes('test')) {
        aiResponse.content = 'Here\'s a test case you could implement:';
        aiResponse.codeSnippets = [
          {
            id: Math.random().toString(36).substring(2, 9),
            language: 'javascript',
            code: `import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';

test('submits the form with user data', () => {
  // Render component
  render(<UserForm onSubmit={jest.fn()} />);
  
  // Fill form fields
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'John Doe' },
  });
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'john@example.com' },
  });
  
  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  // Assert
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
  });
});`,
          },
        ];
      } else {
        aiResponse.content = 'Based on your request, here\'s a solution:';
        aiResponse.codeSnippets = [
          {
            id: Math.random().toString(36).substring(2, 9),
            language: 'typescript',
            code: `interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};`,
          },
        ];
      }
      
      set((state) => ({
        messages: [...state.messages, aiResponse],
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedModel: (model: 'deepseek' | 'llama') => {
    set({ selectedModel: model });
  },

  searchMessages: (query: string) => {
    const { messages } = get();
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return messages.filter(msg => 
      msg.content.toLowerCase().includes(lowerQuery) || 
      msg.codeSnippets?.some(snippet => 
        snippet.code.toLowerCase().includes(lowerQuery)
      )
    );
  },
}));