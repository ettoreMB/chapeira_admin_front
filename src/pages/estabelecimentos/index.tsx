import { Box, Button, Center, useToast } from '@chakra-ui/react'

import Head from 'next/head'

import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '@components/Form/Input';
import { useMutation } from 'react-query';
import { queryClient } from "../../services/queryClient";
import { estabelecimentosApi } from '@services/api';


type SearchCNPJFormData = {
  cnpj: string;
}

const searchCnpjSchema = yup.object().shape({
  cnpj: yup.string().required('CNPJ Obrigatório')
})


export default function Home()   {
  const toast = useToast();

  const searchCnpj = useMutation(
    async (cnpj: SearchCNPJFormData) => {
      
        const {data: response} = await estabelecimentosApi.post("/search", cnpj)
        return response.data 
      
    },
    {
      onError: () => {
        toast({
          title: "Erro ao procurar Loja",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
        toast({
          title: "CNPJ ENCONTRADO",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  )


  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(searchCnpjSchema)
  })

  const handleSearchCNPJ: SubmitHandler<SearchCNPJFormData> = async(value) => {
    try {
      const cnpj = value;
      await searchCnpj.mutateAsync(cnpj);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Head>
        <title>Pesquisa de estabelecimentos</title>
      </Head>
      <Box
        flex="1"  
        as="form"
        onSubmit={handleSubmit(handleSearchCNPJ)}
      >
        <Center h='400px' w='100%' padding={'100'}>
          <Input type='text' {...register('cnpj')} error={errors.cnpj} placeholder='CNPJ'/>
          <Button ml='5px' bg='cyan.700' color='white' type="submit">
            Pesquisar
          </Button>
        </Center>
      </Box>
      
    </>
  )
}

