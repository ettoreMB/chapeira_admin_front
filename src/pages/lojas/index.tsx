import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Checkbox,
  Th,
  Tbody,
  Td,
  Tr,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header";
import LoadingError from "../../components/LoadingError";
import { SideMenu } from "../../components/SideMenu";
import { api } from "../../services/api";
import { useStores } from "../../services/hooks/useStores";
import { queryClient } from "../../services/queryClient";

type Store = {
  id: number;
  loja: string;
  loja_sigla: string;
  CNPJ: number;
  uf: string;
  ativo: boolean;
  responsavel: string;
  responsavel_email: string;
};

export default function LojasIndex() {
  const router = useRouter();

  const { data, isLoading, error } = useStores("");
  const [searchTerm, setSearchTerm] = useState("");

  async function handleprefecthStore(sigla: string) {
    await queryClient.prefetchQuery(["store", sigla], async () => {
      const response = await api.get(`/stores/${sigla}`);

      return response.data;
    });
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1840} mx="auto" px="6">
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

                      if (
                        store.responsavel_email
                          .toLowerCase()
                          .includes(searchTerm.toLocaleLowerCase())
                      )
                        return store;
                    })
                    .map((stores: Store) => {
                      return (
                        <Tr key={stores.id}>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">{stores.loja}</Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box>
                              <Text
                                fontWeight="bold"
                                onMouseEnter={() =>
                                  handleprefecthStore(stores.loja_sigla)
                                }
                              >
                                {stores.loja_sigla}
                              </Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">{stores.uf}</Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">
                                {stores.responsavel}
                              </Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">
                                {stores.responsavel_email}
                              </Text>
                            </Box>
                          </Td>

                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="20" />
                              }
                              onClick={() =>
                                router.push(`lojas/${stores.loja_sigla}`)
                              }
                            >
                              editar
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
