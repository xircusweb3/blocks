import { Box, HStack, Spacer, Text } from "@chakra-ui/react"
import BoringAvatar from 'boring-avatars'

// for 
export const AssetBlock = () => {
  return (
    <Box>

    </Box>
  )
}

export const WalletBlock = ({ address, name, desc, children }) => {
  return (
    <HStack>
      <BoringAvatar />
      <Box>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{desc}</Text>        
      </Box>
      <Spacer />
      {children}
    </HStack>
  )
}

// for currencies with balance
export const CurrencyBlock = () => {
  return (
    <Box>

    </Box>
  )
}