import {
  Box,
  Flex,
  Heading,
  Divider,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { SideMenu } from "@components/SideMenu";
import { api } from "@services/api";
import { useForm } from "react-hook-form";

interface FileProps {
  data: File;
}

export default function ImportInvoice() {
  // const createFile = useMutation( async (data: FileProps ) => {
  //   const {data: response} = await api.post('/invoices/import', data)

  //   return response.data
  // },
  //  {
  //   onSuccess: () => {
  //     const message = "success"
  //     alert(message)
  //   }
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSendFile = async (data: any) => {
    const file = new FormData();
    file.append("file", data.file[0]);

    await api.post("/invoices/import", file);
  };
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1840} mx="auto" px="6">
        <SideMenu />

        <Box flex="1" borderEndRadius={8} bg="white" p="8">
          <Heading>Importar Arquivo de Faturas</Heading>

          <Divider my="6" borderColor="gray.700" />
          <Box
            color="gray.500"
            w="80%"
            m="auto"
            bg="gray.100"
            borderRadius="8"
            p="2"
            mb="10"
          >
            <VStack spacing="2" alignItems="flex-start">
              <Text fontWeight="bold">
                Selecione um arquivo .csv para ser importado
              </Text>
              <Text>
                O Arquivo deve estar com os dados nos seguintes posicionamentos
              </Text>
              <Text>
                Loja_Sigla, Numero da Fatura, Valor da Nota(EM CENTAVOS), Valor
                dos seviços(EM CENTAVOS), Data de Vencimento, Data da emição
              </Text>
              <Text fontWeight="bold">Exemplo:</Text>

              <Box
                bg="white"
                borderRadius="8"
                p="2"
                fontWeight="bold"
                color="gray.300"
                w="100%"
                borderColor="yellow.400"
                borderWidth={2}
              >
                <Text>SP-SP, 001, 5000, 5500, 01/02/2021, 20/03/2021 </Text>
                <Text>MG-BH, 002, 5000, 5500, 01/02/2021, 20/03/2021 </Text>
              </Box>
            </VStack>
          </Box>
          <Flex flexDir="column" align="center" justify="center">
            <Box as="form" onSubmit={handleSubmit(handleSendFile)}>
              <input type="file" {...register("file")} />
              <Button type="submit">Enviar</Button>
            </Box>
            <label />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
