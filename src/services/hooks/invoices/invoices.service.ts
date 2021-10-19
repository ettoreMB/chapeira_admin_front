import { api } from "@services/api";
import { queryClient } from "@services/queryClient";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { InvoiceDto } from "../Dtos/InvoiceDto";

type GetInvoiceProps = {
  invoices: InvoiceDto[];
};

export async function getInvoices() {
  const { data } = await api.get("/invoices");

  const invoices = data.map((invoice: InvoiceDto) => {
    return {
      id: invoice.id,
      loja_sigla: invoice.Loja_Sigla,
      Nota_Fiscal: invoice.Nota_Fiscal,
      Data_Faturamento: invoice.Data_Faturamento,
      Data_Vencimento: invoice.Data_Vencimento,
      Valor_Nota: invoice.Valor_Nota,
      Valor_Servicos: invoice.Valor_Servicos,
      pago: invoice.Pago,
      pendente: invoice.Pendente,
    };
  });
  return invoices;
}

export function useInvoices() {
  return useQuery(["invoicess"], () => getInvoices(), {
    staleTime: 1000 * 60 * 10,
  });
}

export async function updatePaidInvoice(invoiceNumber: string) {
  const response = await api.post(`/invoices/${invoiceNumber}/status=true`);
  return response;
}

export const useUpdatePaidInvoice = () => {
  return useMutation(
    (invoiceNumber: string) => updatePaidInvoice(invoiceNumber),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["invoices"]);
        const previousData = queryClient.getQueryData(["invoices"]);
        return previousData;
      },
      onError: (context) => {
        queryClient.setQueryData(["invoices"], context);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["invoices"]);
      },
    }
  );
};
