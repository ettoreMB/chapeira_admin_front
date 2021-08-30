import Header from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import {Flex, Center} from '@chakra-ui/react'
export default function Home() {
  return (
    <>
      <Header />
        <Flex w='100%'  my='6' maxWidth={1840} mx='auto' px='6'>
          <SideMenu />
            <Center>
              <h1>Sistema de Administração Chapeira</h1>
            </Center>   
          </Flex>
    </>
  )
}
