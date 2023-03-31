import { Box, Button, Container, Grid, VStack, Heading, HStack, Spacer, Select } from "@chakra-ui/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { NetworkSwitcher } from "../components/NetworkSwitcher"

const SettingLink = ({ href = '#', children }) => (
  <NextLink href={href}>
    <Heading 
      size="md" 
      _hover={{ textDecoration: 'none', color: '#fff' }} 
      color={href == useRouter().asPath ? '#fff' : 'gray.500'}>
      {children}
    </Heading>
  </NextLink>
)

export const SettingLayout = ({ title, children }) => {

  return (
    <Container maxW="container.lg" mt={8}>
      <HStack mb={12}>
        <Heading size={{ base: 'md', md: 'lg' }}>{title}</Heading>
        <Spacer />
        <NetworkSwitcher />
      </HStack>
      <Grid templateColumns={{ base: 'auth', sm: 'auto', md: '200px auto' }}>
        <VStack align="start" gap={2} display={{ base: 'none', sm: 'none', md: 'flex' }}>
          <SettingLink href="/settings/account">Account</SettingLink>
          <SettingLink href="/settings/wallets">Wallets</SettingLink> 
          <SettingLink href="/settings/assets">Assets</SettingLink>          
          <SettingLink href="/settings/listings">Listings</SettingLink>                    
        </VStack>
        <Box>
          {children}
        </Box>
      </Grid>
    </Container>
  )
}
