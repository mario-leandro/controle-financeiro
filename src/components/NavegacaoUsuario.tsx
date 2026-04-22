"use client";
import Image from "next/image";
import {
  ArrowLeftRight,
  ChevronDown,
  CircleDollarSign,
  ClipboardMinus,
  Cog,
  Goal,
  LayoutDashboard,
  Menu,
  Plus,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function NavegacaoUsuario() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const nome = profile?.nome || user?.email?.split("@")[0] || "Usuário";
  const fotoUsuario = profile?.avatar_url;
  const email = user?.email || "";

  const navArray = [
    {
      nome: "Dashboard",
      link: "/Dashboard",
      icon: <LayoutDashboard />,
    },
    {
      nome: "Relatórios",
      link: "/Relatorios",
      icon: <ClipboardMinus />,
    },
    {
      nome: "Transações",
      link: "/Transacoes",
      icon: <ArrowLeftRight />,
    },
    {
      nome: "Metas",
      link: "/Metas",
      icon: <Goal />,
    },
    {
      nome: "Pagamentos",
      link: "/Pagamentos",
      icon: <CircleDollarSign />,
    },
  ];

  async function handleLogout() {
    await signOut();
    router.push("/auth/login");
  }

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
            <p className="text-base md:text-lg font-semibold text-violet-900">
              {nome}
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
                    {item.icon}
                    <span className="text-xl font-semibold  ">{item.nome}</span>
                  </Link>
                </li>
              ))}
              <li className="w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex flex-row items-center justify-between gap-3 text-base text-violet-900 transition-all rounded-lg shadow-sm p-3 hover:bg-violet-700 hover:text-white cursor-pointer">
                      <span className="flex items-center gap-3">
                        <Plus size={18} />
                        <span className="text-xl font-semibold">Adicionar</span>
                      </span>
                      <ChevronDown size={18} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-violet-50 border border-violet-200 shadow-md"
                  >
                    <DropdownMenuItem
                      className="text-base font-semibold bg-violet-50 text-violet-900 hover:bg-violet-700 hover:text-white"
                      asChild
                    >
                      <Link href="/Transacoes/Receita">
                        Adicionar Ganho/Gasto
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-base font-semibold bg-violet-50 text-violet-900 hover:bg-violet-700 hover:text-white"
                      asChild
                    >
                      <Link href="/Adicionar/Conta">Adicionar Conta</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-base font-semibold bg-violet-50 text-violet-900 hover:bg-violet-700 hover:text-white"
                      asChild
                    >
                      <Link href="/Adicionar/Categoria">
                        Adicionar Categoria
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-full flex justify-center items-center">
          <Link
            className="flex flex-row justify-center items-center gap-1 cursor-pointer"
            href="/Configuracoes"
          >
            <Cog className="text-violet-900" />
            <p className="text-lg font-semibold text-violet-900 hidden md:block">
              Configurações
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
