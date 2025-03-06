import { create } from "zustand";
import { User } from "../types";
import { persist } from "zustand/middleware";

const initialAuth = {
  _id: "",
  name: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  isActive: true,
  createdAt: "",
  role: "",
  image: "",
  token: "",
  code: 0,
};

interface AuthState {
  authData: User | null;
  setAuthData: (authData: Partial<User | null>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authData: initialAuth,
      setAuthData: (authData) =>
        set({
          authData,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   updateProfile: (userData: Partial<User>) => Promise<void>;
//   changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
// }

// Mock data for demonstration
// const mockUser: User = {
//   id: "1",
//   email: "developer@example.com",
//   name: "John Developer",
//   role: "developer",
//   avatar:
//     "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
// };

// const mockAdminUser: User = {
//   id: "2",
//   email: "admin@example.com",
//   name: "Admin User",
//   role: "admin",
//   avatar:
//     "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,

//   login: async (email: string, password: string) => {
//     set({ isLoading: true });

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Mock login logic
//       if (email === "admin@example.com" && password === "admin") {
//         set({ user: mockAdminUser, isAuthenticated: true });
//       } else if (
//         email === "developer@example.com" &&
//         password === "developer"
//       ) {
//         set({ user: mockUser, isAuthenticated: true });
//       } else {
//         throw new Error("Invalid credentials");
//       }
//     } catch (error) {
//       throw error;
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   logout: () => {
//     set({ user: null, isAuthenticated: false });
//   },

//   updateProfile: async (userData: Partial<User>) => {
//     set({ isLoading: true });

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       set((state) => ({
//         user: state.user ? { ...state.user, ...userData } : null,
//       }));
//     } catch (error) {
//       throw error;
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   changePassword: async (oldPassword: string, newPassword: string) => {
//     set({ isLoading: true });

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Mock password validation
//       if (oldPassword !== "developer" && oldPassword !== "admin") {
//         throw new Error("Current password is incorrect");
//       }

//       // Password change would happen on the server
//       console.log("Password changed successfully");
//     } catch (error) {
//       throw error;
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));
