import { Stack } from '@chakra-ui/react'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SideMenuNav() {
  return (
    <Stack spacing='12' align='flex-start'>
      <NavSection title='LOJAS'>
        <NavLink href='/lojas'>Lista de Lojas</NavLink>
        <NavLink href='/lojas/create'>Criar Loja</NavLink>
      </NavSection>
      <NavSection title='Faturas'>
        <NavLink href='/faturas'>lista de faturas</NavLink>
        <NavLink href='/faturas/create'>Criar Fatura</NavLink>
        <NavLink href='/faturas/import'>Importar Faturas</NavLink>
      </NavSection>
    </Stack>
  )
}
