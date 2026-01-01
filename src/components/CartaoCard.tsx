import { CreditCard } from "lucide-react";

export default function CartaoCard() {
  return (
    <div className="w-1/2 h-auto bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <CreditCard className="text-violet-900" />
            
            <p className="text-base md:text-lg text-violet-900 font-medium">
              Cartão de Credito
            </p>
          </div>

          <p className="text-xs md:text-sm text-violet-900 font-medium">Limite: R$ 0,00</p>
        </div>

        <p className="text-lg md:text-xl text-violet-950 font-semibold">R$ 0,00</p>
      </div>
    </div>
  );
}
