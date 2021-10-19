import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  Table,
  Thead,
  Checkbox,
  Th,
  Tbody,
  Td,
  Tr,
  Select,
  Input,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { SideMenu } from "@components/SideMenu";
import { InvoiceTableRow } from "@components/Table/InvoiceTableRow";
import { TableTdText } from "@components/Table/TableTdText";
import { api } from "@services/api";
import {
  updatePaidInvoice,
  useInvoices,
  useUpdatePaidInvoice,
} from "@services/hooks/invoices/invoices.service";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { Mutation } from "react-query/types/core/mutation";

export default function FaturasIndex() {
  const { data, isLoading } = useInvoices();

  const [isPaid, setIsPaid] = useState(false);
  const [isPendent, setPendent] = useState(false);

  const handleGetPaid = () => {
    if (isPendent == true) {
      setIsPaid(false);
    }

    setIsPaid(true);
  };

  const invoices = data.filter((invoice) => {
    if (isPaid) {
      return invoice.pago == true;
    } else if (isPendent) {
      return invoice.pendente == true;
    } else {
      return data;
    }
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <Header />
      <Flex w="100%">
        <SideMenu />
        <Box flex="1" bg="white" p="8">
          <Flex mb="8" align="center" justifyContent="space-between">
            <Heading size="lg" fontWeight="normal">
              Faturas
            </Heading>
            <Input type="text" />
            <Select
              placeholder="status"
              onChange={(e) => {
                if (e.target.value === "paid") {
                  setIsPaid(true);
                }
                if (e.target.value === "pendent") {
                  setIsPaid(false);
                  setPendent(true);
                }
                if (e.target.value === "") {
                  setIsPaid(false);
                  setPendent(false);
                }
              }}
            >
              <option value="paid">Pago</option>
              <option value="pendent">Pentente</option>
            </Select>
            <Link href="/faturas/edit/loja3" passHref>
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

          <>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Nota</Th>
                  <Th>Loja-sigla</Th>
                  <Th>valor nota</Th>
                  <Th>valor serviços</Th>
                  <Th>emissão</Th>
                  <Th>pagamento</Th>
                  <Th>pago</Th>
                  <Th>pendente</Th>
                  <Th width="8"></Th>
                </Tr>
              </Thead>

              <Tbody>
                {invoices?.map((invoice: any) => (
                  <InvoiceTableRow invoice={invoice} key={invoice.id} />
                ))}
              </Tbody>
            </Table>
          </>
        </Box>
      </Flex>
    </>
  );
}
