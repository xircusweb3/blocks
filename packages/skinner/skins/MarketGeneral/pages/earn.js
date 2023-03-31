import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import { TbCopy } from 'react-icons/tb'
import { AppSpacer } from '../components/AppContainer'
import { OutlineCard } from '../components/Card'
import { PageHeading } from '../components/Typo'
import AppLayout from '../layouts/AppLayout'

export default function Earn() {

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.sm" py={50}>
        <PageHeading title="Earn" mb={4} />
        <OutlineCard title="Referral Code">
          <Text mb={2} fontWeight="bold" color="gray.500">As an ambassador</Text>
          <Text mb={2}>You can earn <b>4%</b> of listing fees and commissions from purchases by inviting <b>creators</b> to list and sell their NFTs in this marketplace</Text>
          <Text mb={8}>Copy your referral code and start spreading the word</Text>
          <Button size="lg" w="full" rightIcon={<TbCopy />}>Copy A5E456</Button>
        </OutlineCard>
      </Container>
    </AppLayout>
  )
}