import router, { Router, useRouter } from "next/router";
import { useReducer } from "react";
import { useQuery } from "react-query";

import { api } from "../api";

type Store = {
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
  Razao_social: string;
};

type getStoresResponse = {
  stores: Store[];
};

export async function getStores(): Promise<getStoresResponse | any> {
  const { data } = await api.get("/stores");
  const stores = data.map((store: Store) => {
    return {
      id: store.id,
      loja: store.Loja,
      loja_sigla: store.Loja_Sigla,
      CNPJ: store.CNPJ,
      uf: store.Loja_UF,
      ativo: store.Ativo,
      responsavel: store.Responsavel,
      responsavel_email: store.Responsavel_Email,
    };
  });

  return { stores };
}
export function useStores() {
  return useQuery(["stores"], () => getStores(), {
    staleTime: 1000 * 60 * 10,
  });
}

export async function getStore(loja_sigla: string): Promise<any> {
  const { data } = await api.get(`/stores/${loja_sigla}`);
  
  return data;
}

export function useStore(Loja_Sigla: string) {
  return useQuery(["store", Loja_Sigla], async () => await getStore(Loja_Sigla));
}
