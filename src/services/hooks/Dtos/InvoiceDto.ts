
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
  Data_Pagamento: Date;
};

export type InvoiceProps = {
  id: number;
  loja_sigla: string,
  nota_fiscal: string;
  faturamento: Date;
  vencimento: Date;
  valor_nota: number;
  valor_servicos: number;
  pago: boolean
  pendente: boolean;
  data_pagamento: Date;
}

export enum InvoiceStatus {
  pago,
  pendente,
}


