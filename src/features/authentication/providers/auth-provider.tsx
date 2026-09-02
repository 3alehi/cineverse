"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { User } from "@/types/app";
import {
  getSessionUser,
  loginAccount,
  logoutAccount,
  registerAccount,
} from "../lib/auth-storage";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSessionUser());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: async (email, password) => {
        const loggedInUser = await loginAccount(email, password);
        setUser(loggedInUser);
      },
      register: async (name, email, password) => {
        const newUser = await registerAccount(name, email, password);
        setUser(newUser);
      },
      logout: () => {
        logoutAccount();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
