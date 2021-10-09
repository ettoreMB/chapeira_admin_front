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
import { GetStoreModal } from "@components/GetStoreModal";
import { Header } from "@components/Header";
import { LoadingError } from "@components/LoadingError";
import { SideMenu } from "@components/SideMenu";
import { TableTdText } from "@components/Table/TableTdText";
import { api } from "@services/api";
import { Store } from "@services/hooks/Dtos/StoreDto";
import { useGetStores } from "@services/hooks/stores/stores.service";
import { queryClient } from "@services/queryClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiAddLine } from "react-icons/ri";

import { useGetStoreModal } from "../../contexts/GetStoreModalContext";

export default function LojasIndex() {
  const { onOpen } = useGetStoreModal();

  const { data, isLoading, error } = useGetStores();

  const [searchTerm, setSearchTerm] = useState("");
  const [storeData, setStoreData] = useState({});

  async function handleLoadStoreInfo(sigla: string) {
    await queryClient.fetchQuery(["store", sigla], async () => {
      const response = await api.get(`/stores/${sigla}`);
      const storeInfo = response.data;
      setStoreData(storeInfo);
    });
  }

  useEffect(() => {
    setStoreData(storeData);
  }, [storeData]);

  return (
    <>
      <Header />
      <Flex w="100%">
        <SideMenu />
        <Box flex="1" borderEndRadius={8} bg="white" p="8">
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
          <Input
            type="text"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <LoadingError text={"Error Ao Carregar os Dados"} />
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Loja</Th>
                    <Th>Loja-sigla</Th>
                    <Th>estado</Th>
                    <Th>responsavel</Th>
                    <Th>email</Th>
                    <Th width="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.stores
                    .filter((store: Store) => {
                      if (searchTerm === "") {
                        return store;
                      }
                      if (
                        store.responsavel
                          .toLowerCase()
                          .includes(searchTerm.toLocaleLowerCase())
                      )
                        return store;
                    })
                    .map((stores: Store) => {
                      return (
                        <>
                          <Tr key={stores.id}>
                            <TableTdText data={stores.loja} />
                            <Td>
                              <Box>
                                <Text fontWeight="bold">
                                  {stores.loja_sigla}
                                </Text>
                              </Box>
                            </Td>
                            <TableTdText data={stores.uf} />
                            <TableTdText data={stores.responsavel} />
                            <TableTdText data={stores.responsavel_email} />
                            <Td>
                              <Button
                                onClick={async () => {
                                  await handleLoadStoreInfo(stores.loja_sigla);
                                  onOpen();
                                }}
                                flex={1}
                                rounded={"full"}
                                fontSize="sm"
                                bg={"blue.400"}
                                color={"white"}
                                boxShadow={
                                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                }
                                _hover={{
                                  bg: "blue.500",
                                }}
                                _focus={{
                                  bg: "blue.500",
                                }}
                              >
                                Ver
                              </Button>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                </Tbody>
              </Table>
              <GetStoreModal data={storeData} />
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
