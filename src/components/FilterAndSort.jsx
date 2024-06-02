import {  Flex } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { VscListFilter } from "react-icons/vsc";
import { TfiExchangeVertical } from "react-icons/tfi";
const FilterAndSort = () => {
 function  SortProduct(){

 }
  return (
    <card>

    <Flex align="center" justify="flex-end" gap={10}>
      <ActionIcon variant='transparent' size='xl'>
              <VscListFilter
                style={{ width: "40%", height: "40%", color: "black" }}
              />
            </ActionIcon>
            <ActionIcon variant='transparent' size='xl' onClick={SortProduct()}>
              <TfiExchangeVertical
                style={{ width: "40%", height: "40%", color: "black" }}
              />
            </ActionIcon>
    </Flex>
    </card>
  );
};

export default FilterAndSort;
