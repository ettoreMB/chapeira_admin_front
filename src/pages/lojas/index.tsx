import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { LoadingError } from "@components/LoadingError";
import { SideMenu } from "@components/SideMenu";
import { StoreAccordion } from "@components/Table/StoreAccordion";
import { Store } from "@services/hooks/Dtos/StoreDto";
import { useGetStores } from "@services/hooks/stores/stores.service";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

import { useGetStoreModal } from "../../contexts/GetStoreModalContext";

export default function LojasIndex() {

  const { data, isLoading, error } = useGetStores();

  return (
    <>
      <Header />
      <Flex w="100%">
        <SideMenu />
        <Box flex="1" bg="white" p="8">
          <Flex mb="8" align="center" justifyContent="space-between">
            <Heading size="lg" fontWeight="normal">
              Lojas
            </Heading>

            <Link href="/lojas/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Nova Loja
              </Button>
            </Link>
          </Flex>
          <Input type="text" />
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <LoadingError text={"Error Ao Carregar os Dados"} />
          ) : (
            <>
              {data?.stores.map((store: Store) => {
                return <StoreAccordion stores={store} key={store.id} />;
              })}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
