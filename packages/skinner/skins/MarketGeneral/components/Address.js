import { HStack, IconButton } from "@chakra-ui/react"
import { TbExternalLink } from "react-icons/tb"
import { shortAddr } from "../hooks/utils"

export const AddressLink = (addr) => {

  return (
    <HStack>
      <Text>{shortAddr(addr)}</Text>
      <IconButton icon={<TbExternalLink />} />
    </HStack>
  )
}