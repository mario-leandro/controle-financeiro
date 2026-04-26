"use client";

import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Camera, LogOut, Save, User } from "lucide-react";
import { useState } from "react";
import { uploadAvatar, updateAvatar } from "@/services/uploadAvatar";
import { createClient } from "@/lib/supabase/client";

export default function Configuracoes() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const supabase = createClient();

  const [nome, setNome] = useState(profile?.nome || "");
  const [loading, setLoading] = useState(false);

  const email = user?.email || "";
  const fotoUsuario = profile?.avatar_url;

  async function handleUpdateProfile() {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({ nome })
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setLoading(true);

      const url = await uploadAvatar(file, user.id);
      await updateAvatar(user.id, url);
      await refreshProfile();

      alert("Foto atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar foto.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    window.location.href = "/auth/login";
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
                <div className="relative">
                  {fotoUsuario ? (
                    <Image
                      className="w-28 h-28 rounded-full object-cover border-4 border-violet-200"
                      src={fotoUsuario}
                      alt={`Foto do usuário ${nome || "Usuário"}`}
                      width={112}
                      height={112}
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-violet-100 flex items-center justify-center border-4 border-violet-200">
                      <User className="w-14 h-14 text-violet-700" />
                    </div>
                  )}

                  <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-violet-700 text-white flex items-center justify-center cursor-pointer hover:bg-violet-800 transition-colors">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <h2 className="mt-4 text-lg font-bold text-violet-900">
                  {profile?.nome || user?.email?.split("@")[0] || "Usuário"}
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
                    Atualize seu nome e visualize seu email de acesso.
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
