import { Box, Skeleton, HStack, Spacer, useColorModeValue as mode } from "@chakra-ui/react";

export const ItemFeatSkeleton = () => (
  <Box borderWidth={1} p={4} rounded="lg" borderColor={mode('gray.100', 'gray.900')}> 
    <Skeleton h="200px" w="full" mb={4} />
    <Skeleton h="20px" maxW="160px" mb={2} />
    <Skeleton h="16px" w="80px" mb={2} />
    <Skeleton h="16px" w="full" mb={2} />    
    <HStack>
      <Skeleton h="32px" w="full" maxW="140px" />
      <Spacer />
      <Skeleton h="32px" w="full" maxW="50px" />          
    </HStack>
  </Box>
)

