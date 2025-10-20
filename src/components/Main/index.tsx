import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import TransacoesRecebidas from "@/components/TransacoesRecentes";
import NavegacaoUsuario from "../NavegacaoUsuario";
import Modal from "../modal";

export default function Main() {
  return (
    <div className="w-full flex justify-center items-start">
      <div className="max-w-7xl w-full flex flex-col justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        {/* Carteira */}
        <SaldoCard />

        {/* Cartão de Credito */}
        <CartaoCard />

        {/* Transacoes Recebidas */}
        <TransacoesRecebidas />

        {/* Botão para adicionar receita/despesa */}
        <BotaoFlutuante />

        {/* Modal para escolher opções de ganho e gasto */}
        <Modal />
      </div>
    </div>
  );
}
