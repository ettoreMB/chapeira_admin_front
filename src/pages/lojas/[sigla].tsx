import { Box, Flex, Heading, Text, Spinner} from '@chakra-ui/react' 

import Header from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'

import { useRouter } from 'next/router';
import { useQuery } from "react-query";
import { api } from '../../services/api';
import { useStores } from '../../services/hooks/useStores';



interface StoreData {
  Loja: string;
  Loja_Sigla: string;
  Loja_Endereco: string;
  Loja_Cidade: string;
  Loja_UF: string;
  CNPJ: number;
  Responsavel:string;
  Responsavel_Email: string;
  Responsavel_Telefone:string;
  
}

export default function Store () {
  const router = useRouter()
  const { sigla } = router.query

  
    const {  data, isLoading, error } = useStores(sigla)
     
   
    
   return (
    
    <Box>
      <Header/>
      <Flex w='100%'  my='6' maxWidth={1840} mx='auto' px='6' borderRadius='8'>
        <SideMenu />
        <Box flex='1' borderEndRadius={8} bg='white' p='8' >
          <Heading textAlign='center'>Loja</Heading>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Text>Houve um erro</Text>
          ) : (
            <>
              <Text>Loja:</Text>
               <Text>{data.Loja}</Text>
              <Text>{data.Loja_Sigla}</Text>
              <Text>{data.CNPJ}</Text> 

              <Text>Responsavel:</Text>
              {/*<Text>{data.Responsavel_Email}</Text>
              <Text>{data.Responsavel_Telefone}</Text>*/}

              <Text>Endereço:</Text>
              {/*<Text>{data.Loja_Endereco}</Text>
              <Text>{data.Loja_Cidade}</Text>
              <Text>{data.Loja_UF}</Text>*/}
            </>
          )}
            

            <Flex>      
            </Flex>
        </Box>
      </Flex>
    </Box>
    )
  }
