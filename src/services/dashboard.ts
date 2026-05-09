import { sendRequest } from "@/services/api";
import { Account, Transaction } from "@/types/financeiro";

export async function getAccounts() {
  const response = await sendRequest({
    type: "accounts",
    action: "list",
  });

  return Array.isArray(response.data) ? response.data : [];
}

export async function getTransactions() {
  const response = await sendRequest({
    type: "transactions",
    action: "list",
  });

  return Array.isArray(response.data) ? response.data : [];
}

export function calcularSaldoTotal(
  accounts: Account[],
  transactions: Transaction[],
) {
  const saldoInicial = accounts.reduce(
    (total, account) => total + Number(account.saldo_inicial),
    0,
  );

  const movimentacao = transactions.reduce((total, transaction) => {
    const valor = Number(transaction.valor);

    if (transaction.tipo === "receita") return total + valor;
    if (transaction.tipo === "despesa") return total - valor;
    return total;
  }, 0);

  return saldoInicial + movimentacao;
}

export function calcularSaldoPorConta(
  accounts: Account[],
  transactions: Transaction[],
) {
  return accounts.map((account) => {
    const movimentacaoConta = transactions
      .filter((transaction) => transaction.account_id === account.id)
      .reduce((total, transaction) => {
        const valor = Number(transaction.valor);

        if (transaction.tipo === "receita") return total + valor;
        if (transaction.tipo === "despesa") return total - valor;
        return total;
      }, 0);

    return {
      ...account,
      saldo_atual: Number(account.saldo_inicial) + movimentacaoConta,
    };
  });
}
