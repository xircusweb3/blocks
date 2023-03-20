import { Box, Heading } from "@chakra-ui/react";
import { Fonts } from "../../../src/component/Head";

export default function PublicLayout({ children }) {
  return (
    <Box>
      <Fonts />
      <Heading>Layout</Heading>
      {children}
    </Box>
  )
}