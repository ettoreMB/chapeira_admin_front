import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Thead,
  Checkbox,
  Th,
  Tbody,
  Td,
  Tr,
  Input,
  Select,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { LoadingError } from "@components/LoadingError";
import { SideMenu } from "@components/SideMenu";
import { TableTdText } from "@components/Table/TableTdText";
import { InvoiceDto } from "@services/hooks/Dtos/InvoiceDto";
import {
  useGetStores,
  useGetStore,
} from "@services/hooks/stores/stores.service";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

export default function FaturasBySigla() {
  const router = useRouter();
  const { sigla } = router.query;
  const stores = useGetStores();
  const [storeInitial, setStoreInital] = useState("");
  const { data, isLoading, error } = useGetStore(sigla as string);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1840} mx="auto" px="6">
        <SideMenu />
        <Box flex="1" borderEndRadius={8} bg="white" p="8">
          <Flex mb="8" align="center" justifyContent="space-between">
            <Heading size="lg" fontWeight="normal">
              Faturas
            </Heading>
            <Input
              type="text"
              onChange={(event) => {
                setStoreInital(event.target.value);
              }}
            />
            <Button onClick={() => router.push(`/faturas/${storeInitial}`)}>
              Filtrar
            </Button>
            <Select
              focusBorderColor="yellow.100"
              bgColor="gray.200"
              variant="filled"
              _hover={{
                bgColor: "gray.100",
              }}
              size="lg"
            >
              {stores.data?.map((store: any) => {
                return (
                  <option value="" key={store.id}>
                    {store.loja}
                  </option>
                );
              })}
            </Select>
            <Link href="/" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Nova Nota
              </Button>
            </Link>
          </Flex>
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
                    <Th px={["4", "6", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="yellow" />
                    </Th>
                    <Th>Nota</Th>
                    <Th>Loja-sigla</Th>
                    <Th>valor nota</Th>
                    <Th>valor servi??os</Th>
                    <Th>emiss??o</Th>
                    <Th>pagamento</Th>
                    <Th>pago</Th>
                    <Th>pendente</Th>
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((invoice: InvoiceDto) => {
                    return (
                      <Tr key={invoice.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="green" />
                        </Td>
                        <TableTdText data={invoice.Nota_Fiscal} />
                        <TableTdText data={invoice.Loja_Sigla} />
                        <TableTdText data={invoice.Valor_Nota} />
                        <TableTdText data={invoice.Valor_Servicos} />
                        <TableTdText data={invoice.Data_Faturamento} />
                        <TableTdText data={invoice.Data_Vencimento} />

                        <Td>
                          <Box>
                            {invoice.pago === true ? (
                              <Checkbox colorScheme="green" isChecked={true} />
                            ) : (
                              <Checkbox colorScheme="green" isChecked={false} />
                            )}
                          </Box>
                        </Td>

                        <Td>
                          <Box>
                            {invoice.pendente === true ? (
                              <Checkbox colorScheme="red" isChecked={true} />
                            ) : (
                              <Checkbox colorScheme="red" isChecked={false} />
                            )}
                          </Box>
                        </Td>

                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="yellow"
                            leftIcon={<Icon as={RiPencilLine} fontSize="20" />}
                          ></Button>
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
