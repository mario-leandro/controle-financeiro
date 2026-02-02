import "@/styles/globals.css";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";

export default function Metas() {
    const arrMetasMensais = [
        { id: 1, descricao: "Economizar R$ 500", status: "Em andamento" },
        { id: 2, descricao: "Pagar dívidas", status: "Concluído" },
    ];

    const arrMetasPessoais = [
        { id: 1, descricao: "Comprar carro", status: "Em andamento" },
        { id: 2, descricao: "Fazer uma viagem", status: "Pendente" },
    ];

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
                                    {arrMetasMensais.map((meta) => (
                                        <div key={meta.id} className="flex flex-row p-2 mb-2 bg-violet-50 rounded shadow">
                                            <div className="flex flex-col">
                                                <p className="text-violet-950">{meta.descricao}</p>
                                                <p className="text-violet-950">Status: {meta.status}</p>
                                            </div>

                                            <span className="flex flex-row">
                                                <button></button>
                                                <button></button>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                                <p className="text-violet-950">Metas pessoais</p>

                                <div className="w-full flex flex-col">
                                    {/* Aqui vai ficar as metas cadastradas pelo usuario */}
                                    {arrMetasPessoais.map((meta) => (
                                        <div key={meta.id} className="flex flex-row p-2 mb-2 bg-violet-50 rounded shadow">
                                            <div className="flex flex-col">
                                                <p className="text-violet-950">{meta.descricao}</p>
                                                <p className="text-violet-950">Status: {meta.status}</p>
                                            </div>
                                            <span className="flex flex-row">
                                                <button></button>
                                                <button></button>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}