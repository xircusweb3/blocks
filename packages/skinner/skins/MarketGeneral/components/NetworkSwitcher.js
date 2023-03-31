import { Box, FormLabel, HStack, IconButton, Select, useColorMode } from "@chakra-ui/react"
import { useNetwork } from "@xircus-web3/react"
import { TbMoon, TbSun } from "react-icons/tb"

export const NetworkSwitcher = ({ ...rest }) => {
  const network = useNetwork()

  const handleChange = ({ target: { value } }) => {
    network.switchNetwork(value)
  }

  return (
    <Select maxW="200px" size="sm" rounded="md" onChange={handleChange} value={network.currentChainId} {...rest}>
      { network.chains.map(c => <option key={c.networkId} value={c.networkId}>{c.name}</option>) }
    </Select>
  )
}

export const NetworkSwitcherMobile = ({ ...rest }) => {
  const network = useNetwork()
  const { colorMode, toggleColorMode } = useColorMode()

  const handleChange = ({ target: { value } }) => {
    network.switchNetwork(value)
  }

  return (
    <HStack>
      <Select onChange={handleChange} value={network.currentChainId || 56} {...rest}>
        { network.chains.map(c => <option key={c.networkId} value={c.networkId}>{c.name}</option>) }
      </Select>
      <IconButton variant="ghost" onClick={toggleColorMode} icon={colorMode == 'dark' ? <TbSun /> : <TbMoon />} />      
    </HStack>
  )
}