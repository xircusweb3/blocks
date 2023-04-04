import { ChakraProvider, Box, Heading, Spinner, Center, HStack, Text } from "@chakra-ui/react"
import { GradientLoader } from "../components/GradientLoader"

export const XircusLoader = () => {
  return (
    <ChakraProvider>
      <Box pos="relative">
        <GradientLoader h={2} />
        <Center h="90vh">
          <Box>
            <HStack>
              <Spinner size="xs" mr={2} />
              <Heading size="sm">Initializing Web3 App</Heading>
            </HStack>
          </Box>
        </Center>
        <Box pos="absolute" bottom={0} left={0} w="full">
          <Text textAlign="center" fontSize={12} mb={2} color="gray.500">Powered by <b>Xircus</b></Text>
        </Box>
      </Box>   
    </ChakraProvider>
  )
}