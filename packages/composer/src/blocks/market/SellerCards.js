import { Box, Heading, HStack, Text } from "@chakra-ui/react"
import Avatar from "boring-avatars"

export const SellerCard = ({ variant = 'pixel', theme }) => {
  return (
    <HStack p={2} {...theme?.sellerCard}>
      <Avatar boxSize={30} variant={variant} {...theme?.sellerAvatar} />
      <Box {...theme?.sellerContent}>
        <Heading size="sm" {...theme?.sellerName}>username</Heading>
        <Text fontSize="xs" color="gray.500" {...theme?.sellerText}>$33,669.747</Text>
      </Box>
    </HStack>
  )
}