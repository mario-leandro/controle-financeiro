import { createClient } from "@/lib/supabase/client";
import type { Account, Transaction } from "@/types/financeiro";

const supabase = createClient();

export async function getAccounts(): Promise<Account[]> {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("ativa", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Account[]) ?? [];
}

export async function getRecentTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      categories (
        nome,
        cor,
        icone
      )
    `,
    )
    .order("data_transacao", { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return (data as Transaction[]) ?? [];
}
