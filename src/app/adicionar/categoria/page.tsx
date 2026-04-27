"use client";

import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import { useAuth } from "@/context/AuthContext";
import { criarCategoria } from "@/services/transactions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TipoCategoria = "receita" | "despesa";

export default function AdicionarCategoria() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoCategoria | "">("");
  const [cor, setCor] = useState("#7c3aed");
  const [icone, setIcone] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    if (!nome.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    if (!tipo) {
      alert("Selecione o tipo da categoria.");
      return;
    }

    try {
      setSalvando(true);

      await criarCategoria({
        userId: user.id,
        nome: nome.trim(),
        tipo,
        cor,
        icone: icone.trim() || null,
      });

      alert("Categoria adicionada com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar categoria.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-200">
        <p className="text-violet-900 font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-start bg-violet-200">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <main className="w-full bg-violet-50 rounded-2xl shadow-lg p-5 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-violet-900">
              Adicionar Categoria
            </h1>
            <p className="text-sm md:text-base text-violet-700 mt-1">
              Crie categorias para organizar suas receitas e despesas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Nome da categoria
              </label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                placeholder="Ex: Salário, Alimentação, Transporte"
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Tipo
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoCategoria)}
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Selecione o tipo</option>
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Cor
              </label>
              <input
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                type="color"
                className="w-20 h-12 rounded-lg border border-violet-300 bg-white"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Ícone
              </label>
              <input
                value={icone}
                onChange={(e) => setIcone(e.target.value)}
                type="text"
                placeholder="Ex: wallet, food, car, home"
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-xs text-violet-600">
                Opcional. Pode usar nomes de ícones do{" "}
                <a
                  className="underline font-semibold"
                  href="https://lucide.dev/icons/"
                >
                  Lucide
                </a>{" "}
                para exibir depois na interface.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="submit"
                disabled={salvando}
                className="px-5 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors disabled:opacity-60"
              >
                {salvando ? "Salvando..." : "Adicionar categoria"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-5 py-3 bg-violet-100 text-violet-800 rounded-lg hover:bg-violet-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
