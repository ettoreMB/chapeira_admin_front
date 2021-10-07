import { useQuery } from "react-query";

import { api } from "../../api";
import { IStoreDto, Store } from "../Dtos/StoreDto";
import { StoreDashBoardProps } from "../Dtos/StoreDto";

type getStoresResponse = {
  stores: IStoreDto[];
};

export async function getStore(loja_sigla: string): Promise<IStoreDto | any> {
  const { data } = await api.get(`/stores/${loja_sigla}`);
  return {
    ...data,
    id: data.id,
    loja: data.Loja,
    loja_sigla: data.Loja_Sigla,
    CNPJ: data.CNPJ,
    uf: data.Loja_UF,
    ativo: data.Ativo,
    responsavel: data.Responsavel,
    responsavel_email: data.Responsavel_Email,
  };
}

export async function getStores(): Promise<getStoresResponse | any> {
  const { data } = await api.get("/stores");
  const stores = data.map((store: IStoreDto) => {
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

export async function getStoreDashBoard(
  sigla: string
): Promise<StoreDashBoardProps> {
  const { data }: StoreDashBoardProps = await api.get(
    `/stores/dashboard/${sigla}`
  );

  const store = data;

  return store;
}

export function useGetStores() {
  return useQuery(["stores"], () => getStores(), {
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetStore(Loja_Sigla: string) {
  return useQuery(["store", Loja_Sigla], async () => getStore(Loja_Sigla));
}

export function useStoreDashBoard(sigla: string) {
  return useQuery(["storeDashBoard", sigla], () => getStoreDashBoard(sigla), {
    staleTime: 1000 * 60 * 10,
  });
}
