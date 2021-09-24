import { Button, Flex, Link } from "@chakra-ui/react";

interface ILoadingError {
  text: string;
}

export default function LoadingError({ text }: ILoadingError) {
  return (
    <Flex justify="center">
      <Link href="/">
        <Button colorScheme="yellow" size="lg">
          {text}
        </Button>
      </Link>
    </Flex>
  );
}
