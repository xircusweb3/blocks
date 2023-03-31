import { Box, Container } from '@chakra-ui/react'
import { AppSpacer } from '../../components/AppContainer'
import AppLayout from '../../layouts/AppLayout'

export default function Category() {

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl">
        <Heading>Category</Heading>
      </Container>      
    </AppLayout>
  )
}