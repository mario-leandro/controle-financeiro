"use client";
import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";
import TransacoesRecebidas from "@/components/TransacoesRecentes";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAccounts, getRecentTransactions } from "@/services/dashboard";
import type { Account, Transaction } from "@/types/financeiro";

export default function Main() {
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

  useEffect(() => {
    async function loadDashboardData() {
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
    }

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  const saldoTotal = accounts.reduce(
    (total, conta) => total + Number(conta.saldo_inicial),
    0,
  );

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
            {/* Carteira */}
            <SaldoCard saldo={saldoTotal} />

            {/* Cartão de Credito */}
            <CartaoCard accounts={accounts} />
          </div>

          {/* Transacoes Recebidas */}
          <TransacoesRecebidas transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
