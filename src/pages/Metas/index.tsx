import "@/styles/globals.css";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";

export default function Metas() {
    return (
        <div className="w-full h-screen flex justify-center items-start">
            <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
                {/* Navegação do Usuario */}
                <NavegacaoUsuario />

                <div className="w-full h-full flex flex-col gap-5">
                    <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
                        <div className="w-full flex flex-row justify-center items-center gap-5">
                            <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                                <p className="text-violet-950">Metas do mês</p>

                                <div className="w-full flex flex-col">
                                    {/* Aqui vai ficar as metas cadastradas pelo usuario */}
                                </div>
                            </div>

                            <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                                <p className="text-violet-950">Metas pessoais</p>

                                <div className="w-full flex flex-col">
                                    {/* Aqui vai ficar as metas cadastradas pelo usuario */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}