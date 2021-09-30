import { useColorMode } from "@chakra-ui/core";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

interface StoreCardProps {
  data: any;
}

export function StoreCard({ data }: StoreCardProps) {
  return (
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
        <Heading fontSize="2xl" fontFamily={"body"}>
          Loja
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          Sigla
        </Text>
        <Box
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
        >
          <Text>Inicio 01/01/2020</Text>
          <Text>Estado</Text>
          <Text>Responsavel</Text>
          <Text>Email</Text>
          <Text>Endereço Loja</Text>
          <Text>https://chapeira.com.br/sigla-loja</Text>
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
            Notas 50
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
