import { Box, Button, ButtonGroup, Container, Grid, Heading, HStack, IconButton, Image, List, Spacer, Stack, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import { useNetwork, useProviderHelper, useSDKUtils, useWallet, useWalletAuth } from '@xircus-web3/react'
import { useState, useEffect, useMemo } from 'react'
import { TbArrowRight, TbCloudSnow, TbEdit, TbExternalLink, TbRefresh, TbTrash } from 'react-icons/tb'
import { AppSpacer } from '../../components/AppContainer'
import { CopyAddress } from '../../components/Copy'
import { CustomTable } from '../../components/Table'
import { fromNow } from '../../hooks/day'
import AppLayout from '../../layouts/AppLayout'
import { SettingLayout } from '../../layouts/SettingLayout'
import { ipfsUrl } from '../../hooks/utils'

// Account Profile

const ListingCard = ({ listing }) => (
  <Box w="full">
    <Image src={ipfsUrl(listing.image)} objectFit="cover" objectPosition="center center" />
    <Text>{listing.name}</Text>
    <Text>{listing.priceUSD}</Text>
    <Text>{listing.currencyName}</Text>
    <Tag>{listing.soldAt > 0 ? 'Sold' : 'Listed'}</Tag>
  </Box>
)

export default function MyProfile() {
  const wallet = useWallet()
  const utils = useSDKUtils()
  const network = useNetwork()
  const [listings, setListings] = useState([])
  const [syncing, setSyncing] = useState(false)
  const [loading, setLoading] = useState([])
  const helper = useProviderHelper()
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false })

  useEffect(() => {
    if (wallet.account) {
      loadListings()
    }
  }, [wallet.account])
  

  const loadListings = async() => {
    setLoading(true)
    const listings = await helper.getSellerListings(wallet.account)
    console.log("LISTINGS", listings)
    setListings(listings)
    setLoading(false)
  }

  const handleSync = async() => {
    setSyncing(true)
    await helper.syncListings()
    setSyncing(false)
  }

  const fields = [
    {
      key: 'listingId',
      px: 2,
      style: { w: `10px` },
      label: 'ID',
    },
    {
      key: 'image',
      label: '',
      render: row => (
        <Box as="a" href={utils.ipfsUrl(row.image)} target="_blank">
          <Image src={utils.ipfsUrl(row.image)} h="40px" w="40px" objectFit="cover" objectPosition="center center" />          
        </Box>
      )
    },
    {
      key: 'name',
      label: 'Name',
      render: row => (
        <Box>
          <Text>{row.name}</Text>
        </Box>
      )
    },
    {
      key: 'price',
      label: 'Price',
      style: { textAlign: 'right' },
      render: row => (
        <HStack justify="flex-end">
          <Text fontWeight="bold">{utils.fromWei(row.price).toString()}</Text>
          <Text>{helper.getCurrencySymbol(row.currencyId)}</Text>
        </HStack>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: row => row.soldAt == '0' ? <Box><Tag>For Sale</Tag><Text fontSize="xs">{fromNow(row.startTime)}</Text></Box> : <Tag>Sold</Tag>
    },
    {
      key: 'actions',
      label: '',
      style: { w: `50px`, pl: 0, px: 4 },
      render: row => (
        <HStack gap={0}>
          <IconButton size="sm" variant="ghost" as="a" target="_blank" href={network.getNFTExplorer(row.assetAddr, row.nftId)} icon={<TbExternalLink />} />
          <IconButton size="sm" variant="ghost" icon={<TbEdit />} />
          <IconButton size="sm" variant="ghost" icon={<TbTrash />} />          
        </HStack>
      )
    }   
  ]

  const renderContent = useMemo(() => {
    if (isMobile) {
      return (
        <Grid templateColumns={{ base: 'repeat(3, 1fr)' }} gap={2}>
          { listings.map(listing => <ListingCard listing={listing} key={listing._id} />) }
        </Grid>
      )
    }
    return (
      <CustomTable 
      fields={fields} 
      rows={listings}
      />      
    )
  }, [isMobile, listings])

  return (
    <AppLayout>
      <AppSpacer />
      <SettingLayout title="Listings">
        <Box>
          <HStack mb={6}>
            <Box>
              <Heading size="md">Manage Listings</Heading>        
              <Heading display={{ base: 'none', md: 'block' }} size="xs" color="gray.500">Edit or remove your listings from the marketplace</Heading>
            </Box>
            <Spacer />
            <IconButton icon={<TbRefresh />} onClick={loadListings} isLoading={loading} />
            <IconButton icon={<TbCloudSnow />} onClick={handleSync} isLoading={syncing} />
          </HStack>
          { renderContent }
        </Box>
      </SettingLayout>
    </AppLayout>
  )
}