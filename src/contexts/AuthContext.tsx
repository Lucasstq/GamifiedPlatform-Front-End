'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { User, LoginRequest, RegisterRequest, ApiError } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Função para recarregar usuário do localStorage
  const refreshUser = () => {
    const storedUser = authService.getCurrentUser();
    if (storedUser && authService.isAuthenticated()) {
      setUser(storedUser);
    }
  };

  // Carregar usuário do localStorage ao montar
  useEffect(() => {
    refreshUser();
    setIsLoading(false);
  }, []);

  // Escutar mudanças no localStorage (para OAuth2 e outras abas)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'accessToken') {
        refreshUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const authResponse = await authService.login(data);
      setUser(authResponse.user);
      router.push('/dashboard');
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao fazer login');
    }
  };

  const register = async (data: RegisterRequest): Promise<User> => {
    try {
      const newUser = await authService.register(data);
      return newUser;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao registrar usuário');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpa localmente
      setUser(null);
      router.push('/');
    }
  };

  const loginWithGoogle = () => {
    window.location.href = authService.getGoogleOAuthUrl();
  };

  const loginWithGithub = () => {
    window.location.href = authService.getGithubOAuthUrl();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithGithub,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
