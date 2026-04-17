import NavegacaoUsuario from "../../../components/NavegacaoUsuario";

export default function AddGasto() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <div className="w-full h-full bg-violet-50 flex flex-col justify-start items-start gap-5 rounded-2xl p-5 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-violet-900">
            Adicionar Gasto
          </h1>
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Descrição
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Ex: Aluguel, Supermercado, etc."
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-base font-semibold text-violet-900">
              Valor
            </label>
            <input
              type="number"
              className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Ex: 2500.00"
            />
          </div>
          <button className="px-5 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
