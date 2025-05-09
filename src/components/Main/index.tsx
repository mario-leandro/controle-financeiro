import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";
import UsuarioNavigation from "@/components/UsuarioNavigation";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import SaldoAtual from "@/components/SaldoAtual";
import TransacoesRecebidas from "@/components/TransacoesRecentes";

export default function Main() {
  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="max-w-7xl w-full h-full flex flex-col justify-start items-start p-3 md:p-5 gap-5">
        {/* Interação do usuário */}
        <UsuarioNavigation />

        {/* Carteira */}
        <SaldoCard />

        {/* Cartão de Credito */}
        <CartaoCard />

        {/* Saldo Atual */}
        <SaldoAtual />

        {/* Transacoes Recebidas */}
        <TransacoesRecebidas />

        {/* Botão para adicionar receita/despesa */}
        <BotaoFlutuante />
      </div>
    </div>
  );
}
