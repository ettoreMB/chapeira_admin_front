import {
  Box,
  Drawer,
  useBreakpointValue,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { useSideMenuDrawer } from "../../contexts/SideMenuDrawerContext";
import { SideMenuNav } from "./SideMenuNav";

export function SideMenu() {
  const { isOpen, onClose } = useSideMenuDrawer();

  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="white" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SideMenuNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      <SideMenuNav />
    </Box>
  );
}
