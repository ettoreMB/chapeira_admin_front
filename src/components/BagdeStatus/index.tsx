import {  Icon, Flex, Td, Badge, Box } from "@chakra-ui/react"

import { MdDone, MdClose, MdDoNotDisturb } from "react-icons/md"


interface StatusProps  {
  status: boolean;
}

export function PaidStatus() {
  return (
    <Td>
      <Flex>
        <Badge
          size="xsm"
          fontSize="sm"
          colorScheme="green"
          >
          <Icon as={MdDone}/>
        </Badge>
      </Flex>
    </Td>
  )
}

export function UnPaidStatus() {

  return (
    <Td>
      <Flex>
        <Badge
          size="xsm"
          fontSize="sm"
          colorScheme="red">
            <Icon as={MdClose}/>
        </Badge>
      </Flex>
    </Td>
  )
}

export function InvoiceStatusBadge({status }: StatusProps) {
  switch(status ) {
    case true:
      return (<PaidStatus />)
    case false:
      return (<UnPaidStatus />)
  }
}