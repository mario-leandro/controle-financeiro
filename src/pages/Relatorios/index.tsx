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

  const toggleTabela = () => {
    setMostrarTabela(!mostrarTabela);
    const tabela = document.getElementById("tabela_relatorio");
    if (tabela) {
      if (mostrarTabela) {
        tabela.classList.add("hidden");
      } else {
        tabela.classList.remove("hidden");
      }
    }
  };

  const relatorio = {
    transacoes: {
      qtd: 14,
      valor_total: 1500,
      historico: [
        {
          id: 1,
          entrada_saida: "entrada",
          descricao: "Salário",
          data: "2026-01-05",
          valor: 200,
        },
        {
          id: 2,
          entrada_saida: "entrada",
          descricao: "Freelance",
          data: "2026-01-10",
          valor: 300,
        },
        {
          id: 3,
          entrada_saida: "entrada",
          descricao: "Venda",
          data: "2026-01-15",
          valor: 1000,
        },
      ],
    },
  };

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
                <input type="date" name="data_inicio" />
              </div>

              <div className="w-48 h-full flex flex-col place-content-center place-items-start">
                <label className="text-violet-900 mb-2" htmlFor="data_final">
                  Data Final
                </label>
                <input type="date" name="data_final" />
              </div>

              <div className="w-48 h-full flex flex-col place-content-center place-items-start">
                <label
                  className="text-violet-900 mb-2"
                  htmlFor="tipo_relatorio"
                >
                  Tipo de Relatório
                </label>
                <select name="tipo_relatorio">
                  <option value="relatorio1">Transações</option>
                  <option value="relatorio2">Metas</option>
                  <option value="relatorio3">Pagamentos</option>
                </select>
              </div>
            </div>
            <div className="w-full flex justify-start items-center">
              <button className="mt-3 px-4 py-2 bg-violet-500 text-white rounded-lg">
                Buscar Relatório
              </button>
            </div>
          </div>

          {/* Aqui vai os cards com as informações do relatório */}
          <div className="w-full h-full flex flex-col gap-5">
            {/* criar um evento de que quando clicar no card, ele exibe a tabela */}
            <div
              id="card_relatorio"
              className="w-full h-auto flex flex-col justify-between bg-violet-50 rounded-lg p-5 cursor-pointer gap-5"
            >
              <div
                className="w-full flex flex-row justify-between items-center cursor-pointer"
                onClick={toggleTabela}
              >
                <h2 className="w-auto text-lg font-bold text-violet-900">
                  Histórico de Transações 01/01/2026 - 31/01/2026
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
                        <TableHead className="text-violet-950">
                          Status
                        </TableHead>
                        <TableHead className="text-violet-950">
                          Descrição
                        </TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-right text-violet-950">
                          Valor
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {relatorio.transacoes.historico.map((transacao) => (
                        <TableRow key={transacao.id}>
                          <TableCell className="font-medium text-violet-900">
                            {transacao.id}
                          </TableCell>
                          <TableCell className="capitalize text-violet-900">
                            {transacao.entrada_saida === "entrada"
                              ? "Entrada"
                              : "Saída"}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {transacao.descricao}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {transacao.data}
                          </TableCell>
                          <TableCell className="text-right text-violet-900">
                            R$ {transacao.valor.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4} className="text-violet-950">
                          Total
                        </TableCell>
                        <TableCell className="text-right text-violet-950">
                          R$ {relatorio.transacoes.valor_total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              }

              <div className="w-full h-full flex flex-row justify-start items-center gap-5">
                <p className="text-violet-900">
                  Registros: {relatorio.transacoes.qtd}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
