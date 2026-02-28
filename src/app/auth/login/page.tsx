"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, senha);
      router.push("/Dashboard");
      alert("Login realizado com sucesso!");
    } catch (err) {
      alert(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
      );
    }
  };

  return (
    // login container
    <div className="w-96 min-h-96 bg-violet-300 px-6 py-10 rounded-lg shadow-lg flex flex-col justify-between items-center">
      {/* login title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-violet-700">Login</h1>
      </div>

      {/* login form */}
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 mb-6"
      >
        <div className="flex flex-col gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-lg p-2 bg-violet-200 outline-none text-violet-800 placeholder:text-violet-500"
          />
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg p-2 bg-violet-200 outline-none text-violet-800 placeholder:text-violet-500"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full rounded-lg p-2 bg-violet-400 text-white font-bold cursor-pointer hover:bg-violet-500 transition-colors"
        >
          Entrar
        </button>
      </form>

      {/* login footer */}
      <div className="text-sm text-violet-700">
        <p>
          Não tem uma conta?{" "}
          <button
            onClick={() => router.push("/auth/cadastro")}
            className="text-violet-700 font-bold cursor-pointer hover:underline"
          >
            Registre-se
          </button>
        </p>
      </div>
    </div>
  );
}
