/* eslint-disable no-nested-ternary */
import {
  Box,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";


import Header from "../../components/Header";
import LoadingError from "../../components/LoadingError";
import { SideMenu } from "../../components/SideMenu";

import { useInvoicesByStore } from "../../services/hooks/useInvoices";



export default function InvoicesByStore() {
  const router = useRouter();
  const { sigla } = router.query;

  const toast = useToast();
  const { data, isLoading } = useInvoicesByStore(sigla as string)

  
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
