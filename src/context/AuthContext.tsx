"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { sendRequest } from "@/services/api";

type User = {
  id: number;
  nome: string;
  email: string;
  foto_url?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (nome: string, email: string, senha: string) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => Promise<void> | void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const usuario = await getMe();

      localStorage.setItem("user", JSON.stringify(usuario));
      setUser(usuario);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function signIn(email: string, senha: string) {
    const response = await sendRequest({
      type: "auth",
      action: "login",
      data: { email, senha },
    });

    if (!response.success) {
      throw new Error(
        response.message || response.error || "Erro ao fazer login",
      );
    }

    const accessToken = response.access_token ?? response.data?.access_token;
    const refreshToken = response.refresh_token ?? response.data?.refresh_token;
    const usuario =
      response.usuario ?? response.data?.user ?? response.data?.usuario;

    if (!accessToken || !refreshToken || !usuario) {
      throw new Error("Resposta de login inválida");
    }

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(usuario));

    setUser(usuario);
  }

  async function signUp(nome: string, email: string, senha: string) {
    const response = await sendRequest({
      type: "auth",
      action: "register",
      data: { nome, email, senha },
    });

    if (!response.success) {
      throw new Error(
        response.message || response.error || "Erro ao criar conta",
      );
    }

    setUser(response.usuario);
  }

  async function getMe() {
    const response = await sendRequest({
      type: "auth",
      action: "me",
      data: {
        usuario_id: user?.id,
      },
    });

    if (!response.success) {
      throw new Error(
        response.message || response.error || "Erro ao buscar usuário",
      );
    }

    return response.usuario;
  }

  function signOut() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
