import type { Transaction } from "@/types/financeiro";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TransacoesRecebidasProps {
  transactions: Transaction[];
}

function formatarValor(valor: number) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getStatus(tipo: Transaction["tipo"]) {
  switch (tipo) {
    case "receita":
      return "Recebido";
    case "despesa":
      return "Pago";
    case "transferencia":
      return "Transferência";
    default:
      return "Registrado";
  }
}

function getMetodo(transaction: Transaction) {
  if (transaction.categories?.nome) return transaction.categories.nome;
  if (transaction.observacao) return transaction.observacao;
  return "Não informado";
}

export default function TransacoesRecebidas({
  transactions,
}: TransacoesRecebidasProps) {
  return (
    <div className="w-full h-auto py-3 md:py-5">
      <div className="flex flex-col gap-3">
        <p className="text-base md:text-lg text-violet-950 font-bold">
          Transações Recentes
        </p>

        <div className="w-full bg-violet-50 rounded-2xl shadow-sm p-2 md:p-3">
          {transactions.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-sm md:text-base text-violet-900 font-semibold">
                Nenhuma transação recente
              </p>
            </div>
          ) : (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px] text-violet-950 text-xs sm:text-xs md:text-base font-semibold">
                    Fatura
                  </TableHead>
                  <TableHead className="text-violet-950 md:text-base font-semibold hidden md:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="text-violet-950 text-xs sm:text-xs md:text-base font-semibold">
                    Método
                  </TableHead>
                  <TableHead className="text-violet-950 text-xs sm:text-xs md:text-base font-semibold text-right">
                    Quantia
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((transaction) => {
                  const isReceita = transaction.tipo === "receita";

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium text-xs sm:text-xs md:text-base text-violet-900">
                        {transaction.descricao}
                      </TableCell>

                      <TableCell className="font-medium text-xs md:text-base text-violet-900 hidden md:table-cell">
                        {getStatus(transaction.tipo)}
                      </TableCell>

                      <TableCell className="font-medium text-xs sm:text-xs md:text-base text-violet-900">
                        {getMetodo(transaction)}
                      </TableCell>

                      <TableCell
                        className={`font-medium text-xs sm:text-xs md:text-base text-right ${
                          isReceita ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isReceita ? "+" : "-"}
                        {formatarValor(Number(transaction.valor))}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
