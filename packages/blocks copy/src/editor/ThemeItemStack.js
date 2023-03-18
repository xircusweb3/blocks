import { HStack, Text, Spacer } from '@chakra-ui/react'

export const ThemeItemStack = ({ name, children }) => (
  <HStack>
    <Text color="gray.500" fontSize="sm">{name}</Text>
    <Spacer />
    <HStack>
    { children }
    </HStack>
  </HStack>
)