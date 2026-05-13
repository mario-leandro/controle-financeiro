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

  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

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

        <div className="w-full h-full flex flex-col gap-5">
          <div className="w-full min-h-44 h-auto bg-violet-50 p-5 rounded-lg shadow-lg">
            <div>
              <p className="text-lg font-semibold text-violet-900 mb-5">
                Resumo Financeiro
              </p>
              <div className="w-full flex flex-row justify-start items-center gap-5">
                <div className="w-1/4 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-200">
                  <p className="text-lg font-semibold text-green-900">
                    Total de Entradas
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {totalEntradas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div className="w-1/4 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-200">
                  <p className="text-lg font-semibold text-red-900">
                    Total de Saídas
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    {totalSaidas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div className="w-1/4 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-200">
                  <p className="text-lg font-semibold text-blue-900">
                    Saldo Final
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {saldoFinal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
            <div className="w-full flex flex-row justify-center items-center gap-5">
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
                        <TableHead className="text-violet-950">Valor</TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">
                          Categoria
                        </TableHead>
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
                              {formatCurrency(transaction.valor)}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.data_transacao}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.categoria_nome}
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
                        <TableHead className="text-violet-950">Valor</TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">
                          Categoria
                        </TableHead>
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
                              {formatCurrency(transaction.valor)}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.data_transacao}
                            </TableCell>
                            <TableCell className="text-violet-900">
                              {transaction.categoria_nome}
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
