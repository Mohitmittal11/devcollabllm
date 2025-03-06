/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { User } from "../types";

interface AdminState {
  developers: any;
  isLoading: boolean;
  fetchDevelopers: () => Promise<void>;
  addDeveloper: (email: string, name: string) => Promise<{ password: string }>;
  updateDeveloper: (id: string, updates: Partial<User>) => Promise<void>;
  deleteDeveloper: (id: string) => Promise<void>;
}

// Mock data
const mockDevelopers: any[] = [
  {
    id: "1",
    email: "developer@example.com",
    name: "John Developer",
    role: "developer",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "3",
    email: "sarah@example.com",
    name: "Sarah Johnson",
    role: "developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "4",
    email: "michael@example.com",
    name: "Michael Chen",
    role: "developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
];

// Function to generate a random password
const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const useAdminStore = create<AdminState>((set) => ({
  developers: [],
  isLoading: false,

  fetchDevelopers: async () => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({ developers: mockDevelopers });
    } catch (error) {
      console.error("Failed to fetch developers:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addDeveloper: async (email: string, name: string) => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const password = generatePassword();

      const newDeveloper: any = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: "developer",
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80`,
      };

      set((state) => ({
        developers: [...state.developers, newDeveloper],
      }));

      return { password };
    } catch (error) {
      console.error("Failed to add developer:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateDeveloper: async (id: string, updates: Partial<User>) => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        developers: state.developers.map((dev: any) =>
          dev.id === id ? { ...dev, ...updates } : dev
        ),
      }));
    } catch (error) {
      console.error("Failed to update developer:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDeveloper: async (id: string) => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        developers: state.developers.filter((dev: any) => dev.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete developer:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
