import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type TipoTransacao = "receita" | "despesa";

interface CriarTransacaoParams {
  userId: string;
  accountId: string;
  categoryId: string | null;
  tipo: TipoTransacao;
  descricao: string;
  valor: number;
  dataTransacao: string;
  observacao?: string;
}

export async function criarTransacao({
  userId,
  accountId,
  categoryId,
  tipo,
  descricao,
  valor,
  dataTransacao,
  observacao,
}: CriarTransacaoParams) {
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      account_id: accountId,
      category_id: categoryId,
      tipo,
      descricao,
      valor,
      data_transacao: dataTransacao,
      observacao: observacao || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function criarCategoria({
  userId,
  nome,
  tipo,
}: {
  userId: string;
  nome: string;
  tipo: TipoTransacao;
}) {
  const { data, error } = await supabase
    .from("categories")
    .insert({
      user_id: userId,
      nome,
      tipo,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function criarConta({
  userId,
  nome,
  tipo = "conta_corrente",
}: {
  userId: string;
  nome: string;
  tipo?: "conta_corrente" | "poupanca" | "carteira" | "cartao" | "investimento";
}) {
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      user_id: userId,
      nome,
      tipo,
      saldo_inicial: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
