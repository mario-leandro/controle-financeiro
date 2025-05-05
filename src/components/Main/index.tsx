import SaldoCard from "@/components/SaldoCard";
import CartaoCard from "@/components/CartaoCard";
import UsuarioNavigation from "../UsuarioNavigation";

export default function Main() {
  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="max-w-7xl w-full h-full flex flex-col justify-start items-start p-3 md:p-5 gap-7">
        {/* Interação do usuário */}
        <UsuarioNavigation />

        {/* Saldo */}
        <SaldoCard />

        {/* Cartão de Credito */}
        <CartaoCard />
      </div>
    </div>
  );
}
