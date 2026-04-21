import type { AccountWithBalance } from "@/types/financeiro";
import { Landmark } from "lucide-react";

interface CartaoCardProps {
  accounts: AccountWithBalance[];
}

export default function CartaoCard({ accounts }: CartaoCardProps) {
  return (
    <div className="w-full md:w-1/2 h-auto bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5">
      <div className="h-full flex flex-col justify-between gap-3">
        <div className="flex flex-row items-center gap-2">
          <Landmark className="text-violet-900" />
          <h2 className="flex flex-row text-base lg:text-lg font-bold text-violet-900 mr-4">
            Contas
          </h2>
        </div>

        {accounts.length === 0 ? (
          <p className="text-gray-500">Nenhuma conta cadastrada.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-semibold text-violet-900">
                    {account.nome}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {account.tipo.replace("_", " ")}
                  </p>
                </div>

                <span className="font-bold text-violet-700">
                  {Number(account.saldo_atual).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
