import "@/styles/globals.css";
import NavegacaoUsuario from "@/components/NavegacaoUsuario";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Transacoes() {
  const transacoesArr = {
    entrada: [
      {
        id: 1,
        descricao: "Salário",
        valor: 1516,
        data: "2026-01-02",
        categoria: "Salário",
        tipo: "entrada",
      },
      {
        id: 2,
        descricao: "Freelance",
        valor: 800,
        data: "2026-01-15",
        categoria: "Trabalho",
        tipo: "entrada",
      },
      {
        id: 3,
        descricao: "Venda de itens",
        valor: 200,
        data: "2026-01-20",
        categoria: "Vendas",
        tipo: "entrada",
      },
    ],
    saida: [
      {
        id: 1,
        descricao: "Aluguel",
        valor: 500,
        data: "2026-01-05",
        categoria: "Moradia",
        tipo: "saida",
      },
      {
        id: 2,
        descricao: "Supermercado",
        valor: 300,
        data: "2026-01-10",
        categoria: "Alimentação",
        tipo: "saida",
      },
      {
        id: 3,
        descricao: "Transporte",
        valor: 100,
        data: "2026-01-12",
        categoria: "Transporte",
        tipo: "saida",
      },
    ],
  };

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full h-full flex flex-row justify-start items-start p-3 md:p-5 gap-5">
        {/* Navegação do Usuario */}
        <NavegacaoUsuario />

        <div className="w-full h-full flex flex-col gap-5">
          <div className="w-full min-h-44 h-auto bg-violet-50 p-5 rounded-lg shadow-lg">
            <div>
              <p className="text-lg font-semibold text-violet-900">
                Resumo Financeiro
              </p>
              <div className="w-full flex flex-row justify-start items-center gap-5">
                <div className="w-1/4 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-green-50">
                  <p className="text-lg font-semibold text-green-900">
                    Total de Entradas
                  </p>
                  <p className="text-2xl font-bold text-green-900">R$ 2.516</p>
                </div>
                <div className="w-1/4 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-red-50">
                  <p className="text-lg font-semibold text-red-900">
                    Total de Saídas
                  </p>
                  <p className="text-2xl font-bold text-red-900">R$ 900</p>
                </div>
                <div className="w-1/4 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-blue-50">
                  <p className="text-lg font-semibold text-blue-900">
                    Saldo Final
                  </p>
                  <p className="text-2xl font-bold text-blue-900">R$ 1.616</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap gap-5">
            <div className="w-full flex flex-row justify-center items-center gap-5">
              <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                <p className="text-lg font-semibold text-violet-900">
                  Transações de Saída
                </p>
                <div className="w-full flex flex-col">
                  {/* Aqui vai ficar as transações cadastradas pelo usuario */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-violet-950">
                          Descrição
                        </TableHead>
                        <TableHead className="text-violet-950">Valor</TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">
                          Categoria
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacoesArr.saida.map((transacao) => (
                        <TableRow key={transacao.id}>
                          <TableCell className="text-violet-900">
                            {transacao.descricao}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            R${transacao.valor}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {transacao.data}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {transacao.categoria}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-between items-start shadow-lg rounded-lg gap-3 p-5 bg-violet-50 mr-5">
                <p className="text-lg font-semibold text-violet-900">
                  Transações de Entrada
                </p>
                <div className="w-full flex flex-col">
                  {/* Aqui vai ficar as transações cadastradas pelo usuario */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-violet-950">
                          Descrição
                        </TableHead>
                        <TableHead className="text-violet-950">Valor</TableHead>
                        <TableHead className="text-violet-950">Data</TableHead>
                        <TableHead className="text-violet-950">
                          Categoria
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacoesArr.entrada.map((transacao) => (
                        <TableRow key={transacao.id}>
                          <TableCell className="text-violet-900">
                            {transacao.descricao}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            R${transacao.valor}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {transacao.data}
                          </TableCell>
                          <TableCell className="text-violet-900">
                            {transacao.categoria}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
