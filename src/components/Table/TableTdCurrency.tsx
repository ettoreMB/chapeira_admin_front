import { Box, Td,  TextProps } from "@chakra-ui/react";

import NumberFormat from "react-number-format";
import { NumberInput } from "./NumberInput";

interface TableProps extends TextProps {
  data:  number 
}
export function TableTdCurrency({data}: TableProps) {
  return (
    <Td>
      <Box >
        
        <NumberFormat
          thousandsGroupStyle="thousand"
          value={data}
          prefix="R$"
          decimalSeparator="."
          type="text"
          thousandSeparator={true}
          customInput={NumberInput}
          allowNegative={true} />
      
      </Box>
    </Td>
  );
}
