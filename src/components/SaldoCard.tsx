import { Wallet } from "lucide-react";

export default function SaldoCard() {
  return (
    <div className="w-full md:w-1/2 h-auto bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5">
      <div className="h-full flex flex-col justify-between gap-3">
        <div className="flex flex-row items-center gap-2">
          <Wallet className="text-violet-900" />
          <p className="text-base lg:text-lg text-violet-900 font-medium">Carteira</p>
        </div>

        <p className="text-lg lg:text-xl text-violet-950 font-semibold">R$ 0,00</p>
      </div>
    </div>
  );
}
