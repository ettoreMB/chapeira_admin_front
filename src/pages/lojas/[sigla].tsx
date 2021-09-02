import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Button,
  HStack,
  Link,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

import Header from "../../components/Header";
import { SideMenu } from "../../components/SideMenu";

import { useRouter } from "next/router";
import { useStores } from "../../services/hooks/useStores";
import React from "react";
import { Input } from "../../components/Form/Input";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { Mutation } from "react-query/types/core/mutation";
import { ToastExample } from "../../components/AlertBox";

interface storeProps {
  sigla: string;
}

export default function Store() {
  const router = useRouter();
  const { sigla } = router.query;
  const { data, isLoading, error } = useStores(sigla as string);

  const deleteStore = useMutation( async () => {
    await api.delete(`/stores/${sigla}`)
  }, {
    onSuccess: () => {
      ToastExample()
      router.push(`/lojas`)
    }
  })

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1840} mx="auto" px="6" borderRadius="8">
        <SideMenu />
        <Box flex="1" borderEndRadius={8} bg="white" p="8">
          <Heading textAlign="center">Loja</Heading>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Text>Houve um erro</Text>
          ) : (
            <>
              <VStack spacing="8" alignItems="start">
                <SimpleGrid columns={3} spacing="10" w="100%">
                  <Input
                    label="Nome da loja"
                    name="loja"
                    defaultValue={data.Loja}
                  />
                  <Input
                    label="Sigla Loja"
                    name="loja_sigla"
                    defaultValue={data.Loja_Sigla}
                  />
                  <Input label="CNPJ" name="CNPJ" defaultValue={data.CNPJ} />
                </SimpleGrid>

                <Input
                  label="Endereço"
                  name="endereco"
                  defaultValue={data.Loja_Endereco}
                />
                <SimpleGrid columns={4} spacing="10" w="100%">
                  <Input
                    label="cidade"
                    name="cidade"
                    w="50"
                    defaultValue={data.Loja_Cidade}
                  />
                  <Input
                    label="UF"
                    name="loja_uf"
                    w="20"
                    defaultValue={data.loja_uf}
                  />
                </SimpleGrid>

                <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                  <Input
                    label="Telefone Loja"
                    name="telefone"
                    defaultValue={data.Loja_Telefone}
                  />
                  <Input
                    label="Responsavel"
                    name="responsavel"
                    defaultValue={data.Responsavel}
                  />
                  <Input
                    label="Email"
                    name="responsavel_email"
                    defaultValue={data.Responsavel_Email}
                  />
                  <Input
                    label="Contato"
                    name="contato"
                    defaultValue={data.Responsavel_Telefone}
                  />
                </SimpleGrid>

                <Flex>
                  <HStack spacing="4">
                    <Button type="submit" colorScheme="green" size="lg">
                      Salvar
                    </Button>
                    <Button type="submit" colorScheme="red" size="lg" onClick={() => {deleteStore.mutate(data.Loja_Sigla)}}>
                      Excluir
                    </Button>
                    <Link href="/lojas" passHref>
                      <Button as="a" colorScheme="yellow" size="lg">
                        Cancelar
                      </Button>
                    </Link>
                  </HStack>
                </Flex>
              </VStack>
            </>
          )}

          <Flex></Flex>
        </Box>
      </Flex>
    </Box>
  );
}
