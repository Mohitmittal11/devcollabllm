export interface User {
  _id?: string;
  name?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  isActive?: boolean;
  createdAt?: string;
  role?: string;
  image?: string;
  token?: string;
  code?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  members: string[]; // User IDs
}

export interface ChatMessage {
  id: string;
  projectId: string;
  userId: string;
  content: string;
  timestamp: string;
  type: "user" | "ai";
  model?: "deepseek" | "llama";
  codeSnippets?: CodeSnippet[];
}

export interface CodeSnippet {
  id: string;
  language: string;
  code: string;
}

export interface LLMModel {
  id: "deepseek" | "llama";
  name: string;
  description: string;
  strengths: string[];
}
