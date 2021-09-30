import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface GetStoreModalProviderProps {
  children: ReactNode;
}

type GetStoreModalContextData = UseDisclosureReturn;

const storeModalContext = createContext({} as GetStoreModalContextData);

export function GetStoreModalProvider({
  children,
}: GetStoreModalProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <storeModalContext.Provider value={disclosure}>
      {children}
    </storeModalContext.Provider>
  );
}

export const useGetStoreModal = () => useContext(storeModalContext);
