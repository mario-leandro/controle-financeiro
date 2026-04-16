"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function CadastroPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);

    try {
      await signUp(nome, email, senha);
      alert(
        "Conta criada com sucesso. Verifique seu email se a confirmação estiver ativada.",
      );
      router.push("/auth/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-violet-200 flex justify-center items-center">
      <div className="w-96 min-h-96 bg-violet-300 px-6 py-10 rounded-lg shadow-lg flex flex-col justify-between items-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-violet-700">Cadastre-se</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mb-6"
        >
          <div className="flex flex-col gap-4">
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              type="text"
              placeholder="Nome"
              className="w-full rounded-lg p-2 bg-violet-200 outline-none text-violet-800 placeholder:text-violet-500"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded-lg p-2 bg-violet-200 outline-none text-violet-800 placeholder:text-violet-500"
            />
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              placeholder="Senha"
              className="w-full rounded-lg p-2 bg-violet-200 outline-none text-violet-800 placeholder:text-violet-500"
            />
            <input
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              type="password"
              placeholder="Confirme a senha"
              className="w-full rounded-lg p-2 bg-violet-200 outline-none text-violet-800 placeholder:text-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg p-2 bg-violet-400 text-white font-bold cursor-pointer hover:bg-violet-500 transition-colors disabled:opacity-60"
          >
            {submitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-sm text-violet-700">
          <p>
            Já tem uma conta?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-violet-700 font-bold cursor-pointer hover:underline"
            >
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
