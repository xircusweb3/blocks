import { 
  Box, 
  Heading, 
  useColorModeValue as mode
} from '@chakra-ui/react'

export const OutlineCard = ({ title, label, children, ...rest }) => (
  <Box borderWidth={1} borderColor={mode('gray.200', 'gray.900')} p={4} rounded="md" {...rest}>
    {title && <Heading size="sm" mb={4}>{title}</Heading>}
    {children}
  </Box>
)