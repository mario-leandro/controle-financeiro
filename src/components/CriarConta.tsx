import NavegacaoUsuario from "./NavegacaoUsuario";

export default function CriarConta() {
  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col justify-start items-start gap-5">
          <h1 className="text-2xl font-bold text-violet-900">
            Adicionar informações da conta
          </h1>
          <form className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nome"
                className="text-sm font-medium text-violet-900"
              >
                Nome da Conta
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Ex: Conta Corrente, Poupança, etc."
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="tipo"
                className="text-sm font-medium text-violet-900"
              >
                Tipo de Conta
              </label>
              <select
                id="tipo"
                name="tipo"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Selecione o tipo de conta</option>
                <option value="conta_corrente">Conta Corrente</option>
                <option value="poupanca">Poupança</option>
                <option value="carteira">Carteira</option>
                <option value="cartao">Cartão</option>
                <option value="investimento">Investimento</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="saldo_inicial"
                className="text-sm font-medium text-violet-900"
              >
                Saldo Inicial
              </label>
              <input
                type="number"
                id="saldo_inicial"
                name="saldo_inicial"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Ex: 1000.00"
                step="0.01"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
