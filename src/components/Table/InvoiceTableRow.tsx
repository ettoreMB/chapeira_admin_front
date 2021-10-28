import { Box, Button, Tr, Td, Flex, useToast } from "@chakra-ui/react";
import { InvoiceStatusBadge } from "@components/BagdeStatus";
import { TableTdText } from "@components/Table/TableTdText";
import { api } from "@services/api";
import { InvoiceProps } from "@services/hooks/Dtos/InvoiceDto";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import dayjs from 'dayjs'
import { queryClient } from "@services/queryClient";


interface InvoiceTableRowProps {
  invoice: InvoiceProps;
}

interface UpdateInvoiceProps {
  nota:  string;
  date: string
}

export function InvoiceTableRow({ invoice }: InvoiceTableRowProps) {
  const toast = useToast();
  const updateStatus = useMutation( async ({nota, date}: UpdateInvoiceProps) => {
  const response =  await api.patch(`/invoices/${nota}/?status=pago&date=${date}`)
  
   return response.data
   
  },
  {
    onError: () => {
      toast({
        title: "Erro ao atualizar Status",
        status: "success",
        duration: 8000,
        isClosable: true,
      })
    },
    onSuccess: (message) => {
      console.log(message)
      toast({
        title: `${message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      queryClient.invalidateQueries(["invoicess"])
    },
  }
  );

  const handleUpdateStatus =  (nota: string) => {
    const today = dayjs().format('YYYY-MM-DD')  
    updateStatus.mutate({nota: nota, date: today})
  };


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
                <Button
                  type="submit"
                  width="24"
                  size="xsm"
                  height='8'
                  fontSize="sm"
                  colorScheme="yellow"
                  onClick={() => {handleUpdateStatus(invoice.nota_fiscal)}}
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
