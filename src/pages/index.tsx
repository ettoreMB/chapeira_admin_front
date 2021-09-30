import { Flex, Center, Box } from "@chakra-ui/react";

import Header from "../components/Header";
import { SideMenu } from "../components/SideMenu";
export default function Home() {
  return (
    <>
      <Header />
      <SideMenu />

      <Flex w="100%" my="6" maxWidth={1840} mx="auto" px="6">
        <Center>
          <h1>Sistema de Administração Chapeira</h1>
        </Center>
      </Flex>
    </>
  );
}
