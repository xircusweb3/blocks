import { Box, Container, Heading } from '@chakra-ui/react'
import { AppSpacer } from '../components/AppContainer'
import { PageHeading } from '../components/Typo'
import AppLayout from '../layouts/AppLayout'

export default function Tokens() {

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl">
        <PageHeading title="Tokens" />
      </Container>
    </AppLayout>
  )
}