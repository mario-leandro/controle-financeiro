// Interfaces
export interface Account {
  id?: string;
  user_id: number;
  nome: string;
  tipo: TipoConta;
  saldo_inicial: number;
  limite_total?: number;
  dia_fechamento?: number;
  dia_vencimento?: number;
  ativa?: boolean;
  created_at?: string;
}

export interface AccountWithBalance extends Account {
  saldo_atual: number;
}

export interface Category {
  id?: string;
  user_id: string;
  nome: string;
  tipo: TipoTransacao;
  cor: string | null;
  icone: string | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string | null;
  tipo: TipoTransacao;
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
export interface CriarTransacaoParams {
  user_id: string;
  account_id: string;
  category_id: string | null;
  tipo: TipoTransacao;
  descricao: string;
  valor: number;
  data_transacao: string;
  observacao?: string;
}

// Types
export type TipoTransacao = "receita" | "despesa";
export type TipoConta =
  | "conta_corrente"
  | "poupanca"
  | "carteira"
  | "cartao"
  | "investimento";
