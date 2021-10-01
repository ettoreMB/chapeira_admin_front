import { Box, Flex, Heading, Divider, VStack,HStack, Button, SimpleGrid, Select, FormControl, FormLabel} from '@chakra-ui/react' 
import {Header} from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'
import {Input} from '../../components/Form/Input';

import { SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver} from  '@hookform/resolvers/yup';

import Link from 'next/link';

import { api } from '../../services/api';
import { useMutation } from 'react-query';
import { convertDate } from '../../masks/masks';
import { useRouter } from 'next/router';
import { queryClient } from '../../services/queryClient';
import axios from 'axios';
import { useStores } from "../../services/hooks/useStores";


type CreateInvoiceFormData = {
  Nota_Fiscal: string;
  loja_Sigla: string;
  Data_Faturamento: string;
  Valor_Servicos: number;
  Valor_Nota: number;
  Data_Vencimento: string;
}

const createInvoiceFormSchema = yup.object().shape({
  loja_Sigla: yup.string().required('Sigla da Loja Obrigátorio'),
  Nota_Fiscal: yup.string().required("Número da Nota Obrigatório"),
  Valor_Servicos: yup.string().required("Valor do Serviço Obrigátorio"),
  Valor_Nota: yup.string().required("Valor da Nota Obrigátorio"),
  Data_Vencimento: yup.string().required("Data do vencimento Obrigátorio"),
  Data_Faturamento: yup.string().required("Data do Faturamento Obrigátorio")
});

export default function CreateInvoice () {

  const router = useRouter()

  const sigla = ''
  
  const {data, error} = useStores(sigla)
  
  const createInvoice= useMutation( async (data:CreateInvoiceFormData) => {
    
    const {data: response} = await api.post('/invoices', data)

    return response.data
    
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices')
      const message = "success"
      alert(message)
    }
  })

  const {register, handleSubmit ,formState: {errors, isSubmitting}} = useForm({
    resolver: yupResolver(createInvoiceFormSchema),
  }) 

  
  const handleCreateInvoice: SubmitHandler<CreateInvoiceFormData > = async(data) => {
    
      const invoice = {
        ...data,
        Valor_Servicos: Number(String(data.Valor_Servicos).replace(/\D/g,"")),
        Valor_Nota: Number(String(data.Valor_Nota).replace(/\D/g,"")),
        Data_Faturamento: convertDate(data.Data_Faturamento),
        Data_Vencimento: convertDate(data.Data_Vencimento)
      }
      console.log(invoice)
    await createInvoice.mutateAsync(invoice)
    
  }

  return (
    <>
    <Box>
      <Header/>
      <Flex w='100%'  my='6' maxWidth={1840} mx='auto' px='6'>
        <SideMenu />
        <Box flex='1' borderEndRadius={8} bg='white' p='8' as='form' onSubmit={handleSubmit(handleCreateInvoice)}>
          <Heading>Nova Fatura</Heading>
          <Divider my='6' borderColor='gray.700'/>

          <VStack spacing="8" alignItems="start">
            <SimpleGrid columns={3} spacing="10" w="100%"> 
              <Input label="Sigla da Loja"error={errors.loja_Sigla} {...register("loja_Sigla")} name='loja_Sigla'  />
              <FormControl>
                <FormLabel>Loja</FormLabel>
              <Select
                focusBorderColor='yellow.100'
                bgColor="gray.200"
                variant="filled"
                _hover={{
                  bgColor: 'gray.100'
                }}
                size="lg"
              >
              {data.stores.map((stores:any) => {
                return (
                    <option value="" key={stores.is}>{stores.loja}</option>
                )
              })}
               </Select>
              </FormControl>
              <Input label="Número da Nota" error={errors.Nota_Fiscal} {...register("Nota_Fiscal")} name="Nota_Fiscal"/>
              <Input label="Valor do Serviço" mask={"currencyBr"} error={errors.Valor_Servicos} {...register("Valor_Servicos")} name="Valor_Servicos"/>
              <Input label="Valor da Nota" mask={"currencyBr"} error={errors.Valor_Nota} {...register("Valor_Nota")} name="Valor_Nota"/>
              <Input label="Vencimento" mask={"dateFormat"} error={errors.Data_Vencimento} {...register("Data_Vencimento")} name="Data_Vencimento"/>
              <Input label="Faturamento" mask={"dateFormat"} error={errors.Data_Faturamento} {...register("Data_Faturamento")} name="Data_Faturamento"/>
            </SimpleGrid>

            <Flex>
              <HStack spacing="4">
                
                <Button type='submit'colorScheme='green' size="lg" isLoading={isSubmitting}>
                  Salvar
                </Button>
                <Link href="/lojas/create" passHref>
                  <Button as='a'colorScheme='red' size="lg">Cancelar</Button>
                </Link>
                
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
    </>
  )
}
  
