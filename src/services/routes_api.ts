import { api } from "./api";

interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

async function criarUsuario({ nome, email, senha }: Usuario) {
  const response = await api.post("/api/auth/register.php", {
    nome,
    email,
    senha,
  });

  return response.data;
}

async function loginUsuario({ email, senha }: Omit<Usuario, "nome">) {
  try {
    const response = await api.post("/api/auth/login.php", {
      email,
      senha,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro na requisição de login:", error);
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro no login");
    } else {
      throw new Error("Erro de rede ou servidor indisponível");
    }
  }
}

async function obterUsuario() {
  const response = await api.get("/api/auth/me.php");
  return response.data;
}

export { criarUsuario, loginUsuario, obterUsuario };
