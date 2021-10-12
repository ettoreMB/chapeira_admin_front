import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { Header } from "@components/Header";
import { LoadingError } from "@components/LoadingError";
import { SideMenu } from "@components/SideMenu";

import { api } from "@services/api";
import { IStoreDto } from "@services/hooks/Dtos/StoreDto";
import { useGetStores } from "@services/hooks/stores/stores.service";

import Link from "next/link";

import { RiAddLine } from "react-icons/ri";
import { useQuery } from "react-query";

import { useGetStoreModal } from "../../contexts/GetStoreModalContext";

export default function LojasIndex() {

 const {data, status} = useGetStores()

    const { onOpen } = useGetStoreModal();

  if(status === "loading") {
    return <h1>Loading</h1>
  }

  if(status === "error") {
    return <h1>ERROR</h1>
  }

  return (
    <>
    {data.stores?.map(store =>
      <Box key={store.id}>
        <Link href={`/lojas/${store.loja_sigla}`}><Text>{store.loja}</Text></Link>
      </Box>
    )}
     
    </>
  );
}
