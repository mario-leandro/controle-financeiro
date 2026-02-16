"use client";
import "@/styles/globals.css";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Relatorios() {
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [tipoRelatorio, setTipoRelatorio] = useState("transacoes");
  const [tipoRelatorioInput, setTipoRelatorioInput] = useState("transacoes");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [buscarRelatorio, setBuscarRelatorio] = useState(false);

  const toggleTabela = () => {
    setMostrarTabela((prev) => !prev);
  };

  const buscarRelatorioHandler = () => {
    setTipoRelatorio(tipoRelatorioInput);
    setBuscarRelatorio(true);
  };

  const handleTipoRelatorioChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTipoRelatorioInput(event.target.value);
    // Aqui você pode adicionar a lógica para buscar o relatório com base no tipo selecionado
  };

  const handleDataInicioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDataInicio(event.target.value);
  };

  const handleDataFinalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDataFinal(event.target.value);
  };

  type HistoricoItem = {
    id: number;
    descricao: string;
    data: string;
    status: string;
    valor: number;
    entrada_saida?: "entrada" | "saida";
  };

  type RelatorioGrupo = {
    qtd: number;
    valor_total: number;
    historico: HistoricoItem[];
  };

  const relatorio: Record<string, RelatorioGrupo> = {
    transacoes: {
      qtd: 14,
      valor_total: 1500,
      historico: [
        {
          id: 1,
          entrada_saida: "entrada",
          descricao: "Salário",
          data: "2026-01-05",
          status: "Concluido",
          valor: 200,
        },
        {
          id: 2,
          entrada_saida: "entrada",
          descricao: "Freelance",
          data: "2026-01-10",
          status: "Concluido",
          valor: 300,
        },
        {
          id: 3,
          entrada_saida: "entrada",
          descricao: "Venda",
          data: "2026-01-15",
          status: "Concluido",
          valor: 1000,
        },
      ],
    },
    metas: {
      qtd: 5,
      valor_total: 5000,
      historico: [
        {
          id: 1,
          descricao: "Meta 1",
          data: "2026-01-20",
          status: "Concluido",
          valor: 1000,
        },
        {
          id: 2,
          descricao: "Meta 2",
          data: "2026-01-25",
          status: "Em andamento",
          valor: 2000,
        },
        {
          id: 3,
          descricao: "Meta 3",
          data: "2026-01-30",
          status: "Pendente",
          valor: 2000,
        },
      ],
    },
    pagamentos: {
      qtd: 3,
      valor_total: 300,
      historico: [
        {
          id: 1,
          descricao: "Pagamento 1",
          data: "2026-01-12",
          status: "Concluido",
          valor: 100,
        },
        {
          id: 2,
          descricao: "Pagamento 2",
          data: "2026-01-18",
          status: "Concluido",
          valor: 150,
        },
        {
          id: 3,
          descricao: "Pagamento 3",
          data: "2026-01-28",
          status: "Pendente",
          valor: 50,
        },
      ],
    },
  };

  const labelsRelatorio: Record<string, string> = {
    transacoes: "Transacoes",
    metas: "Metas",
    pagamentos: "Pagamentos",
  };

  const relatorioSelecionado = relatorio[tipoRelatorio];

  const parseDate = (value: string) => {
    if (!value) {
      return null;
    }
    return new Date(`${value}T00:00:00`);
  };

  const formatDate = (value: string) => {
    if (!value) {
      return "Sem data";
    }
    return new Date(`${value}T00:00:00`).toLocaleDateString("pt-BR");
  };

  const dataInicioObj = parseDate(dataInicio);
  const dataFinalObj = parseDate(dataFinal);
  const intervaloInvalido =
    dataInicioObj !== null &&
    dataFinalObj !== null &&
    dataInicioObj > dataFinalObj;

  const historicoFiltrado = relatorioSelecionado.historico.filter((item) => {
    const dataItem = new Date(`${item.data}T00:00:00`);
    if (dataInicioObj && dataItem < dataInicioObj) {
      return false;
    }
    if (dataFinalObj && dataItem > dataFinalObj) {
      return false;
    }
    return true;
  });

  const totalFiltrado = historicoFiltrado.reduce(
    (acc, item) => acc + item.valor,
    0,
  );
  const qtdFiltrado = historicoFiltrado.length;
  const mostrarEntradaSaida = tipoRelatorio === "transacoes";

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          {/* Aqui vai ficar os filtros do relatório */}
          <div className="w-full h-auto flex flex-col justify-start items-center bg-violet-50 rounded-lg p-3">
            <div className="w-full h-full flex flex-row gap-5">
              <div className="w-48 h-full flex flex-col place-content-center place-items-start">
                <label className="text-violet-900 mb-2" htmlFor="data_inicio">
                  Data Início
                </label>
                <input
                  type="date"
                  name="data_inicio"
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 py-2"
                  value={dataInicio}
                  onChange={handleDataInicioChange}
                />
              </div>

              <div className="w-48 h-full flex flex-col place-content-center place-items-start">
                <label className="text-violet-900 mb-2" htmlFor="data_final">
                  Data Final
                </label>
                <input
                  type="date"
                  name="data_final"
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 py-2"
                  value={dataFinal}
                  onChange={handleDataFinalChange}
                />
              </div>

              <div className="w-48 h-full flex flex-col place-content-center place-items-start">
                <label
                  className="text-violet-900 mb-2"
                  htmlFor="tipo_relatorio"
                >
                  Tipo de Relatório
                </label>
                <select
                  name="tipo_relatorio"
                  value={tipoRelatorioInput}
                  onChange={handleTipoRelatorioChange}
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="transacoes">Transações</option>
                  <option value="metas">Metas</option>
                  <option value="pagamentos">Pagamentos</option>
                </select>
              </div>
            </div>
            <div className="w-full flex justify-start items-center">
              {/* criar um evento que ao clicar no botão de buscar relatório, ele exibe o card da tabela */}
              <button
                className="mt-3 px-4 py-2 bg-violet-500 text-white rounded-lg disabled:opacity-60"
                onClick={buscarRelatorioHandler}
                disabled={intervaloInvalido}
              >
                Buscar Relatório
              </button>
              {intervaloInvalido && (
                <span className="ml-4 mt-3 text-sm text-red-600">
                  Data final nao pode ser menor que a data de inicio.
                </span>
              )}
            </div>
          </div>

          {/* Aqui vai os cards com as informações do relatório */}
          <div className="w-full h-full flex flex-col gap-5">
            {/* criar um evento de que quando clicar no card, ele exibe a tabela */}
            <div
              id="card_relatorio"
              className={`w-full h-auto flex flex-col justify-between bg-violet-50 rounded-lg p-5 cursor-pointer gap-5 ${buscarRelatorio ? "" : "hidden"}`}
            >
              <div
                className="w-full flex flex-row justify-between items-center cursor-pointer"
                onClick={toggleTabela}
              >
                <h2 className="w-auto text-lg font-bold text-violet-900">
                  Historico de {labelsRelatorio[tipoRelatorio]}{" "}
                  {formatDate(dataInicio)} - {formatDate(dataFinal)}
                </h2>

                <ChevronDown
                  color="#2e1065"
                  className={`${mostrarTabela ? "hidden" : ""}`}
                />
                <ChevronUp
                  color="#2e1065"
                  className={`${mostrarTabela ? "" : "hidden"}`}
                />
              </div>

              {
                <div
                  className={`w-full h-auto mt-3 ${mostrarTabela ? "" : "hidden"}`}
                  id="tabela_relatorio"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] text-violet-950">
                          ID
                        </TableHead>
                        {mostrarEntradaSaida && (
                          <TableHead className="text-violet-950">E/S</TableHead>
                        )}
                        <TableHead className="text-violet-950">
                          Descrição
                        </TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">
                          Status
                        </TableHead>
                        <TableHead className="text-right text-violet-950">
                          Valor
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicoFiltrado.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium text-violet-900">
                            {item.id}
                          </TableCell>
                          {mostrarEntradaSaida && (
                            <TableCell className="capitalize text-violet-900">
                              {item.entrada_saida === "entrada"
                                ? "Entrada"
                                : "Saida"}
                            </TableCell>
                          )}
                          <TableCell className="text-violet-900">
                            {item.descricao}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {formatDate(item.data)}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {item.status}
                          </TableCell>
                          <TableCell className="text-right text-violet-900">
                            R$ {item.valor.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell
                          colSpan={mostrarEntradaSaida ? 5 : 4}
                          className="text-violet-950"
                        >
                          Total
                        </TableCell>
                        <TableCell className="text-right text-violet-950">
                          R$ {totalFiltrado.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              }

              <div className="w-full h-full flex flex-row justify-start items-center gap-5">
                <p className="text-violet-900">Registros: {qtdFiltrado}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
