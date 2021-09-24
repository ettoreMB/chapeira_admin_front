import { Text, Box, Center, GridItem, Icon, Flex } from "@chakra-ui/react";
import { IconType } from "react-icons";

type InfoSmallCardProps = {
  title: string;
  value: any;
  bgcolor?: string;
  width?: string;
  icon: IconType;
};
export function InfoSmallCard({
  title,
  value,
  bgcolor,
  width,
  icon,
}: InfoSmallCardProps) {
  return (
    <GridItem
      bg={bgcolor ? bgcolor : "gray.300"}
      colSpan={{ lg: 1, sm: 1 }}
      borderRadius="10"
      w={width ? width : "180px"}
    >
      <Center align="center" flexDirection="column">
        <Flex
          width="100%"
          justify="space-between"
          paddingX="4"
          alignItems="auto"
        >
          <Text fontSize="26" fontWeight="bold" color="white" mb="2">
            {title}
          </Text>
          <Box paddingTop="1">
            <Icon color="white" boxSize={8} as={icon} />
          </Box>
        </Flex>

        <Box fontSize="50" fontWeight="bold" color="gray.50" height="80%">
          {value}
        </Box>
      </Center>
    </GridItem>
  );
}
