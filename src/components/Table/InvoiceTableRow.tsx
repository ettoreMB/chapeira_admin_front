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
  Input,
} from "@chakra-ui/react";
import { TableTdText } from "@components/Table/TableTdText";
import { api } from "@services/api";
import { InvoiceDto } from "@services/hooks/Dtos/InvoiceDto";
import { RiPencilLine } from "react-icons/ri";

interface InvoiceTableRowProps {
  invoice: InvoiceDto;
  onUpdate: () => any;
}

export function InvoiceTableRow({ invoice, onUpdate }: InvoiceTableRowProps) {
  return (
    <Tr>
      <TableTdText data={invoice.Nota_Fiscal} />
      <TableTdText data={invoice.Loja_Sigla} />
      <TableTdText data={invoice.Valor_Nota} />
      <TableTdText data={invoice.Valor_Servicos} />
      <TableTdText data={invoice.Data_Faturamento} />
      <TableTdText data={invoice.Data_Vencimento} />
      <Td>
        <Box onClick={onUpdate}>
          {invoice.pago ? (
            <Checkbox colorScheme="green" isChecked={true} />
          ) : (
            <Checkbox colorScheme="green" />
          )}
        </Box>
      </Td>

      <Td>
        <Box>
          {invoice.pendente ? (
            <Checkbox colorScheme="red" isChecked={true} />
          ) : (
            <Checkbox colorScheme="red" />
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
}
