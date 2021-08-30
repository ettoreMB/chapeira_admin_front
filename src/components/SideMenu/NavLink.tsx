import { Link as ChakraLink, LinkProps as ChakralinkProps} from '@chakra-ui/react'
import {ReactElement} from 'react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends ChakralinkProps {
  children: string;
  href: string;
}
export function NavLink({children, href, ...rest}:NavLinkProps) {
  return (
    <ActiveLink href={href} passHref shouldMatchExactHref={true}>
      <ChakraLink display='flex' align='center' {...rest}>
        {children}
      </ChakraLink>
    </ActiveLink>
    
    );
  }