import { Box, Container, Grid } from '@chakra-ui/react'
import { useWalletAuth } from '@xircus-web3/react'
import { AppSpacer } from '../../components/AppContainer'
import AppLayout from '../../layouts/AppLayout'

// Account Profile

export default function MyProfile() {
  const auth = useWalletAuth()

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.md">
        
      </Container>
    </AppLayout>
  )
}