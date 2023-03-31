import { Box, Heading, HStack, Spacer, Text, useColorModeValue as mode } from '@chakra-ui/react'
import BoringAvatar from 'boring-avatars'
import { CopyAddress } from './Copy'

export const Card = ({ title, children, ...rest }) => (
  <Box bg={mode('gray.100', '#000')} p={4} rounded="md" {...rest}>
    { title && <Heading size="sm" mb={4} color="gray.500">{title}</Heading> }
    { children }
  </Box>
)

export const OutlineCard = ({ title, label, children, ...rest }) => (
  <Box borderWidth={1} borderColor={mode('gray.50', 'gray.900')} p={4} rounded="md" {...rest}>
    {title && <Heading size="sm" mb={4}>{title}</Heading>}
    {children}
  </Box>
)

export const WalletCard = ({ address, name, label, children }) => (
  <HStack>
    <BoringAvatar name={address} variant="beam" size={34} />
    <Box>
      <CopyAddress address={address} pos="right" />
      { label && <Text>{label}</Text> }
    </Box>
    <Spacer />
    { children }
  </HStack>
)