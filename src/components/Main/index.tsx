"use client";

import SaldoCard from "@/components/SaldoCard";
import Contas from "@/components/Contas";
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
import CartaoCard from "../CartãoCard";

export default function Main() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  const loadDashboardData = useCallback(async () => {
    if (!user) {
      setDashboardLoading(false);
      return;
    }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando autenticação ...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando Dashboard ...</p>
      </div>
    );
  }

  if (!user) return null;

  const contasComSaldo: AccountWithBalance[] = calcularSaldoPorConta(
    accounts,
    transactions,
  );

  const contasComSaldoReal = contasComSaldo.filter(
    (account) => account.tipo !== "cartao",
  );

  const cartoes = contasComSaldo.filter((account) => account.tipo === "cartao");

  const saldoTotal = calcularSaldoTotal(contasComSaldoReal, transactions);

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <SaldoCard saldo={saldoTotal} />
            <CartaoCard cartoes={cartoes} />
            <Contas accounts={contasComSaldo} />
          </div>

          <TransacoesRecebidas transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
