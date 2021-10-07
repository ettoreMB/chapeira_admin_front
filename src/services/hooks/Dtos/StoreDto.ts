export interface IStoreDto {
  id: string;
  Loja: string;
  Loja_Sigla: string;
  Ativo: boolean;
  CNPJ: number;
  Responsavel: string;
  Responsavel_Email: string;
  Loja_Cidade: string;
  Loja_Endereco: string;
  Loja_UF: string;
}

export type Store = {
  id: number;
  loja: string;
  loja_sigla: string;
  ativo: boolean;
  CNPJ: number;
  responsavel: string;
  responsavel_email: string;
  responsavel_telefone: string;
  uf: string;
};

export interface StoreDashBoardProps {
  data: any;
  loja_Sigla: string;
  total_notas: number;
  total_notas_pendentes: number;
  total_notas_pagas: number;
  total_canceladas: number;
}

export type CreateStoreFormData = {
  Loja: string;
  Loja_Sigla: string;
  Loja_Endereco: string;
  Loja_Cidade: string;
  Loja_UF: string;
  CNPJ: number;
  Responsavel: string;
  Responsavel_Email: string;
  Responsavel_Telefone: string;
};
