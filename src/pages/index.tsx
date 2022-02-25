import { Flex, Center, Box } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { SideMenu } from "@components/SideMenu";
export default function Home() {
  return (
    <>
      <Header />
      <SideMenu />
        <Box flex="1" bg="white" p="8" minH="90vh">
          <Center>
            <h1>Sistema de Administração Chapeira</h1>
          </Center>
        </Box>
    </>
  );
}
