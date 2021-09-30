/* eslint-disable no-nested-ternary */
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import Header from "../../components/Header";
import LoadingError from "../../components/LoadingError";
import { SideMenu } from "../../components/SideMenu";
import { StoreCard } from "../../components/StoreCard";
import { api } from "../../services/api";
import { useStoreDashBoard } from "../../services/hooks/useStoreDashBoard";
import { queryClient } from "../../services/queryClient";

export default function Store() {
  const router = useRouter();
  const { sigla } = router.query;

  const toast = useToast();
  const { data, isLoading, error } = useStoreDashBoard(sigla as string);

  const deleteStore = useMutation(
    async () => {
      await api.delete(`/stores/${sigla}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
        toast({
          title: "Loja Deletada com sucesso.",
          description: "We've created your account for you.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.push(`/lojas`);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "An Error ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1840}>
        <SideMenu />
        <Box flex="1" borderEndRadius={8} bg="white" p="8">
          {!data ? (
            <LoadingError text={"Loja Não Existente"} />
          ) : isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <LoadingError text={"Erro ao Carregar dados"} />
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
