import { Box, Button, Center, Container, Grid, Heading, HStack, Image, Spacer, Spinner, Text, VStack, useColorModeValue as mode, IconButton, ButtonGroup, Code, useBreakpointValue } from '@chakra-ui/react'
import { useNetwork, useProviderHelper, useSDKUtils, useWallet } from '@xircus-web3/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AppSpacer } from '../../components/AppContainer'
import AppLayout from '../../layouts/AppLayout'
import BoringAvatar from 'boring-avatars'
import { CopyAddress } from '../../components/Copy'
import { TbBrandFacebook, TbBrandTwitter, TbExternalLink, TbHeart, TbShare } from 'react-icons/tb'
import { WalletConnect } from '../../components/WalletAuth'

export default function Item() {
  const wallet = useWallet()
  const router = useRouter()
  const helper = useProviderHelper()
  const utils = useSDKUtils()
  const network = useNetwork()
  const [item, setItem] = useState(false)
  const [balance, setBalance] = useState(0)
  const [approved, setApproved] = useState(false)
  const [approving, setApproving] = useState(false)
  const [buying, setBuying] = useState(false)
  const isMobile = useBreakpointValue({ base: false, sm: true, md: false })

  useEffect(() => {
    loadItem()
  }, [router.isReady])

  useEffect(() => {
    if (wallet.account) {
      loadBalance()
      checkAllowance()
    }
  }, [item, wallet.account])

  const loadItem = async() => {
    const item = await helper.getListingItem(router.query.itemId)
    setItem(item)
  }

  const checkAllowance = async() => {
    if (item.currency && wallet.account) {
      const allowance = await helper.getAssetAllowance(wallet.account, item.marketAddr, item.currency)
      const approved = parseFloat(allowance.allowance) >= parseFloat(utils.fromWei(item.price).toString())
      setApproved(approved)
    }
    return false
  }

  const handleApprove = async() => {
    setApproving(true)
    if (item.currency && item.marketAddr && wallet.account) {
      await helper.approveAllowance(item.currency, item.marketAddr, item.price)
      await checkAllowance()
    }
    setApproving(false)
  }

  const loadBalance = async() => {
    if (item.currency && wallet.account) {
      const balance = await helper.getAssetBalance(wallet.account, item.currency)
      if (balance) {
        setBalance(parseFloat(balance.balance).toFixed(4))
      }
    }
  }

  const handleBuy = async() => {
    if (item.currency && wallet.account) {
      setBuying(true)
      const status = await helper.buyListing(item.marketAddr, item.listingId, wallet.account, item.currencyId, item.quantity, item.price)
      console.log("STATUS", status, item)
      setBuying(false)
    }
  }

  const handleConnect = () => {
    try {
      wallet.connectWalletConnect()
    } catch (e) {

    }
  }

  if (!item) {
    return <AppLayout><Center h="80vh" w="full"><Spinner mr={4} /><Text>Loading NFT</Text></Center></AppLayout>
  }

  const currencySymbol = helper.getCurrencySymbol(item.currencyId)

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.lg" mb={100}>
        <Grid templateColumns={{ base: 'auto', md: 'auto 400px' }} gap={6} mt={50}>
          <Box>
            <Image src={utils.ipfsUrl(item.image)} objectFit="cover" objectPosition="center center" w="full" rounded="md" />
          </Box>
          <Box>
            <VStack h="full" align="flex-start">

              <HStack w="full" justify={{ base: 'center', md: 'flex-end' }}>
                <ButtonGroup size="sm">
                  <Button leftIcon={<TbHeart />}>0</Button>
                  <IconButton icon={<TbShare />} as="a" href={`/`} target="_blank" />                
                  <IconButton icon={<TbBrandTwitter />} as="a" href={`/`} target="_blank" />                                
                  <IconButton icon={<TbBrandFacebook />} as="a" href={`/`} target="_blank" />             
                </ButtonGroup>
              </HStack>

              <Box py={10}>
                <Heading mb={4}>{item.name}</Heading>
                <Text color="gray.500">{item.desc}</Text>
              </Box>

              <Box w="full">
                <HStack borderWidth={1} p={2} px={4} rounded="md" borderColor={mode('gray.50', 'gray.900')}>
                  <Text color="gray.500">Listed By: </Text>
                  <BoringAvatar size={16} variant="beam" name={item.seller} />
                  <CopyAddress address={item.seller} pos="right" />
                  <Spacer />
                  <Text color="gray.500">on {item.chain.toUpperCase()}</Text>
                </HStack>
              </Box>

              {
                item.soldAt > 0 && (
                  <Box w="full">
                  <HStack borderWidth={1} p={2} px={4} rounded="md" borderColor={mode('gray.50', 'gray.900')}>
                    <Text color="gray.500">Bought By: </Text>
                    <HStack as="a" href={network.getAddressExplorer(item.buyFor)} target="_blank">
                      <BoringAvatar size={16} variant="beam" name={item.buyFor} />
                      <CopyAddress pos="right" address={item.buyFor} />
                    </HStack>
                    <Spacer />
                    <Button size="sm" variant="link">View TX</Button>
                  </HStack>
                </Box>                  
                )
              }              

              <Box w="full">
                <HStack borderWidth={1} p={2} px={4} rounded="md" borderColor={mode('gray.50', 'gray.900')}>
                  <BoringAvatar name={item.assetAddr} variant="pixel" />
                  <Box w="full">
                    <HStack justify="space-between">
                      <Button variant="link" rightIcon={<TbExternalLink />} fontWeight="bold" as="a" target="_blank" href={network.getAddressExplorer(item.assetAddr, item.chain)}>View Collection</Button>                    
                      <Button variant="link" rightIcon={<TbExternalLink />} fontWeight="bold" as="a" target="_blank" href={network.getNFTExplorer(item.assetAddr, item.nftId, item.chain)}>{item.nftId}</Button>
                    </HStack>
                    <HStack justify="space-between">
                      <CopyAddress address={item.assetAddr} color="gray.500" pos="right" />
                      <Text fontSize="xs">{item.assetType == 'EIP721' ? 'Single Edition' : 'Multiple Edition'}</Text>
                    </HStack>
                  </Box>
                </HStack>            
              </Box>



              <Spacer />

              <HStack py={6} w="full" px={4}>
                <Box>
                  <Text fontSize="xs" color="gray.500">FOR</Text>
                  <HStack>
                    <Text fontSize="xl" fontWeight="bold">{utils.fromWei(item.price).toString()}</Text>
                    <Text fontWeight="bold" color="gray.500">{currencySymbol}</Text>
                  </HStack>                  
                </Box>
                <Spacer />
                <Box textAlign="right">
                  <Text fontSize="xs" color="gray.500">BALANCE</Text>
                  <HStack>
                    <Text fontWeight="bold">{balance}</Text>
                    <Text fontWeight="bold" fontSize="sm" color="gray.500">{currencySymbol}</Text>
                  </HStack>
                </Box>
              </HStack>

              <WalletConnect connectProps={{ size: 'lg' }}>
                <Box w="full">
                  { !approved && <Button size="lg" w="full" mb={2} onClick={handleApprove} isLoading={approving}>Approve</Button> }
                  <Button size="lg" w="full" disabled={!approved} isLoading={buying} onClick={handleBuy}>Buy</Button>
                </Box>                                    
              </WalletConnect>

            </VStack>

          </Box>
        </Grid>
      </Container>      
    </AppLayout>
  )
}


// {
//   item.soldAt == '0'
//   ? 
//     wallet.status == 'connected' && (
//       <Box w="full">
//         { !approved && <Button size="lg" w="full" mb={2} onClick={handleApprove} isLoading={approving}>Approve</Button> }
//         <Button size="lg" w="full" disabled={!approved} isLoading={buying} onClick={handleBuy}>Buy</Button>
//       </Box>                    
//     )
//   : <Button size="lg" w="full" disabled>Sold 🔥</Button>
// }

// {
//   (wallet.status == 'disconnected' && isMobile) 
//     && <Button w="full" size="lg" onClick={handleConnect}>Connect Wallet</Button>
// }
