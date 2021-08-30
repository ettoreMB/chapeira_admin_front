import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SideMenuDrawerProvider } from '../contexts/SideMenuDrawerContext'
import { theme } from '../styles/theme'
import { queryClient } from '../services/queryClient'


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <SideMenuDrawerProvider>
        <Component {...pageProps} />
      </SideMenuDrawerProvider>
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
  
  )
}
export default MyApp
