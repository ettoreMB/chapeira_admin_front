import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SideMenuDrawerProviderProps {
  children: ReactNode;
}

type SideMenuDrawerContextData = UseDisclosureReturn;

const SieMenuDrawerContext = createContext({} as SideMenuDrawerContextData);

export function SideMenuDrawerProvider({
  children,
}: SideMenuDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SieMenuDrawerContext.Provider value={disclosure}>
      {children}
    </SieMenuDrawerContext.Provider>
  );
}

export const useSideMenuDrawer = () => useContext(SieMenuDrawerContext);
