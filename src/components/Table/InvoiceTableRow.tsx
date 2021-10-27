import { Box, Button, Icon, Checkbox, Td, Tr, Text, Input, Flex } from "@chakra-ui/react";
import { InvoiceStatusBadge } from "@components/BagdeStatus";
import { TableTdText } from "@components/Table/TableTdText";
import { InvoiceProps } from "@services/hooks/Dtos/InvoiceDto";

interface InvoiceTableRowProps {
  invoice: InvoiceProps;
}

export function InvoiceTableRow({ invoice }: InvoiceTableRowProps) {
  return (
    <Tr>
      <InvoiceStatusBadge status={invoice.pago}/>
      <TableTdText data={invoice.nota_fiscal} /> 
      <TableTdText data={invoice.loja_sigla} />
      <TableTdText  data={invoice.valor_nota} />
      <TableTdText  data={invoice.valor_servicos} />
      <TableTdText data={invoice.faturamento} />
      <TableTdText data={invoice.vencimento} />
      {invoice.pendente == true ? (
        <Td p='0' m='0'>
          <Box>
            <Flex>
                <Input type='date' height='8'/>
                <Button
                  width="24"
                  size="xsm"
                  height='8'
                  fontSize="sm"
                  colorScheme="yellow"
                >Autalizar
                </Button>
            </Flex>
          </Box>
        </Td>
        ) : (
        <TableTdText data={invoice.data_pagamento} />
        )
      }
    </Tr>
  );
}
