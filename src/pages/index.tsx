import { Flex, Center, Box } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
export default function Home() {
  return (
    <>
      <Header />
      <Flex w="100%">
        <SideMenu />
        <Box flex="1" borderEndRadius={8} bg="white" p="8">
          <Center>
            <h1>Sistema de Administração Chapeira</h1>
          </Center>
        </Box>
      </Flex>
    </>
  );
}
