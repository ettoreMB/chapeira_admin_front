import { Box ,Button,Flex, Heading, Icon, useBreakpointValue, Spinner, Text, Table, Thead, Checkbox, Th, Tbody, Td, Tr } from "@chakra-ui/react";
import { RiAddLine,RiPencilLine, RiSpectrumFill } from "react-icons/ri";
import Link from 'next/link';
import Header from "../../components/Header";
import { SideMenu } from '../../components/SideMenu';

import { useQuery } from "react-query";
import { useStores } from "../../services/hooks/useStores";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

type Store = { 
  id: number;
  loja: string;
  loja_sigla: string;
  CNPJ: number;
  uf: string;
  ativo: boolean;
  responsavel: string;
  responsavel_email: string;
}

export default function LojasIndex() {
  const  { data, isLoading, error} = useStores();
    
  async function handleprefecthStore(sigla: string) {
    await queryClient.prefetchQuery(['store', sigla], async () => {
      const response = await api.get(`/stores/${sigla}`)

      return response.data
    })
  }

  return (
    <Box>
    <Header/>
    <Flex w='100%'  my='6' maxWidth={1840} mx='auto' px='6'>
      <SideMenu />
      <Box flex='1' borderEndRadius={8} bg='white' p='8'>
          <Flex mb='8' align='center' justifyContent='space-between'>
            <Heading size='lg' fontWeight='normal'>Lojas</Heading>

            <Link href='/' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='blue'
                leftIcon={<Icon as={RiAddLine}
                fontSize='20'/>}
              >Criar Nova Loja
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao carregar Dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha' >
                <Thead>
                <Tr>
                  <Th px={['4','4','6']} color='gray.300' width='8'>
                    <Checkbox  colorScheme='yellow'/>
                  </Th>
                  <Th>
                    Loja
                  </Th>
                   <Th>
                    Loja-sigla
                  </Th>
                   <Th>
                    estado
                  </Th>
                  <Th>
                    responsavel
                  </Th>
                  <Th>
                    email
                  </Th>
                  
                  <Th width='8'></Th>
                </Tr>
                </Thead>

            <Tbody>
             { data?.stores.map( (stores: Store) => {
               return (
                <Tr key={stores.id}>
                  <Td px={['4','4','6']}>
                    <Checkbox  colorScheme='green'/>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{stores.loja}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text
                        fontWeight='bold'
                        onMouseEnter={() => handleprefecthStore(stores.loja_sigla)}
                        >{stores.loja_sigla}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{stores.uf}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{stores.responsavel}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{stores.responsavel_email}</Text>
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
               )
             })}
            </Tbody>

          </Table>
            </>    
          )}

        </Box>
      </Flex>
      </Box>


  )
}