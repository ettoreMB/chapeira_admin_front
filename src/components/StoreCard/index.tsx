import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";

import { InfoSmallCard } from "./InfoSmallCard";
type IDataProps = {
  data: {
    Loja: string;
    Loja_Sigla: string;
    Ativo: boolean;
    CNPJ: number;
    Responsavel: string;
    Responsavel_Email: string;
    Loja_Cidade: string;
    Loja_Endereco: string;
    Loja_UF: string;
    Razao_social: string;
  };
};

export function StoreCard({ data }: IDataProps) {
  return (
    <Grid
      height="160px"
      templateColumns={{ lg: "repeat(6, 1fr)", sm: "repeat(1, 1fr)" }}
      gap={4}
    >
      <GridItem
        bg="yellow.300"
        minW="300"
        colSpan={{ lg: 2, sm: 1 }}
        borderRadius="10"
        w="400px"
      >
        <Box width="100%">
          <Text fontSize="20" fontWeight="bold" color="white" mb="2">
            Titulo
          </Text>
        </Box>
      </GridItem>

      <InfoSmallCard
        title={"Faturas"}
        value={data.Loja}
        bgcolor={"blue.300"}
        icon={MdSettings}
      />

      <InfoSmallCard
        title={"Faturas"}
        value={data.CNPJ}
        bgcolor={"green.300"}
        icon={MdSettings}
      />

      <InfoSmallCard title={"Faturas"} value={10} icon={MdSettings} />

      <InfoSmallCard
        title={"Faturas"}
        value={10}
        bgcolor={"red.300"}
        icon={MdSettings}
      />
    </Grid>
  );
}
