import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Select,
  Spinner,
  Text
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { LoadingError } from "@components/LoadingError";
import { SideMenu } from "@components/SideMenu";
import { StoreAccordion } from "@components/Table/StoreAccordion";
import { IStoreDto, Store } from "@services/hooks/Dtos/StoreDto";
import { useGetStores } from "@services/hooks/stores/stores.service";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";


export default function LojasIndex() {

  const { data, isLoading, error } = useGetStores();
  const [isActive, setIsActive] = useState(false);
  const [isNotActive, setIsNotActive] = useState(false);
  const [status, setStatus] = useState({
    active: false,
    inactive: false,
  })

  let stores = data?.stores.filter((store: Store) => {
    if (status.active) {
      return store.ativo == 'Sim';
    } else if(status.inactive) {
      return store.ativo == 'Nao';
    }
      return data.stores;
  });

  return (
    <>
      <Header />
      <Flex w="100%">
        <SideMenu />
        <Box flex="1" bg="white" p="8">
          <Flex mb="8" align="center" justifyContent="space-between">
            <Heading size="lg" fontWeight="normal">
              Lojas
            </Heading>

            <Link href="/lojas/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Nova Loja
              </Button>
            </Link>
          </Flex>
          <Flex>
            <Select
              w='60'
              onChange={(e) => {
                if (e.target.value === "Sim") {
                  setStatus({...status, active: true })
                }
                if (e.target.value === "Nao") {
                  setStatus({...status, active: false, inactive: true })
                }
                if (e.target.value === "") {
                  setStatus({...status, active: false, inactive: false})
                }
                return data
              }}
              >
                <option value="">Status</option>
                <option value="Sim">Ativos</option>
                <option value="Nao">Inativas</option>
            </Select>
            <Input type="text" />
          </Flex>
         
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <LoadingError text={"Error Ao Carregar os Dados"} />
          ) : (
            <>
             {stores.map((store: Store) => {
                return <StoreAccordion stores={store} key={store.id} />;
              })}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
