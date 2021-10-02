import { Box, Td, Text, TextProps } from "@chakra-ui/react";

interface TableProps extends TextProps{
  data: any;
}
export function TableTdText({ data }: TableProps) {
  return (
    <Td>
      <Box>
        <Text fontWeight="bold">{data}</Text>
      </Box>
    </Td>
  );
}
