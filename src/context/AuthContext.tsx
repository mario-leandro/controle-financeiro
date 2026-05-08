"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { sendRequest } from "@/services/api";

type User = {
  id: number;
  nome: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (nome: string, email: string, senha: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("user");

    if (usuarioSalvo) {
      setUser(JSON.parse(usuarioSalvo));
    }

    setLoading(false);
  }, []);

  async function signIn(email: string, senha: string) {
    const response = await sendRequest([
      {
        type: "auth",
        action: "login",
        data: { email, senha },
      },
    ]);

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setUser(response.data.user);
  }

  async function signUp(nome: string, email: string, senha: string) {
    const response = await sendRequest([
      {
        type: "auth",
        action: "register",
        data: { nome, email, senha },
      },
    ]);

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setUser(response.data.user);
  }

  function signOut() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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
