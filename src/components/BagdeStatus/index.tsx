import { Badge, Icon } from "@chakra-ui/react"
import { InvoiceStatus } from "@services/hooks/Dtos/InvoiceDto"
import { MdDone, MdClose, MdDoNotDisturb } from "react-icons/md"
export function GreenStatus() {
  return (
    <Badge
    colorScheme="green"
    >
      <Icon as={MdDone}/>
    </Badge>
  )
}

export function GrayStatus() {
  return (
    <Badge 
      colorScheme="gray"
    >
      <Icon as={MdDoNotDisturb}/>
    </Badge>
  )
}

export function RedStatus() {
  return (
    <Badge
      colorScheme="red"
    >
      <Icon as={MdClose}/>
    </Badge>
  )
}

export const  InvoiceStatusBadge = ({status} : {status: InvoiceStatus}) => {
  switch(status as any) {
    case "Pago":
    case "pago":
    case true:
      case InvoiceStatus.pago:
      return <GreenStatus />
    case false:
      return <RedStatus />
  }
}