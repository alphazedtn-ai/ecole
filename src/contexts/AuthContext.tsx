import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('senatec_auth');
    if (auth) {
      const { authenticated, admin } = JSON.parse(auth);
      setIsAuthenticated(authenticated);
      setIsAdmin(admin);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, this would be handled by Supabase Auth
    if (username === 'wassim1' && password === 'zed18666') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('senatec_auth', JSON.stringify({ authenticated: true, admin: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('senatec_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}