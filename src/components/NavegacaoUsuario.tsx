"use client";
import Image from "next/image";
import userPhoto from "@/assets/user-photo.jpg";
import { Cog, Menu, X } from "lucide-react";
// import { obterUsuario } from "@/services/routes_api";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Usuario {
  nome: string;
  email: string;
  foto_usuario?: string;
}

export default function NavegacaoUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navArray = [
    { nome: "Dashboard", link: "/Dashboard" },
    { nome: "Relatórios", link: "/Relatorios" },
    { nome: "Transações", link: "/Transacoes" },
    { nome: "Metas", link: "/Metas" },
    { nome: "Pagamentos", link: "/Pagamentos" },
  ];

  async function fetchUsuario() {
    try {
      // const data = await obterUsuario();
      // setUsuario(data);
      // console.log("Usuário obtido com sucesso:", data);
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
    }
  }

  useEffect(() => {
    fetchUsuario();
  }, []);

  return (
    <>
      {/* Botão de Menu Hamburger - Visível apenas no mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-5 left-5 z-50 p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay escuro quando menu está aberto - Mobile apenas */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Sidebar */}
      <div
        className={`fixed md:static md:w-80 h-full z-30 flex flex-col justify-between items-center rounded-2xl shadow-lg bg-violet-50 px-5 py-10 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "left-0 top-0 w-64 md:w-80"
            : "-left-64 md:left-auto top-0 md:top-auto md:w-80"
        }`}
      >
        <div className="w-full flex flex-col items-center gap-2">
          <div className="flex flex-row justify-center items-center gap-3">
            <Image
              className="w-15 h-15 md:w-20 md:h-20 rounded-full"
              src={userPhoto}
              alt={`Foto do usuário ${usuario?.nome ?? "Mario Marques"}`}
              width={80}
              height={80}
            />
            <p className="text-base md:text-lg font-semibold text-violet-900">
              {usuario?.nome ?? "Mario Marques"}
            </p>
          </div>

          <nav className="w-full flex justify-center items-center">
            <ul className="w-full flex flex-col mt-10 gap-5">
              {navArray.map((item) => (
                <li className="w-full" key={item.nome}>
                  <Link
                    href={item.link}
                    className="flex flex-row items-center gap-3 text-base text-violet-900 transition-all rounded-lg delay-75 shadow-sm p-3 hover:bg-violet-700 hover:text-white hover:p-3"
                  >
                    <span className="text-xl font-semibold  ">{item.nome}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
    </>
  );
}
