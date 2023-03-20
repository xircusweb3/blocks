import { Box, Heading } from "@chakra-ui/react";

export default function PublicLayout({ children }) {
  return (
    <Box>
      <Heading>Layout</Heading>
      {children}
    </Box>
  )
}