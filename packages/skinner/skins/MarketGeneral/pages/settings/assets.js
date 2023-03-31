import { Box, Button, Heading, HStack, List, ListItem, Text, Spacer, Spinner, useColorModeValue as mode } from '@chakra-ui/react'
import { useProviderHelper, useWallet } from '@xircus-web3/react'
import { useEffect, useState } from 'react'
import { AppSpacer } from '../../components/AppContainer'
import { AssetFormInput } from '../../components/Asset'
import { CopyAddress } from '../../components/Copy'
import AppLayout from '../../layouts/AppLayout'
import { SettingLayout } from '../../layouts/SettingLayout'
import BoringAvatar from 'boring-avatars'

// Listed and purchased items
const CollectionCard = ({ name, symbol, address, assetType }) => {

  return (
    <HStack>
      <BoringAvatar variant="pixel" size={30} name={address} />
      <Box w="full" fontSize="xs">
        <Text fontWeight="bold">{name}</Text>
        <HStack>
          <Text>{symbol}</Text>          
          <Text color="gray.500">{assetType}</Text>
        </HStack>
      </Box>
    </HStack>
  )
}

export default function MyWallets() {
  const wallet = useWallet()
  const provider = useProviderHelper()
  const [asset, setAsset] = useState({ assets: [], nfts: [], tokens: [], collections: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wallet.ready) {
      loadAssets()
    }
  }, [wallet.ready])

  const loadAssets = async() => {
    setLoading(true)
    const asset = await provider.getWalletAsset(wallet.account, wallet.network?.short)
    if (asset) {
      setAsset(asset)
    }
    setLoading(false)
  }

  return (
    <AppLayout>
      <AppSpacer />
      <SettingLayout title="Assets">
        <Box mb={12}>
          <Box mb={4}>
            <HStack>
              <Box>
                <Heading size="md" mb={2}>Manage Assets</Heading>        
                <Heading size="xs" color="gray.500">Add one or more assets to showcase your ownership</Heading>
              </Box>
              <Spacer />
            </HStack>
          </Box>
          <Box borderWidth={1} borderColor={mode('gray.50', 'gray.900')} p={6} rounded="md">
            <AssetFormInput onComplete={loadAssets} />
            <HStack mt={6}>
              <Heading size="xs" mb={2} color="gray.500">Collection Addresses</Heading>
              <Spacer />
              { loading && <Spinner size="sm" /> }            
            </HStack>

            <List spacing={4}>
              {
                (asset.collections || []).map(col => <CollectionCard key={col.adress} {...col} />)
              }
            </List>
          </Box>
        </Box>
        <Box mb={12}>
          <Box mb={4}>
            <Heading size="md" mb={2}>Manage Uploads</Heading>        
            <Heading size="xs" color="gray.500">Upload and manage your ipfs files and metadata</Heading>
          </Box>
          <Box borderWidth={1} borderColor={mode('gray.50', 'gray.900')} p={6} rounded="md">
            
          </Box>
        </Box>        
      </SettingLayout>
    </AppLayout>
  )
}