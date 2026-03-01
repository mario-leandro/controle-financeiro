"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { loginUsuario, criarUsuario } from "@/services/routes_api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, senha: string) => {
    try {
      const data = await loginUsuario({ email, senha });

      console.log("DATA:", data);

      const { access_token, refresh_token, usuario } = data;

      localStorage.setItem("refresh_token", refresh_token);

      console.log("SALVO:", localStorage.getItem("refresh_token"));

      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      setUsuario(usuario);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      await api.post("/api/auth/logout.php", {
        refresh_token: refreshToken,
      });
    }

    localStorage.removeItem("refresh_token");
    delete api.defaults.headers.Authorization;
    setUsuario(null);
  };

  const register = async (nome: string, email: string, senha: string) => {
    await criarUsuario({ nome, email, senha });
    await login(email, senha);
  };

  async function loadUser() {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("REFRESH TOKEN:", refreshToken);

    if (!refreshToken) {
      setLoading(false);
      return;
    }

    try {
      const refreshResponse = await api.post("/api/refresh/refreshToken.php", {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token } = refreshResponse.data;

      localStorage.setItem("refresh_token", refresh_token);
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      const me = await api.get("/api/auth/me.php");
      setUsuario(me.data.usuario);
    } catch {
      localStorage.removeItem("refresh_token");
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// 👇 FORA DO PROVIDER
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
