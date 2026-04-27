"use client";

import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import { useAuth } from "@/context/AuthContext";
import { criarConta } from "@/services/transactions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TipoConta =
  | "conta_corrente"
  | "poupanca"
  | "carteira"
  | "cartao"
  | "investimento";

export default function AdicionarConta() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [nome, setNome] = useState("");
  const [tipoConta, setTipoConta] = useState<TipoConta | "">("");
  const [saldoInicial, setSaldoInicial] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    if (!nome.trim()) {
      alert("Informe o nome da conta.");
      return;
    }

    if (!tipoConta) {
      alert("Selecione o tipo da conta.");
      return;
    }

    try {
      setSalvando(true);

      await criarConta({
        userId: user.id,
        nome: nome.trim(),
        tipo: tipoConta,
        saldoInicial: saldoInicial ? Number(saldoInicial) : 0,
      });

      alert("Conta adicionada com sucesso!");
      router.push("/Dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar conta.");
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
              Adicionar Conta
            </h1>
            <p className="text-sm md:text-base text-violet-700 mt-1">
              Cadastre uma conta, carteira, cartão ou investimento para usar nas
              suas transações.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Nome da conta
              </label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                placeholder="Ex: Nubank, Inter, Carteira"
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Tipo
              </label>
              <select
                value={tipoConta}
                onChange={(e) => setTipoConta(e.target.value as TipoConta)}
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Selecione o tipo da conta</option>
                <option value="conta_corrente">Conta Corrente</option>
                <option value="poupanca">Poupança</option>
                <option value="carteira">Carteira</option>
                <option value="cartao">Cartão</option>
                <option value="investimento">Investimento</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Saldo inicial
              </label>
              <input
                value={saldoInicial}
                onChange={(e) => setSaldoInicial(e.target.value)}
                type="number"
                step="0.01"
                placeholder="Ex: 500.00"
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-xs text-violet-600">
                Use 0 caso esteja começando do zero.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="submit"
                disabled={salvando}
                className="px-5 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors disabled:opacity-60"
              >
                {salvando ? "Salvando..." : "Adicionar conta"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/Dashboard")}
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
