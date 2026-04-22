"use client";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import { useState } from "react";

export default function AdicionarFomulario() {
  const [tipoConta, setTipoConta] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <form className="w-full h-auto flex flex-col bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5 gap-3">
          <h1 className="text-lg md:text-2xl font-bold text-violet-900 mb-4">
            Adicionar Categoria
          </h1>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Nome
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-violet-300"
              placeholder="Ex: Alimentação, Salário, Energia..."
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Tipo
            </label>
            <select
              value={tipoConta}
              onChange={(e) => setTipoConta(e.target.value)}
              className="w-full p-3 rounded-lg border border-violet-300"
            >
              <option value="">Selecione o tipo da conta</option>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          {/* <div className="w-full flex flex-col gap-3">
            <label className="text-base font-semibold text-violet-900">
              Saldo inicial
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="R$ 0,00"
            />
          </div> */}

          <button
            type="submit"
            className="px-5 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors disabled:opacity-60"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
