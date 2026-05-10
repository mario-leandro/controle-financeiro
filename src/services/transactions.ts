import { sendRequest } from "@/services/api";
import {
  TipoTransacao,
  CriarTransacaoParams,
  Category,
  Account,
} from "@/types/financeiro";

export async function getAccounts() {
  const response = await sendRequest({
    type: "accounts",
    action: "list",
  });

  return response.data;
}

export async function criarConta({
  user_id,
  nome,
  tipo,
  saldo_inicial = 0,
}: Account) {
  try {
    const response = await sendRequest({
      type: "accounts",
      action: "create",
      data: {
        user_id: user_id,
        nome,
        tipo,
        saldo_inicial: saldo_inicial || 0,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    throw error;
  }
}

export async function getCategories(tipo: TipoTransacao) {
  const response = await sendRequest({
    type: "categories",
    action: "list",
    data: { tipo },
  });

  return response.data;
}

export async function criarCategoria({
  user_id,
  nome,
  tipo,
  cor,
  icone,
}: Category) {
  const response = await sendRequest({
    type: "categories",
    action: "create",
    data: {
      user_id: user_id,
      nome,
      tipo,
      cor: cor || null,
      icone: icone || null,
    },
  });

  return response.data;
}

export async function getTransactions() {
  const response = await sendRequest({
    type: "transactions",
    action: "list",
  });

  return response.data;
}

export async function criarTransacao({
  user_id,
  account_id,
  category_id,
  tipo,
  descricao,
  valor,
  data_transacao,
  observacao,
}: CriarTransacaoParams) {
  const response = await sendRequest({
    type: "transactions",
    action: "create",
    data: {
      user_id: user_id,
      account_id: account_id,
      category_id: category_id,
      tipo,
      descricao,
      valor,
      data_transacao: data_transacao,
      observacao: observacao || null,
    },
  });

  return response.data;
}
