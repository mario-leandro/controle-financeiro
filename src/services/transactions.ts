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
    data: {},
  });

  return Array.isArray(response.data) ? response.data : [];
}

export async function criarConta({
  user_id,
  nome,
  tipo,
  saldo_inicial = 0,
  limite_total = 0,
  dia_fechamento = 0,
  dia_vencimento = 0,
}: Account) {
  const response = await sendRequest({
    type: "accounts",
    action: "create",
    data: {
      user_id,
      nome,
      tipo,
      saldo_inicial,
      limite_total,
      dia_fechamento,
      dia_vencimento,
    },
  });

  return response.data;
}

export async function getCategories(tipo: TipoTransacao) {
  const response = await sendRequest({
    type: "categories",
    action: "list",
    data: { tipo },
  });

  return Array.isArray(response.data) ? response.data : [];
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
      user_id,
      nome,
      tipo,
      cor,
      icone,
    },
  });

  return Array.isArray(response.data) ? response.data : [];
}

export async function getTransactions(user_id: number) {
  const response = await sendRequest({
    type: "transactions",
    action: "list",
    data: { user_id },
  });

  return Array.isArray(response.data) ? response.data : [];
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

  return Array.isArray(response.data) ? response.data : [];
}
