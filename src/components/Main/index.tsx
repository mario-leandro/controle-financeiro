"use client";

import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";
import TransacoesRecebidas from "@/components/TransacoesRecentes";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getAccounts,
  getRecentTransactions,
  calcularSaldoTotal,
  calcularSaldoPorConta,
} from "@/services/dashboard";
import type {
  Account,
  Transaction,
  AccountWithBalance,
} from "@/types/financeiro";
import BotaoFlutuante from "../BotaoFlutuante";
import Modal from "../modal";

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setDashboardLoading(true);

      const [accountsData, transactionsData] = await Promise.all([
        getAccounts(),
        getRecentTransactions(),
      ]);

      setAccounts(accountsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setDashboardLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  const saldoTotal = calcularSaldoTotal(accounts, transactions);
  const contasComSaldo: AccountWithBalance[] = calcularSaldoPorConta(
    accounts,
    transactions,
  );

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
            <SaldoCard saldo={saldoTotal} />
            <CartaoCard accounts={contasComSaldo} />
          </div>

          <TransacoesRecebidas transactions={transactions} />

          <BotaoFlutuante onClick={toggleModal} />
          <Modal
            isOpen={isModalOpen}
            onClose={toggleModal}
            title="O que deseja adicionar?"
          />
        </div>
      </div>
    </div>
  );
}
