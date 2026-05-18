"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavegacaoUsuario from "../../../components/NavegacaoUsuario";
import { useAuth } from "@/context/AuthContext";
import {
  criarCategoria,
  criarConta,
  criarTransacao,
  getAccounts,
  getCategories,
} from "@/services/transactions";
import Alerta from "@/components/Alerta";
import {
  TipoTransacao,
  Category,
  Account,
  MetodoPagamento,
} from "@/types/financeiro";

export default function AddGanho() {
  const router = useRouter();
  const { user } = useAuth();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingInitialData, setLoadingInitialData] = useState(true);

  const [tipo, setTipo] = useState<TipoTransacao>("receita");
  const [categoria, setCategoria] = useState("");

  const [novaCategoria, setNovaCategoria] = useState("");
  const [conta, setConta] = useState("");

  const [novaConta, setNovaConta] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] =
    useState<MetodoPagamento>("debito");
  const [parcelas, setParcelas] = useState(1);
  const [data, setData] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoadingInitialData(true);

        const [accountsData, categoriesData] = await Promise.all([
          getAccounts(),
          getCategories(tipo),
        ]);

        setAccounts(accountsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar contas/categorias:", error);
      } finally {
        setLoadingInitialData(false);
      }
    }

    loadInitialData();
  }, [tipo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      setAlerta({
        success: false,
        message: "Usuário não autenticado.",
      });
      return;
    }

    if (!descricao || !valor || !data) {
      setAlerta({
        success: false,
        message: "Preencha descrição, valor e data.",
      });
      return;
    }

    if (!conta) {
      setAlerta({
        success: false,
        message: "Selecione uma conta.",
      });
      return;
    }

    if (!categoria) {
      setAlerta({
        success: false,
        message: "Selecione uma categoria.",
      });
      return;
    }

    if (conta === "cartao") {
      if (!metodoPagamento || !parcelas) {
        setAlerta({
          success: false,
          message: "Selecione o método de pagamento e número de parcelas.",
        });
        return;
      }
    }

    try {
      setLoading(true);

      let categoryId: string | null = null;
      let accountId = conta;

      if (categoria === "outros") {
        if (!novaCategoria.trim()) {
          setAlerta({
            success: false,
            message: "Digite o nome da nova categoria.",
          });
          return;
        }

        const categoriaCriada = await criarCategoria({
          user_id: user.id,
          nome: novaCategoria.trim(),
          tipo,
        });

        categoryId = categoriaCriada.id;
      } else {
        categoryId = categoria;
      }

      if (conta === "outra") {
        if (!novaConta.trim()) {
          setAlerta({
            success: false,
            message: "Digite o nome da nova conta.",
          });
          return;
        }

        const contaCriada = await criarConta({
          user_id: user.id,
          nome: novaConta.trim(),
          tipo: "conta_corrente",
        });

        accountId = contaCriada.id;
      }

      await criarTransacao({
        user_id: user.id,
        account_id: accountId,
        category_id: categoryId,
        tipo,
        descricao,
        valor: Number(valor),
        metodo_pagamento: metodoPagamento,
        parcelas: parcelas,
        data_transacao: data,
        observacao,
      });

      setAlerta({
        success: true,
        message: "Transação adicionada com sucesso!",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao adicionar transação.";

      setAlerta({
        success: false,
        message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loadingInitialData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <form
          onSubmit={handleSubmit}
          className="w-full h-full bg-violet-50 flex flex-col justify-start items-start gap-5 rounded-2xl p-5 shadow-lg overflow-auto"
        >
          {alerta && (
            <Alerta
              success={alerta.success}
              message={alerta.message}
              onClose={() => setAlerta(null)}
            />
          )}

          <h1 className="text-lg md:text-2xl font-bold text-violet-900">
            Adicionar Nova Transação
          </h1>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value as TipoTransacao);
                setCategoria("");
                setNovaCategoria("");
              }}
              className="w-full p-3 rounded-lg border border-violet-300"
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Categoria
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300"
            >
              <option value="">Selecione uma categoria</option>

              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}

              <option value="outros">Outros</option>
            </select>

            {categoria === "outros" && (
              <input
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                type="text"
                placeholder="Digite a nova categoria"
                className="w-full p-3 rounded-lg border border-violet-300"
              />
            )}
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Conta
            </label>
            <select
              value={conta}
              onChange={(e) => setConta(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300"
            >
              <option value="">Selecione uma conta</option>

              {accounts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}

              <option value="outra">Outra</option>
            </select>

            {conta === "outra" && (
              <input
                value={novaConta}
                onChange={(e) => setNovaConta(e.target.value)}
                type="text"
                placeholder="Digite o nome da conta"
                className="w-full p-3 rounded-lg border border-violet-300"
              />
            )}
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Descrição
            </label>
            <input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              type="text"
              className="w-full p-3 rounded-lg border border-violet-300"
              placeholder="Ex: Salário, Freelance, etc."
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Valor
            </label>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="number"
              step="0.01"
              className="w-full p-3 rounded-lg border border-violet-300"
              placeholder="Ex: 2500.00"
            />
          </div>

          {categoria === "cartao" && (
            <div className="w-full flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Método de Pagamento
              </label>
              <select
                value={metodoPagamento}
                onChange={(e) =>
                  setMetodoPagamento(e.target.value as MetodoPagamento)
                }
                className="w-full p-3 rounded-lg border border-violet-300"
              >
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
              </select>
            </div>
          )}

          {categoria === "cartao" && metodoPagamento === "credito" && (
            <div className="w-full flex flex-col gap-3">
              <label className="text-base font-semibold text-violet-900">
                Número de Parcelas
              </label>
              <input
                value={parcelas}
                onChange={(e) => setParcelas(Number(e.target.value))}
                type="number"
                min="1"
                className="w-full p-3 rounded-lg border border-violet-300"
              />
            </div>
          )}

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Data
            </label>
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              type="date"
              className="w-full p-3 rounded-lg border border-violet-300"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Observação
            </label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300"
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
