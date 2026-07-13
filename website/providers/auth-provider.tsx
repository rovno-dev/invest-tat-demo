"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { getTokens, clearTokens, refreshToken, setTokens } from '@/lib/api/auth';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokens: { access: string; refresh: string }) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { access, refresh } = getTokens();
    if (access && refresh) {
      // Optionally validate token or fetch user info
      setUser({}); // placeholder, we don't have /me endpoint yet
    }
    setIsLoading(false);
  }, []);

  const login = (tokens: { access: string; refresh: string }) => {
    setTokens(tokens.access, tokens.refresh);
    setUser({});
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const { refresh } = getTokens();
    if (!refresh) return false;
    try {
      const data = await refreshToken(refresh);
      setTokens(data.access_token, refresh);
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
