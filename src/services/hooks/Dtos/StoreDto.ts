export type Store = {
  id: string;
  loja: string;
  loja_sigla: string;
  ativo: boolean;
  cnpj: number;
  responsavel: string;
  responsavel_email: string;
  cidade: string;
  loja_endereco: string;
  uf: string;
  inicio: Date;
  endereco: string;
  url: string;
};

export interface IStoreDto {
  id: number;
  Loja: string;
  Loja_Sigla: string;
  Ativo: boolean;
  CNPJ: number;
  Responsavel: string;
  Responsavel_Email: string;
  Responsavel_Telefone: string;
  Loja_UF: string;
  Loja_Cidade: string;
  Loja_Endereco: string;
  URL: string;
  Insert_Date: Date;
}

export interface StoreDashBoardProps {
  data: any;
  loja_Sigla: string;
  total_notas: number;
  total_notas_pendentes: number;
  total_notas_pagas: number;
  total_canceladas: number;
}

export type CreateStoreFormData = {
  id?: string;
  Loja: string;
  Loja_Sigla: string;
  Loja_Endereco: string;
  Loja_Cidade: string;
  Loja_UF: string;
  CNPJ: number;
  URL: string;
  Responsavel: string;
  Responsavel_Email: string;
  Responsavel_Telefone: string;
};
