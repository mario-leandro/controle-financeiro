import "@/styles/globals.css";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";

export default function Relatorios() {
    return (
      <div className="w-full h-screen flex justify-center items-start">
        <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
          {/* Navegação do Usuario */}
          <NavegacaoUsuario />

          <div className="w-full h-full flex flex-col gap-5">
            
          </div>
        </div>
      </div>
    )
}