"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavegacaoUsuario from "../../../components/NavegacaoUsuario";
import { useAuth } from "@/context/AuthContext";
import {
  criarCategoria,
  criarConta,
  criarTransacao,
} from "@/services/transactions";

export default function AddGanho() {
  const router = useRouter();
  const { user } = useAuth();

  const [categoria, setCategoria] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");

  const [conta, setConta] = useState("");
  const [novaConta, setNovaConta] = useState("");

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState<"receita" | "despesa">("receita");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    if (!descricao || !valor || !data) {
      alert("Preencha descrição, valor e data.");
      return;
    }

    if (!conta) {
      alert("Selecione uma conta.");
      return;
    }

    if (!categoria) {
      alert("Selecione uma categoria.");
      return;
    }

    try {
      setLoading(true);

      let categoryId: string | null = null;
      let accountId = conta;

      if (categoria === "outros") {
        if (!novaCategoria.trim()) {
          alert("Digite o nome da nova categoria.");
          return;
        }

        const categoriaCriada = await criarCategoria({
          userId: user.id,
          nome: novaCategoria.trim(),
          tipo,
        });

        categoryId = categoriaCriada.id;
      } else {
        categoryId = categoria;
      }

      if (conta === "outra") {
        if (!novaConta.trim()) {
          alert("Digite o nome da nova conta.");
          return;
        }

        const contaCriada = await criarConta({
          userId: user.id,
          nome: novaConta.trim(),
        });

        accountId = contaCriada.id;
      }

      await criarTransacao({
        userId: user.id,
        accountId,
        categoryId,
        tipo,
        descricao,
        valor: Number(valor),
        dataTransacao: data,
        observacao,
      });

      alert("Transação adicionada com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar transação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <form
          onSubmit={handleSubmit}
          className="w-full h-full bg-violet-50 flex flex-col justify-start items-start gap-5 rounded-2xl p-5 shadow-lg overflow-scroll"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-violet-900">
            Adicionar Nova Transação
          </h1>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "receita" | "despesa")}
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Categoria
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              <option value="salario">Salário</option>
              <option value="freelance">Freelance</option>
              <option value="investimentos">Investimentos</option>
              <option value="outros">Outros</option>
            </select>

            {categoria === "outros" && (
              <input
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                type="text"
                placeholder="Digite a nova categoria"
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            )}
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Conta
            </label>
            <select
              value={conta}
              onChange={(e) => setConta(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Selecione uma conta</option>
              {/* <option value={account.id}>{account.nome}</option> */}
              <option value="conta2">Nubank</option>
              <option value="conta3">C6 Bank</option>
              <option value="outra">Outra</option>
            </select>

            {conta === "outra" && (
              <input
                value={novaConta}
                onChange={(e) => setNovaConta(e.target.value)}
                type="text"
                placeholder="Digite o nome da conta"
                className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            )}
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Descrição
            </label>
            <input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              type="text"
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Ex: Salário, Freelance, etc."
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Valor
            </label>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="number"
              step="0.01"
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Ex: 2500.00"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Data
            </label>
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              type="date"
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Observação
            </label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Detalhes adicionais"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
}
