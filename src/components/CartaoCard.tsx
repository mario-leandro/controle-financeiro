import { Account } from "@/types/financeiro";
import { CreditCard } from "lucide-react";

interface CartaoCardProps {
  accounts: Account[];
}

export default function CartaoCard({ accounts }: CartaoCardProps) {
  return (
    <div className="w-full md:w-1/2 h-auto bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center flex-wrap gap-2">
          <div className="flex flex-row items-center gap-2">
            <CreditCard className="text-violet-900" />

            <p className="text-base lg:text-lg text-violet-900 font-medium">
              Cartão de Credito
            </p>
          </div>

          <p className="text-xs lg:text-sm text-violet-900 font-medium">
            Limite: R$ 0,00
          </p>
        </div>

        <p className="text-lg lg:text-xl text-violet-950 font-semibold">
          R$ 0,00
        </p>
      </div>
    </div>
  );
}
