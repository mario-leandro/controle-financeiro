"use client";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import "@/styles/globals.css";

export default function Pagamento() {
  const topics = [
    { id: 1, name: "Pagamentos Pendentes", value: 0 },
    { id: 2, name: "Pagamentos Realizados", value: 0 },
    { id: 3, name: "Total Pago no Mês", value: "R$ 0,00" },
    { id: 4, name: "Valor Ganho no Último Mês", value: "R$ 0,00" },
  ];

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
            {/* nessa div vai ficar os cards com algumas informações, tipo: quantidade de pagamentos pendentes, quantidades de pagamentos realidados, total pago no mês, etc. */}
            <div className="w-full flex flex-row justify-center items-center gap-5">
              {topics.map((topic) => (
                <div key={topic.id} className="w-3/12 h-32 flex flex-col justify-between items-start shadow-lg rounded-lg p-5 bg-violet-50 mr-5">
                  <p className="text-lg font-semibold text-violet-950">{topic.name}</p>
                  <span className="font-semibold text-violet-950 text-base md:text-lg">{topic.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aqui vai ficar um grafico */}
          <div className="w-full h-64 bg-violet-50 shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-semibold text-violet-900 mb-5">Gráfico de Pagamentos</h2>
            <p className="text-violet-900">Gráfico ainda não implementado.</p>
          </div>

          {/* Aqui vai ficar a tabela ou lista de pagamentos */}
          <div className="w-full h-full bg-violet-50 shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-semibold text-violet-900 mb-5">Lista de Pagamentos</h2>
            <p className="text-violet-900">Nenhum pagamento registrado ainda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}