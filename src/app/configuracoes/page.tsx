"use client";

import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { sendRequest } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Configuracoes() {
  const { user, setUser, signOut } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const email = user?.email || "";

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setFotoUrl(user.foto_url || "");
    }
  }, [user]);

  async function handleUpdateProfile() {
    try {
      setLoading(true);

      const response = await sendRequest({
        type: "auth",
        action: "update_profile",
        data: {
          nome,
          foto_url: fotoUrl || null,
        },
      });

      if (!response.success) {
        throw new Error(response.message || "Erro ao atualizar perfil");
      }

      const updatedUser = {
        ...user,
        nome,
        foto_url: fotoUrl || null,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    router.push("/auth/login");
  }

  return (
    <div className="w-full h-screen flex justify-center items-start bg-violet-200">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <main className="w-full flex flex-col gap-5">
          <div className="w-full bg-violet-50 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-violet-900">
                Configurações
              </h1>
              <p className="text-sm md:text-base text-violet-700 mt-1">
                Gerencie suas informações de perfil.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              <section className="flex flex-col items-center justify-start bg-white rounded-2xl shadow-sm p-6">
                {fotoUrl ? (
                  <img
                    className="w-28 h-28 rounded-full object-cover border-4 border-violet-200"
                    src={fotoUrl}
                    alt={`Foto do usuário ${nome || "Usuário"}`}
                    width={112}
                    height={112}
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-violet-100 flex items-center justify-center border-4 border-violet-200">
                    <User className="w-14 h-14 text-violet-700" />
                  </div>
                )}

                <h2 className="mt-4 text-lg font-bold text-violet-900">
                  {nome || user?.email?.split("@")[0] || "Usuário"}
                </h2>

                <p className="text-sm text-violet-600 break-all text-center">
                  {email}
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-violet-900">
                    Dados pessoais
                  </h2>
                  <p className="text-sm text-violet-600">
                    Atualize seu nome e sua foto de perfil.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-violet-900">
                    Nome
                  </label>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    placeholder="Seu nome"
                    className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-violet-900">
                    URL da foto
                  </label>
                  <input
                    value={fotoUrl}
                    onChange={(e) => setFotoUrl(e.target.value)}
                    type="file"
                    className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-violet-900">
                    Email
                  </label>
                  <input
                    value={email}
                    disabled
                    className="w-full p-3 rounded-lg border border-violet-200 bg-violet-50 text-violet-700 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors disabled:opacity-60"
                  >
                    <Save size={18} />
                    {loading ? "Salvando..." : "Salvar alterações"}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <LogOut size={18} />
                    Sair da conta
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
