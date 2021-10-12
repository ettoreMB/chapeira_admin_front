
import {
  Box,
  Flex,
  Heading,
  Divider,
  SimpleGrid,
  VStack,
  useToast,
  HStack,
  Button,
  Spinner,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { Input } from "@components/Form/Input";
import { Header } from "@components/Header";
import { SideMenu } from "@components/SideMenu";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { CreateStoreFormData } from "@services/hooks/Dtos/StoreDto";
import { getStore, useGetStore } from "@services/hooks/stores/stores.service";
import { queryClient } from "@services/queryClient";
import { useGetStoreModal } from "contexts/GetStoreModalContext";
import { GetServerSideProps } from "next";

import Link from "next/link";
import { useRouter } from "next/router";


import {  useQuery } from "react-query";
import * as yup from "yup";




export default function Store() {
  const router = useRouter();
  const { sigla } = router.query


 
    const {data} =  useQuery(["store", sigla], () => getStore(sigla), {
      enabled: !!sigla,
    });
  
  

  

  return (
    <h1>{sigla}</h1>
  )
}


