import router, { Router, useRouter } from 'next/router';

import { useQuery } from 'react-query';
import { api } from '../api';

type StoreDashBoardProps = {}

export async function getStoreDashBoard (sigla: string) {
  const { data } = await api.get(`/stores/dashboard/${sigla}`);
  console.log(sigla)
  const store = data;
  
  return store;
}


export function useStoreDashBoard(sigla:string) {
  
  return useQuery(['storeDashBoard'],   ()=>getStoreDashBoard(sigla), {
    staleTime: 1000 * 60 *10
  })
}