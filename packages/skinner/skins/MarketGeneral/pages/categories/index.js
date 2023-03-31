import { Text, Heading, Container } from '@chakra-ui/react'
import { AppSpacer } from '../../components/AppContainer'
import { PageHeading } from '../../components/Typo'
import AppLayout from '../../layouts/AppLayout'

export default function Categories() {
  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl">
        <PageHeading title="Categories" />
      </Container>      
    </AppLayout>
  )
}