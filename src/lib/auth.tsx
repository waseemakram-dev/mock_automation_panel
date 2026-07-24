'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => false,
  logout: () => {},
});

const TEST_CREDENTIALS = {
  email: 'admin@qwqer.pk',
  password: 'qwqer123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('qwqer_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIsLoggedIn(true);
        setUser(parsed);
      } catch {}
    }
  }, []);

  function login(email: string, password: string): boolean {
    if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
      const userData = { email, name: 'QWQER Admin' };
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem('qwqer_auth', JSON.stringify(userData));
      return true;
    }
    return false;
  }

  function logout() {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('qwqer_auth');
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
