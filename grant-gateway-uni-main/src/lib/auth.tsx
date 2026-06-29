import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface AuthState {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  const [role, setRole] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('role') : null);

  async function login(email: string, password: string) {
    const data = await api.login(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    setToken(data.token);
    setRole(data.role);
    return data.role as string;
  }

  function logout() {
    api.logout().catch(() => {});
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
