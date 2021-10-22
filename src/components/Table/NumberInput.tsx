import { Box, Td, Text, TextProps } from "@chakra-ui/react";

interface TableProps extends TextProps {
  value: string | number | Date;
}
export function NumberInput({value}: TableProps) {
  return (
    <Text fontWeight="bold">{value}</Text>
  );
}
