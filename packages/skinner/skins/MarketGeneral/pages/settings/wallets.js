import { Box, Heading, Button, useColorModeValue as mode, HStack, Text, IconButton, Grid, Input } from '@chakra-ui/react'
import { useNetwork, useProviderHelper, useWallet } from '@xircus-web3/react'
import { useEffect, useMemo, useState } from 'react'
import { AppSpacer } from '../../components/AppContainer'
import { OutlineCard, WalletCard } from '../../components/Card'
import { FormInput, FormSelect } from '../../components/Form'
import AppLayout from '../../layouts/AppLayout'
import { SettingLayout } from '../../layouts/SettingLayout'

// Listed and purchased items
export default function MyWallets() {
  const wallet = useWallet()
  const helper = useProviderHelper() 
  const [markets, setMarkets] = useState([])
  const [credits, setCredits] = useState(0)
  const [recipient, setRecipient] = useState('')

  useEffect(() => {
    loadMarkets()
  }, [wallet.account])

  const loadMarkets = async() => {
    if (wallet.account) {
      const markets = await helper.getMarketContracts()
      setMarkets(markets)
    }
  }

  const handleChange = async({ target: { value: marketAddr } }) => {
    if (marketAddr && wallet.account) {
      setCredits(await helper.getCredits(marketAddr, wallet.account))
    } else {
      setCredits(0)
    }
  }

  const options = useMemo(() => (markets || []).filter(m => helper.isSameNetwork(m.chain)).map(m => ({ label: `${m.name} ${m.address}`, value: m.address })), [markets])

  return (
    <AppLayout>
      <AppSpacer />
      <SettingLayout title="Wallet">
        <Box mb={4}>
          <Heading size="md" mb={2}>Manage Wallets</Heading>        
          <Heading size="xs" color="gray.500">Manage credit listing on your wallets</Heading>
        </Box>
        <OutlineCard mb={4}>
          <FormSelect options={options} onChange={handleChange} control={{ mb: 6 }} />
          <WalletCard address={wallet.account}>
            <Text mr={8}>Credits: <b>{credits}</b></Text>
          </WalletCard>
        </OutlineCard>
        <OutlineCard title="Top Up Credits" mb={4}>
          <Grid>

          </Grid>
        </OutlineCard>
        <OutlineCard title="Transfer Credits">
          <HStack>
            <Input placeholder="Recipient Address" />
            <Input placeholder="Credits" maxW="200px" />
            <Box>
              <Button>Transfer</Button>
            </Box>            
          </HStack>
        </OutlineCard>
      </SettingLayout>
    </AppLayout>
  )
}