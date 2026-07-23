"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { getTokens, clearTokens, refreshToken, setTokens } from '@/lib/api/auth';

interface User {
  id: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokens: { access: string; refresh: string }) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch('/api/main/v1/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const { access, refresh } = getTokens();
    if (access && refresh) {
      // Set cookie for middleware
      document.cookie = `access_token=${access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      fetchUser(access);
    }
    setIsLoading(false);
  }, []);

  const login = async (tokens: { access: string; refresh: string }) => {
    setTokens(tokens.access, tokens.refresh);
    document.cookie = `access_token=${tokens.access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    await fetchUser(tokens.access);
  };

  const logout = () => {
    clearTokens();
    document.cookie = 'access_token=; path=/; max-age=0; SameSite=Lax';
    setUser(null);
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const { refresh } = getTokens();
    if (!refresh) return false;
    try {
      const data = await refreshToken(refresh);
      setTokens(data.access_token, refresh);
      document.cookie = `access_token=${data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      await fetchUser(data.access_token);
      return true;
    } catch {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
