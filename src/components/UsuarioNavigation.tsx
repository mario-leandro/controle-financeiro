import Image from "next/image";
import userPhoto from "@/assets/user-photo.jpg";
import { Cog } from "lucide-react";

export default function UsuarioNav() {
  return (
    <div className="w-full h-20 flex flex-row justify-between items-center rounded-2xl">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="w-20 h-20 rounded-full"
          src={userPhoto}
          alt="Foto do usuário"
          width={100}
          height={100}
        />
        <p className="text-lg font-semibold text-violet-900">Mario Marques</p>
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
  );
}
