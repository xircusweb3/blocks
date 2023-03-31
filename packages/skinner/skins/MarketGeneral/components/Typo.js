import Link from 'next/link'
import { Box, HStack, Spacer, IconButton, Heading, Text, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import { IoArrowBack, IoMenu } from 'react-icons/io5'

export const PageHeading = ({ href = '#', title = 'DASHBOARD', label, size = 'md', children, ...rest }) => (
  <Stack direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} {...rest}>
    <HStack>
      {
        href != '#' && (
          <Link href={href} passHref>
            <IconButton icon={<IoArrowBack fontSize={16} />} variant="ghost" size="sm" borderRadius="full" />
          </Link>
        )
      }
      <Box>
        <Heading size={size} letterSpacing={2} variant="primary" bgGradient="linear(to-l, #8a2387, #e94057, #f27121)" bgClip="text" textTransform="uppercase">{title}</Heading>
        { label && <Text fontSize="xs" fontWeight="bold" color="gray.500">{label}</Text> }      
      </Box>
    </HStack>
    <Spacer />
    {children}
  </Stack>
)