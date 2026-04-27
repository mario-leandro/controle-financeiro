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

        <p className="text-lg lg:text-xl text-violet-700 font-semibold">
          {totalCartao.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
}
