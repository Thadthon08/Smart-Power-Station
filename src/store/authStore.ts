import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  mockGoogleLogin: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      mockGoogleLogin: () => {
        // Mock Google OAuth login
        const mockUser: User = {
          id: crypto.randomUUID(),
          name: "John Doe",
          email: "john.doe@company.com",
          avatar: `https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff`,
        };
        set({ user: mockUser, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
