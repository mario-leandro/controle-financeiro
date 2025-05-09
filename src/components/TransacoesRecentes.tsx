export default function TransacoesRecebidas() {
    return (
        <div className="w-full h-auto py-3 md:py-5">
            <div className="flex flex-col gap-3">
                <p className="text-lg text-violet-950 font-bold">
                    Transações Recentes
                </p>

                <div className="w-full bg-violet-50 rounded-2xl shadow-sm p-3 md:p-5">
                    <p className="text-lg text-violet-900 font-semibold">Nenhuma Transação Recente</p>
                </div>
            </div>
        </div>
    )
}