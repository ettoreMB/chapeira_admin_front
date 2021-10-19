import {
  Box,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import { Store } from "@services/hooks/Dtos/StoreDto";
import { getStore } from "@services/hooks/stores/stores.service";
import { queryClient } from "@services/queryClient";
import Link from "next/link";
import router from "next/router";

interface StoreTableRowProps {
  stores: Store;
}

export function StoreAccordion({ stores }: StoreTableRowProps) {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
            <Box flex="1" textAlign="left">
              {stores.loja_sigla}
            </Box>
            <Box flex="1" textAlign="left">
              {stores.responsavel}
            </Box>
            <Box flex="1" textAlign="left">
              {stores.responsavel_email}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text fontSize="2xl" fontFamily={"body"} mb={1}>
            {stores.loja}
          </Text>

          <HStack spacing={10} mb="4">
            <Box>
              <Text fontWeight={600}>Sigla:</Text>
              <Text color={"gray.500"} mb={2}>
                {stores.loja_sigla}
              </Text>
            </Box>
            <Box>
              <Text fontWeight={600}>CNPJ:</Text>
              <Text color={"gray.500"} mb={4}>
                {stores.cnpj}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Inicio:</Text>
              <Text>{stores.inicio}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Responsavel:</Text>
              <Text>{stores.responsavel}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Email:</Text>
              <Text>{stores.responsavel_email}</Text>
            </Box>
          </HStack>
          <HStack spacing={10} mb="4">
            <Box>
              <Text fontWeight="bold">Estado:</Text>
              <Text>{stores.uf}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Cidade:</Text>
              <Text>{stores.cidade}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Endereço:</Text>
              <Text>{stores.endereco}</Text>
            </Box>
          </HStack>

          <HStack mb="4">
            <Box>
              <Text fontWeight="bold">Link:</Text>
              <ChakraLink>
                <Link href={stores.url ? stores.url : ""}>
                  <Text>{stores.url}</Text>
                </Link>
              </ChakraLink>
            </Box>
          </HStack>

          <Button
            onClick={async () => {
              router.push(`/lojas/${stores.loja_sigla}`);
            }}
            onMouseEnter={async () => {
              await queryClient.prefetchQuery(
                ["store", stores.loja_sigla],
                () => getStore(stores.loja_sigla),
                {
                  staleTime: 10 * 1000, // only prefetch if older than 10 seconds
                }
              );
            }}
            width={500}
            rounded={"full"}
            fontSize="sm"
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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
