import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  Text,
  Box,
  Center,
  useColorModeValue,
  Button,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useGetStoreModal } from "../../contexts/GetStoreModalContext";

type StoreProps = {
  data: {
    id: number;
    Loja: string;
    Loja_Sigla: string;
    CNPJ: number;
    Loja_Cidade: string;
    Loja_UF: string;
    ativo: boolean;
    Responsavel: string;
    Responsavel_Email: string;
    Loja_Endereco: string;
    URL: string;
    faturamento_inicio: Date;
  };
};

export function GetStoreModal({ data }: StoreProps) {
  const { isOpen, onClose } = useGetStoreModal();
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <Center py="6">
          <Box
            p="6"
            maxWidth={380}
            w="full"
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            textAlign="center"
            rounded="lg"
          >
            <Heading fontSize="4xl" fontFamily={"body"} mb={1}>
              {data.Loja}
            </Heading>

            <Text>Sigla:</Text>
            <Text fontWeight={600} color={"gray.500"} mb={2}>
              {data.Loja_Sigla}
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
                  <Text>{data.Loja_UF}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Cidade:</Text>
                  <Text>{data.Loja_Cidade}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Responsavel:</Text>
                  <Text>{data.Responsavel}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Email:</Text>
                  <Text>{data.Responsavel_Email}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Endereço:</Text>
                  <Text>{data.Loja_Endereco}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Link:</Text>
                  <Link href={data.URL ? data.URL : ""} isExternal>
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
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={() => router.push(`/lojas/${data.Loja_Sigla}`)}
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
                onClick={() => router.push(`/faturas/${data.Loja_Sigla}`)}
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
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  );
}
