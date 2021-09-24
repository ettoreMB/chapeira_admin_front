import {
  Flex,
  IconButton,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

import { useSideMenuDrawer } from "../../contexts/SideMenuDrawerContext";

export default function Header() {
  const { onOpen } = useSideMenuDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100"
      h="20"
      mx="auto"
      px="6"
      align="center"
      bg="blue.500"
      color="white"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      <Text>Chapeira ADM</Text>
    </Flex>
  );
}
