import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { GetStoreModalProvider } from "../contexts/GetStoreModalContext";
import { SideMenuDrawerProvider } from "../contexts/SideMenuDrawerContext";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <GetStoreModalProvider>
          <SideMenuDrawerProvider>
            <Component {...pageProps} />
          </SideMenuDrawerProvider>
        </GetStoreModalProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;
