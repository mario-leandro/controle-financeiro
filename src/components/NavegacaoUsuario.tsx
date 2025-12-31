import Image from "next/image";
import userPhoto from "@/assets/user-photo.jpg";
import { Cog } from "lucide-react";
// import { Cog } from "lucide-react";

export default function NavegacaoUsuario() {
  return (
    <div className="w-80 h-full flex flex-col justify-between items-center rounded-2xl shadow-lg bg-violet-100 px-5 py-10">
      <div className="w-full flex flex-row items-center gap-2">
        <Image
          className="w-15 h-15 md:w-20 md:h-20 rounded-full"
          src={userPhoto}
          alt="Foto do usuário"
          width={80}
          height={80}
        />
        <p className="text-base md:text-lg font-semibold text-violet-900">Mario Marques</p>
      </div>

      <div className="w-full flex justify-center items-center">
        <span className="flex flex-row justify-center items-center gap-1 cursor-pointer">
          <Cog className="text-violet-900" />
          <p className="text-lg font-semibold text-violet-900 hidden md:block">
            Configurações
          </p>
        </span>
      </div>
    </div>
  );
}