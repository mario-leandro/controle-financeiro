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
  getTransactions,
  calcularSaldoTotal,
  calcularSaldoPorConta,
} from "@/services/dashboard";
import type {
  Account,
  Transaction,
  AccountWithBalance,
} from "@/types/financeiro";
import CartaoCard from "../CartãoCard";
import { withTimeout } from "@/utils/utils";

export default function Main() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardLoaded, setDashboardLoaded] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setDashboardLoading(true);

      // console.log("buscando contas");
      const accountsData = await withTimeout(getAccounts(user.id));
      // console.log("contas carregadas");

      // console.log("buscando transações");
      const transactionsData = await withTimeout(getTransactions(user.id));
      console.log(transactionsData);
      // console.log("transações carregadas");

      setAccounts(accountsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      console.log("finalizou dashboard");
      setDashboardLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!dashboardLoaded) {
      loadDashboardData();
      setDashboardLoaded(true);
    }
  }, [loading, user, router, loadDashboardData, dashboardLoaded]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando autenticação ...</p>
      </div>
    );
  }

  if (!user) return null;

  if (dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando Dashboard ...</p>
      </div>
    );
  }

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
          <SaldoCard saldo={saldoTotal} />

          <div className="flex flex-col lg:flex-row gap-5">
            <CartaoCard cartoes={cartoes} />
            <Contas accounts={contasComSaldo} />
          </div>

          <TransacoesRecebidas transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
