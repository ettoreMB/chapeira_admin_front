import { useQuery } from "react-query";

import { api } from "../api";

type StoreDashBoardProps = {
  data: any;
  loja_Sigla: string;
  total_notas: number;
  total_notas_pendentes: number;
  total_notas_pagas: number;
  total_canceladas: number;
};

export async function getStoreDashBoard(
  sigla: string
): Promise<StoreDashBoardProps> {
  const { data }: StoreDashBoardProps = await api.get(
    `/stores/dashboard/${sigla}`
  );

  const store = data;

  return store;
}

export function useStoreDashBoard(sigla: string) {
  return useQuery(["storeDashBoard", sigla], () => getStoreDashBoard(sigla), {
    staleTime: 1000 * 60 * 10,
  });
}
