import { CreditCard } from "lucide-react";
import type { AccountWithBalance } from "@/types/financeiro";

interface CartaoCardProps {
  cartoes: AccountWithBalance[];
}

export default function CartaoCard({ cartoes }: CartaoCardProps) {
  const totalCartao = cartoes.reduce(
    (total, cartao) => total + Number(cartao.saldo_atual),
    0,
  );

  return (
    <div className="w-full h-auto bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5">
      <div className="h-full flex flex-col justify-between gap-3">
        <div className="flex flex-row items-center gap-2">
          <CreditCard className="text-violet-900" />
          <p className="text-base lg:text-lg font-bold text-violet-900">
            Cartão de Crédito
          </p>
        </div>

        {cartoes.length === 0 ? (
          <p className="text-gray-500">Nenhuma conta cadastrada.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cartoes.map((cartao) => (
              <div
                key={cartao.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-semibold text-violet-900">{cartao.nome}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {cartao.tipo.replace("_", " ")}
                  </p>
                </div>

                <span className="font-bold text-violet-700 flex flex-col items-end justify-center">
                  <p>
                    {Number(cartao.saldo_atual).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  {cartao.tipo.replace("_", " ") === "cartao" && (
                    <p className="text-sm text-gray-500 capitalize">
                      Limite:{" "}
                      {Number(cartao.limite_total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
