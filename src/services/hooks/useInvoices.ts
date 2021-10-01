import { useQuery } from 'react-query';
import { api } from '../api';

type Invoice = {
  id: string;
  loja_Sigla: string;
  Nota_Fiscal: string;
  Data_Faturamento: Date;
  Data_Vencimento: Date;
  Pago: boolean;
  Pendente: boolean;
  Valor_Nota: number;
  Valor_Servicos: number;
}

export async function getInvoices(): Promise<Invoice[]> {
  const { data } = await api.get('/invoices')
  const invoices = data.map((invoice: Invoice) => {
    return {
      id: invoice.id,
      loja_Sigla: invoice.loja_Sigla,
      Nota_Fiscal: invoice.Nota_Fiscal,
      Data_Faturamento: invoice.Data_Faturamento,
      Data_Vencimento: invoice.Data_Vencimento,
      Valor_Nota: invoice.Valor_Nota,
      Valor_Servicos: invoice.Valor_Servicos
    }
  })

  return invoices;
}

export function useInvoices() {
  return useQuery(['invoices'], () => getInvoices(), {
    staleTime: 1000 * 60 * 10
  })
}

export async function getInvoicesByStore(sigla: string): Promise<Invoice[]> {
  const { data } = await api.get(`/invoices/${sigla}`);
  const invoices = data.map((invoice: Invoice) => {
    return {
      id: invoice.id,
      loja_Sigla: invoice.loja_Sigla,
      Nota_Fiscal: invoice.Nota_Fiscal,
      Data_Faturamento: invoice.Data_Faturamento,
      Data_Vencimento: invoice.Data_Vencimento,
      Valor_Nota: invoice.Valor_Nota,
      Valor_Servicos: invoice.Valor_Servicos
    }
  })
  return invoices;
};

export function useInvoicesByStore(sigla: string) {
  return useQuery(["invoices", sigla], () => getInvoicesByStore);
};