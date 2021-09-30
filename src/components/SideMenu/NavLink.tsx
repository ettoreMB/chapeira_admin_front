import {
  Link as ChakraLink,
  LinkProps as ChakralinkProps,
  Flex,
} from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakralinkProps {
  children: string;
  href: string;
}
export function NavLink({ children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref shouldMatchExactHref={true}>
      <ChakraLink
        display="flex"
        marginTop="2"
        style={{ textDecoration: "none" }}
        {...rest}
      >
        <Flex
          align="center"
          p="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
        >
          {children}
        </Flex>
      </ChakraLink>
    </ActiveLink>
  );
}
