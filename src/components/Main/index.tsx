"use client";
import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import TransacoesRecebidas from "@/components/TransacoesRecentes";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import Modal from "@/components/modal";
import { useState } from "react";

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
            {/* Carteira */}
            <SaldoCard />

            {/* Cartão de Credito */}
            <CartaoCard />
          </div>

          {/* Transacoes Recebidas */}
          <TransacoesRecebidas />

          {/* Botão para adicionar receita/despesa */}
          <BotaoFlutuante onClick={toggleModal} />

          {/* Modal para escolher opções de ganho e gasto */}
          <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </div>
    </div>
  );
}
