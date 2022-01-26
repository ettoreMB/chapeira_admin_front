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
  Tr,
  Select,
  Input,
  Spinner
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { SideMenu } from "@components/SideMenu";
import { InvoiceTableRow } from "@components/Table/InvoiceTableRow";
import { InvoiceDto, InvoiceProps } from "@services/hooks/Dtos/InvoiceDto";
import { useInvoices } from "@services/hooks/invoices/invoices.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";

export default function FaturasIndex() {
  const { data, isLoading } = useInvoices();
  
  const [isPaid, setIsPaid] = useState(false);
  const [isPendent, setPendent] = useState(false);
  const [noteNumber, setNoteNumber] = useState('');
 
  let invoices = data?.filter((invoice: InvoiceProps) => {
    if (isPaid) {
      return invoice.pago == true;
    } else if (isPendent) {
      return invoice.pendente == true;
    } else if (noteNumber != "") {
      return invoice.nota_fiscal == noteNumber
    } else {
      return data;
    }
    
  });

  
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
            <Link href="/faturas/create" passHref>
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
          <Flex>
          <Select
            w='50'
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
            <Input type="search" value={noteNumber} onChange={(e) => {setNoteNumber(e.target.value)}}/>
            
          </Flex>
            {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>) : 
            (
              <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Status</Th>
                    <Th>Nota</Th>
                    <Th>Loja-sigla</Th>
                    <Th>valor nota</Th>
                    <Th>valor serviços</Th>
                    <Th>emissão</Th>
                    <Th>Vencimento</Th>
                    <Th>Data Pagamento</Th>
                  </Tr>
                </Thead>
  
                <Tbody>
                  {invoices.map((invoice: any) => (
                     <InvoiceTableRow invoice={invoice} key={invoice.id} />
                  ))}
                </Tbody>
              </Table>
            </>
            )}
        </Box>
      </Flex>
    </>
  );
}
