import Image from "next/image";
import userPhoto from "@/assets/user-photo.jpg";
import { Cog } from "lucide-react";
import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";

export default function Main() {
  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="max-w-7xl w-full h-full flex flex-col justify-start items-start p-3 md:p-5 gap-7">
        {/* Interação do usuário */}
        <div className="w-full h-20 flex flex-row justify-between items-center rounded-2xl">
          <div className="flex flex-row items-center gap-2">
            <Image
              className="w-20 h-20 rounded-full"
              src={userPhoto}
              alt="Foto do usuário"
              width={100}
              height={100}
            />
            <p className="text-lg font-semibold text-violet-900">
              Mario Marques
            </p>
          </div>

          <div className="h-full flex justify-center items-center">
            <span className="flex flex-row justify-center items-center gap-1 cursor-pointer">
              <Cog className="text-violet-900" />
              <p className="text-lg font-semibold text-violet-900 hidden md:block">
                Configurações
              </p>
            </span>
          </div>
        </div>

        {/* Saldo */}
        <SaldoCard />

        {/* Cartão de Credito */}
        <CartaoCard />
      </div>
    </div>
  );
}
