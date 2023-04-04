import { Select } from "@chakra-ui/react"
import { useNetwork } from '@xircus-web3/react'

export const ChainSelection = ({  }) => {
  const network = useNetwork()

  return (
    <Select>
      <option></option>
    </Select>
  )
}