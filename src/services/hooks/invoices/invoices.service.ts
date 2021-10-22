import { api } from "@services/api";
import { queryClient } from "@services/queryClient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dayjs from 'dayjs';
import { InvoiceDto } from "../Dtos/InvoiceDto";
import { convertMoneyValue } from "@services/utils";

type GetInvoiceProps = {
  invoices: InvoiceDto[];
};

export async function getInvoices() {
  const { data } = await api.get("/invoices");

  const invoices = data.map((invoice: InvoiceDto) => {
    return {
      id: invoice.id,
      loja_sigla: invoice.Loja_Sigla,
      nota_fiscal: invoice.Nota_Fiscal,
      faturamento: dayjs(invoice.Data_Faturamento).format('DD/MM/YYYY'),
      vencimento: dayjs(invoice.Data_Vencimento).format('DD/MM/YYYY'),
      valor_nota: convertMoneyValue(invoice.Valor_Nota),
      valor_servicos: convertMoneyValue(invoice.Valor_Servicos),
      pago: invoice.Pago,
      pendente: invoice.Pendente,
      data_pagamento: dayjs(invoice.Data_Pagamento).format('DD/MM/YYYY'),
    };
  });
  return invoices;
}

export function useInvoices() {
  return useQuery(["invoicess"], () => getInvoices(), {
    staleTime: 1000 * 60 * 10,
  });
}

export async function updatePaidInvoice(invoiceNumber: string, date: Date) {
  const response = await api.post(`/invoices/${invoiceNumber}/?status=pago&date=${date}`);
  return response;
}

export const useUpdatePaidInvoice = () => {
  return useMutation(
    ({ invoiceNumber, date }: any) => updatePaidInvoice(invoiceNumber, date),
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
