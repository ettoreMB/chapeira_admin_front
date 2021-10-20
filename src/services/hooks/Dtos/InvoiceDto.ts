const InvoiceStatus = {
  Paid: true,
  Pending: true,
};

export type InvoiceDto = {
  id: string;
  loja_sigla: string;
  Nota_Fiscal: string;
  Data_Faturamento: Date;
  Data_Vencimento: Date;
  Pago: boolean;
  Pendente: boolean;
  Valor_Nota: number;
  Valor_Servicos: number;
  pago: boolean;
  pendente: boolean;
};

export { InvoiceStatus };
