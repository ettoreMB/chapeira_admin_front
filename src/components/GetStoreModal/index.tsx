import {
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  Text,
} from "@chakra-ui/react";
import { getStore } from "@services/hooks/stores/stores.service";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { useGetStoreModal } from "../../contexts/GetStoreModalContext";

export function GetStoreModal(loja: string) {
  const { isOpen, onClose } = useGetStoreModal();
  const { isLoading } = useQuery<any, Error>(["store", loja], () =>
    getStore(loja)
  );
  const router = useRouter();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <Center py="6"></Center>
      </ModalContent>
    </Modal>
  );
}
