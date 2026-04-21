export interface Account {
  id: string;
  user_id: string;
  nome: string;
  tipo: "conta_corrente" | "poupanca" | "carteira" | "cartao" | "investimento";
  saldo_inicial: number;
  ativa: boolean;
  created_at: string;
}

export interface AccountWithBalance extends Account {
  saldo_atual: number;
}

export interface Category {
  id: string;
  user_id: string;
  nome: string;
  tipo: "receita" | "despesa";
  cor: string | null;
  icone: string | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string | null;
  tipo: "receita" | "despesa" | "transferencia";
  descricao: string;
  valor: number;
  data_transacao: string;
  observacao: string | null;
  created_at: string;
  categories?: {
    nome: string;
    cor: string | null;
    icone: string | null;
  } | null;
}
