import { useQuery } from "react-query";

import { api } from "../../api";
import { IStoreDto } from "../Dtos/StoreDto";
import { StoreDashBoardProps } from "../Dtos/StoreDto";

type getStoresResponse = {
  stores: IStoreDto[];
};

export async function getStores(): Promise<getStoresResponse | any> {
  const { data } = await api.get("/stores/?uf=''");
  const stores = data.map((store: IStoreDto) => {
    return {
      id: store.id,
      loja: store.Loja,
      loja_sigla: store.Loja_Sigla,
      cnpj: store.CNPJ,
      uf: store.Loja_UF,
      ativo: store.Ativo,
      responsavel: store.Responsavel,
      responsavel_email: store.Responsavel_Email,
      url: store.URL,
      endereco: store.Loja_Endereco,
      inicio: store.Insert_Date,
      cidade: store.Loja_Cidade,
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
  return useQuery(["stores", { active: true }], () => getStores(), {
    staleTime: 1000 * 60 * 10,
  });
}

export async function getStore(
  sigla: string | string[] | undefined
): Promise<IStoreDto | any> {
  if (typeof sigla === "string") {
    const response = await api.get(`/stores/${sigla}`);

    if (response) {
      return response.data;
    }
    throw new Error("Fetching Error!");
  }
  throw new Error("Sigla Invalida");
}

export function useGetStore(Loja_Sigla: string) {
  return useQuery(["store", Loja_Sigla], () => getStore(Loja_Sigla));
}

export function useStoreDashBoard(sigla: string) {
  return useQuery(["storeDashBoard", sigla], () => getStoreDashBoard(sigla), {
    staleTime: 1000 * 60 * 10,
  });
}
