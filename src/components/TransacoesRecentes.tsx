import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function TransacoesRecebidas() {
  const lista_transacoes = [
    {
      id: 1,
      descricao: "Valor Recebido",
      status: "Recebido",
      metodo: "Transferência",
      quantia: "700",
    },
    {
      id: 2,
      descricao: "Faculdade",
      status: "Pago",
      metodo: "Pix",
      quantia: "215.91",
    },
    {
      id: 3,
      descricao: "Skin Valorant",
      status: "Pendente",
      metodo: "Cartão de Crédito",
      quantia: "80.00",
    },
  ];

  // const renderNenhumaTransacao = <p className="text-lg text-violet-900 font-semibold">Nenhuma Transação Recente</p>

  return (
    <div className="w-full h-auto py-3 md:py-5">
      <div className="flex flex-col gap-3">
        <p className="text-base md:text-lg text-violet-950 font-bold">Transações Recentes</p>

        <div className="w-full bg-violet-50 rounded-2xl shadow-sm p-2 md:p-3">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px] text-violet-950 text-xs sm:text-xs md:text-base font-semibold">Fatura</TableHead>
                <TableHead className="text-violet-950 md:text-base font-semibold hidden md:block">Status</TableHead>
                <TableHead className="text-violet-950 text-xs sm:text-xs md:text-base font-semibold">Método</TableHead>
                <TableHead className="text-violet-950 text-xs sm:text-xs md:text-base font-semibold text-right">Quantia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lista_transacoes.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium text-xs sm:text-xs md:text-base text-violet-900">{i.descricao}</TableCell>
                  <TableCell className="font-medium text-xs md:text-base text-violet-900 hidden md:block">{i.status}</TableCell>
                  <TableCell className="font-medium text-xs sm:text-xs md:text-base text-violet-900">{i.metodo}</TableCell>
                  <TableCell className="font-medium text-xs sm:text-xs md:text-base text-right text-violet-900">R$ {i.quantia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
