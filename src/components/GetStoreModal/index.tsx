import {
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  useColorModeValue,
  Button,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { IStoreDto } from "@services/hooks/Dtos/StoreDto";
import { getStore, useGetStore } from "@services/hooks/stores/stores.service";
import { queryClient } from "@services/queryClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { useGetStoreModal } from "../../contexts/GetStoreModalContext";

export function GetStoreModal(loja: string) {
  const { isOpen, onClose } = useGetStoreModal();
  const { isLoading, isError, data } = useQuery<any, Error>(
    ["store", loja],
    () => getStore(loja)
  );
  const router = useRouter();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <Center py="6">
          <Text>{JSON.stringify(data)}</Text>
          {/* <Box
            p="6"
            maxWidth={380}
            w="full"
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            textAlign="center"
            rounded="lg"
          >
            <Heading fontSize="4xl" fontFamily={"body"} mb={1}>
              {data.loja}
            </Heading>

            <Text>Sigla:</Text>
            <Text fontWeight={600} color={"gray.500"} mb={2}>
              {data.loja_sigla}
            </Text>

            <Text>CNPJ:</Text>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {data.CNPJ}
            </Text>
            <Box
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
            >
              <Stack spacing="4">
                <Box fontWeight="bold">
                  <Text>Inicio:</Text>
                  <Text>{data.faturamento_inicio}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Estado:</Text>
                  <Text>{data.uf}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Cidade:</Text>
                  <Text>{data.Loja_Cidade}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Responsavel:</Text>
                  <Text>{data.responsavel}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Email:</Text>
                  <Text>{data.responsavel_email}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Endereço:</Text>
                  <Text>{data.Loja_Endereco}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Link:</Text>
                  <Link href={data.URL ? data.URL : ""}>
                    <Text>{data.URL}</Text>
                  </Link>
                </Box>
              </Stack>
            </Box>

            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"yellow.400"}
                color={"white"}
                onClick={() => router.push(`/lojas/${data.loja_sigla}`)}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Editar
              </Button>
            </Stack>
            <Stack mt={4} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"yellow.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "yellow.500",
                }}
                _focus={{
                  bg: "yellow.500",
                }}
              >
                Faturamento
              </Button>
            </Stack>
          </Box> */}
        </Center>
      </ModalContent>
    </Modal>
  );
}
