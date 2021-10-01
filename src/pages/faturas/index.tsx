import { Box ,Button,Flex, Heading, Icon,  Text, Table, Thead, Checkbox, Th, Tbody, Td, Tr, Input } from "@chakra-ui/react";
import { RiAddLine,RiPencilLine } from "react-icons/ri";
import Link from 'next/link';


import { Header } from "@components/Header";
import { TableTdText} from "@components/Table/TableTdText"
import { SideMenu} from '@components/SideMenu'
import { useInvoices } from "../../services/hooks/useInvoices";
import { useState } from "react";
import { useRouter } from "next/router";

 export default function FaturasIndex() {
 const router = useRouter();
 const { data, error } = useInvoices()
 const [storeInitial, setStoreInital] = useState("");
 function dateFormat(date: Date) {
   const formatedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(date))
   return formatedDate
  }
  
  function currencyFormat(valor: number) {
    const valorFormated = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)

    return valorFormated
  }

  return (
    <Box>
    <Header/>
    <Flex w='100%'  my='6' maxWidth={1840} mx='auto' px='6'>
      <SideMenu />
      <Box flex='1' borderEndRadius={8} bg='white' p='8'>
          <Flex mb='8' align='center' justifyContent='space-between'>
            <Heading size='lg' fontWeight='normal'>Faturas</Heading>
            <Input type="text"
              onChange={(event) => {
                setStoreInital(event.target.value)
            }}/>
            <Button onClick={() => router.push(`/faturas/${storeInitial}`)}>Filtrar</Button>
            <Link href='/faturas/edit/loja3' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='blue'
                leftIcon={<Icon as={RiAddLine}
                fontSize='20'/>}
              >Criar Nova Nota
              </Button>
            </Link>
          </Flex>
      
            <>
              <Table colorScheme='whiteAlpha' >
                <Thead>
                <Tr>
                  <Th px={['4','6','6']} color='gray.300' width='8'>
                    <Checkbox  colorScheme='yellow'/>
                  </Th>
                  <Th>
                    Nota
                  </Th>
                   <Th>
                    Loja-sigla
                  </Th>
                   <Th>
                    valor nota
                  </Th>
                  <Th>
                    valor serviços
                  </Th>
                  <Th>
                    emissão
                  </Th>
                  <Th>
                    pagamento
                  </Th>
                  <Th>
                    pago
                  </Th>
                  <Th>
                    pendente
                  </Th>
                  <Th width='8'></Th>
                </Tr>
                </Thead>
            <Tbody>
             
               {data?.map(invoice => { 
                 return(
                  <Tr key={invoice.id} >
                  <Td px={['4','4','6']}>
                    <Checkbox  colorScheme='green'/>
                  </Td>
                  <TableTdText data={invoice.Nota_Fiscal}/>
                  <TableTdText data={invoice.Loja_Sigla}/>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{currencyFormat(invoice.Valor_Nota)}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{currencyFormat(invoice.Valor_Servicos)}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{dateFormat(invoice.Data_Faturamento)}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{dateFormat(invoice.Data_Vencimento)}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Checkbox  colorScheme='green'/>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Checkbox  colorScheme='red'/>
                    </Box>
                  </Td>
                  
                  <Td>
                
                  <Button
                    as='a'
                    size='sm'
                    fontSize='sm'
                    colorScheme='yellow'
                    leftIcon={<Icon as={RiPencilLine}
                    fontSize='20'/>}
                  >
                  </Button>
                  </Td>
                </Tr>
                 ) })}
            </Tbody>
          </Table>
        </>    
        </Box>
      </Flex>
      </Box>


  )
}