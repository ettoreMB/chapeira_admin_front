import {
  useToast,
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  HStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { Input } from "@components/Form/Input";
import { Header } from "@components/Header";
import { SideMenu } from "@components/SideMenu";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

import { queryClient } from "../../services/queryClient";

type CreateStoreFormData = {
  Loja: string;
  Loja_Sigla: string;
  Loja_Endereco: string;
  Loja_Cidade: string;
  Loja_UF: string;
  CNPJ: number;
  Responsavel: string;
  Responsavel_Email: string;
  Responsavel_Telefone: string;
};

const createStoreFormSchema = yup.object().shape({
  Loja_Sigla: yup.string().required("Sigla Obrigátorio"),
  CNPJ: yup.number().required("CNPJ Obrigátorio"),
  Loja: yup.string().required("Nome Obrigátorio"),
  Loja_Endereco: yup.string().required("Endereço Obrigátorio"),
  Loja_Cidade: yup.string().required("Cidade Obrigátorio"),
  Loja_UF: yup
    .string()
    .max(2)
    .length(2)
    .uppercase()
    .required("Estado Obrigátorio"),
  Loja_Telefone: yup.string().uppercase().required("Telefone Obrigátorio"),
  Responsavel: yup.string().required("Nome Obrigátorio"),
  Responsavel_Email: yup.string().required("Email Obrigátorio"),
  Responsavel_Telefone: yup.string().required("Telefone Obrigátorio"),
});

export default function CreateStore() {
  const router = useRouter();
  const toast = useToast();

  const createStore = useMutation(
    async (store: CreateStoreFormData) => {
      const { data: response } = await api.post("/stores", store);
      return response.data;
      // console.log(store);
    },
    {
      onError: () => {
        toast({
          title: "Erro ao cadastrar Loja",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
        toast({
          title: "Loja Criada com Sucesso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.push("/lojas");
      },
    }
  );

  const { register,handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createStoreFormSchema),
  });

  const handleCreateStore: SubmitHandler<CreateStoreFormData> = async (
    values
  ) => {
    try {
      const store = values;
      await createStore.mutateAsync(store);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Header />
      <Flex w="100%">
        <SideMenu />
        <Box
          flex="1"
          h="90vh"
          borderEndRadius={8}
          bg="white"
          p="8"
          as="form"
          onSubmit={handleSubmit(handleCreateStore)}
        >
          <Heading textAlign="center">Criar Nova Loja</Heading>
          <Divider my="6" borderColor="gray.100" />

          <VStack spacing="8" alignItems="start">
            <SimpleGrid columns={3} spacing="10" w="100%">
              <Input
                label="Nome da loja"
                error={errors.Loja}
                {...register("Loja")}
              />
              <Input
                label="Sigla Loja"
                error={errors.Loja_Sigla}
                {...register("Loja_Sigla")}
                placeholder="Exemplo SP-PAULISTA"
              />
              <Input label="CNPJ" {...register("CNPJ")} />
            </SimpleGrid>

            <Input
              label="Endereço"
              error={errors.Loja_Endereco}
              {...register("Loja_Endereco")}
            />
            <SimpleGrid columns={4} spacing="10" w="100%">
              <Input
                label="cidade"
                error={errors.Loja_Cidade}
                {...register("Loja_Cidade")}
                w="50"
              />
              <Input
                label="UF"
                error={errors.Loja_UF}
                {...register("Loja_UF")}
                w="20"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Telefone Loja"
                error={errors.Loja_Telefone}
                {...register("Loja_Telefone")}
              />
              <Input
                label="Responsavel"
                error={errors.Responsavel}
                {...register("Responsavel")}
              />
              <Input
                label="Email"
                error={errors.Responsavel_Email}
                {...register("Responsavel_Email")}
              />
              <Input
                label="Contato"
                error={errors.Responsavel_Telefone}
                {...register("Responsavel_Telefone")}
              />
            </SimpleGrid>

            <Flex>
              <HStack spacing="4">
                <Button
                  type="submit"
                  colorScheme="green"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Salvar
                </Button>
                <Link href="/lojas/create" passHref>
                  <Button as="a" colorScheme="red" size="lg">
                    Cancelar
                  </Button>
                </Link>
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
