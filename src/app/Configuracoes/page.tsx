"use client";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

export default function Configuracoes() {
  const { user, profile, signOut } = useAuth();

  const nome = profile?.nome || user?.email?.split("@")[0] || "Usuário";
  const fotoUsuario = profile?.avatar_url;
  const email = user?.email || "";

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="w-full min-h-44 flex flex-row bg-violet-50 p-5 rounded-lg shadow-lg">
            <div className="w-120 flex flex-col h-full bg-violet-400">
              <div>
                {fotoUsuario ? (
                  <Image
                    className="w-15 h-15 md:w-20 md:h-20 rounded-full"
                    src={fotoUsuario}
                    alt={`Foto do usuário ${nome}`}
                    width={80}
                    height={80}
                  />
                ) : (
                  <User className="w-15 h-15 md:w-20 md:h-20 text-violet-900" />
                )}
              </div>
              <div></div>
            </div>

            <div className="w-full h-full bg-violet-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
