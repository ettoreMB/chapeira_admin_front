
export type InvoiceDto = {
  id: string;
  Loja_Sigla: string;
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

export enum InvoiceStatus {
  pago,
  pendente,
}


