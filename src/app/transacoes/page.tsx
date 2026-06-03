"use client";
import "@/styles/globals.css";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Transaction } from "@/types/financeiro";
import { getTransactions } from "@/services/dashboard";
import { Search } from "lucide-react";

export default function Transacoes() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }

    if (user) {
      carregarTransacoes();
    }
  }, [loading, user, router]);

  const carregarTransacoes = async () => {
    try {
      const data = await getTransactions(user!.id);
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  const transacoesEntrada = transactions.filter(
    (transaction) => transaction.tipo === "receita",
  );

  const transacoesSaida = transactions.filter(
    (transaction) => transaction.tipo === "despesa",
  );

  const totalEntradas = transacoesEntrada.reduce(
    (acc, transaction) => acc + Number(transaction.valor),
    0,
  );

  const totalSaidas = transacoesSaida.reduce(
    (acc, transaction) => acc + Number(transaction.valor),
    0,
  );

  const saldoFinal = totalEntradas - totalSaidas;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const toggleModal = () => {
    router.push("/transacoes/receita");
  };

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col p-5 md:p-8 gap-5">
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-violet-900">
              Transações
            </h1>
            <p className="text-md text-violet-700">
              Lance receitas, despesas e consulte seu extrato detalhado.
            </p>
          </div>

          <div className="w-full min-h-44 h-auto flex flex-col justify-between items-center bg-violet-50 p-5 rounded-lg shadow-lg">
            <div className="w-full grid grid-cols-1 md:grid-cols-6 place-items-center gap-5 mb-5">
              {/* Filtro de Busca */}
              <div className="w-full relative">
                <label className="text-xs text-violet-700">Buscar</label>
                <div className="relative w-full h-10 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <Search
                    className="absolute ml-3 mt-3 text-violet-400 pointer-events-none"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Buscar descrição..."
                    className="w-full h-full pl-10 pr-4 py-2 text-xs text-violet-700 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
              {/* Filtro de Tipo */}
              <div className="w-full">
                <label className="text-xs text-violet-700">Tipo</label>
                <select className="w-full h-10 text-xs p-3 text-violet-700 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="">Todos</option>
                  <option value="receita">Apenas Receita</option>
                  <option value="despesa">Apenas Despesa</option>
                </select>
              </div>
              {/* Filtro de Categoria */}
              <div className="w-full">
                <label className="text-xs text-violet-700">Categoria</label>
                <select className="w-full h-10 text-xs p-3 text-violet-700 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="">Todas</option>
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                </select>
              </div>
              {/* Filtro de Contas */}
              <div className="w-full">
                <label className="text-xs text-violet-700">Conta</label>
                <select className="w-full h-10 text-xs p-3 text-violet-700 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="">Todas</option>
                  <option value="receita">Conta 1</option>
                  <option value="despesa">Conta 2</option>
                </select>
              </div>
              {/* Filtro de Data */}
              <div className="w-full flex flex-row gap-3">
                <div className="w-full">
                  <label className="text-xs text-violet-700">De:</label>
                  <input
                    type="date"
                    className="w-full h-10 p-3 rounded-lg border text-xs text-violet-700 border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="w-full">
                  <label className="text-xs text-violet-700">Até:</label>
                  <input
                    type="date"
                    className="w-full h-10 p-3 rounded-lg text-xs text-violet-700 border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>

            <hr className="text-violet-400" />

            <div className="w-full flex flex-row justify-between items-center mt-3">
              <div className="w-full">
                <button
                  type="button"
                  className="w-full p-3 rounded-lg bg-violet-500 text-white font-semibold hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-start md:flex-row gap-5">
            <div className="w-full flex flex-row justify-center items-start gap-5">
              <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                <p className="text-lg font-semibold text-violet-900">
                  Transações de Saída
                </p>
                <div className="w-full flex flex-col">
                  {/* Aqui vai ficar as transações cadastradas pelo usuario */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-violet-950">
                          Descrição
                        </TableHead>
                        <TableHead className="text-violet-950">
                          Categoria
                        </TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacoesSaida.length === 0 ? (
                        <TableRow>
                          <TableCell className="text-violet-900">
                            Nenhuma transação encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        transacoesSaida.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="text-violet-900">
                              {transaction.descricao}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.categoria_nome}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.data_transacao}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.valor.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                <p className="text-lg font-semibold text-violet-900">
                  Transações de Entrada
                </p>
                <div className="w-full flex flex-col">
                  {/* Aqui vai ficar as transações cadastradas pelo usuario */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-violet-950">
                          Descrição
                        </TableHead>
                        <TableHead className="text-violet-950">
                          Categoria
                        </TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacoesEntrada.length === 0 ? (
                        <TableRow>
                          <TableCell className="text-violet-900">
                            Nenhuma transação encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        transacoesEntrada.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="text-violet-900">
                              {transaction.descricao}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.categoria_nome}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.data_transacao}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.valor.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Botão para adicionar receita/despesa */}
          <BotaoFlutuante onClick={toggleModal} />

          {/* Modal para escolher opções de ganho e gasto */}
          {/* <Modal isOpen={isModalOpen} onClose={toggleModal} /> */}
        </div>
      </div>
    </div>
  );
}
