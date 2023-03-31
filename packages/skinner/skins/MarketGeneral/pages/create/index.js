import { 
  Text, Heading, Container, Button, Grid, Spinner,
  HStack, Tag, Avatar, Spacer, Center, VStack, Image,
  Box, Code, useColorModeValue as mode, FormLabel, Divider, IconButton, Tab, Tabs, TabList, TabPanels, TabPanel, useToast } from '@chakra-ui/react'
import { useWallet, useWalletAuth, useProviderHelper, useNetwork, useSDKUtils, useDebounce } from '@xircus-web3/react'
import { AppSpacer } from '../../components/AppContainer'
import AppLayout from '../../layouts/AppLayout'

import { FormInput, FormTextArea, FormAutoComplete, FormSwitch, FormSelect, FormLabelText } from '../../components/Form'
import { DateTimeInput } from '../../components/DateTimeForm'
import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { CopyAddress } from '../../components/Copy'
import { ImageUpload } from '../../components/UploadForm'

import BoringAvatar from "boring-avatars"
import { IoAddCircle, IoCheckmark, IoCheckmarkDone, IoCheckmarkDoneSharp, IoColorFilterOutline } from 'react-icons/io5'
import { PageHeading } from '../../components/Typo'

import Sticky from 'wil-react-sticky'
import { PreviewBox } from '../../components/Previewer'
import { AssetItemId } from '../../components/Asset'
import { fromNow, toUnix } from '../../hooks/day'
import { TbArrowRight, TbExternalLink, TbRefresh } from 'react-icons/tb'
import { WalletAuth } from '../../components/WalletAuth'
import { AccountCredit } from '../../components/AccountCredit'
import { CurrencyInput } from '../../components/CurrencyInput'

const ITEM_STATE = {
  name: '',
  desc: '',
  video: '',
  audio: '',
  image: '',
  thumbImage: '',
  coverImage: '',
  unlockable: '',
  extra: '',
  category: []
}

const LISTING_STATE = {
  assetAddr: '',
  assetId: '',
  startTime: '',
  duration: '',
  quantity: 1,
  currencyId: '',
  price: '',
  uri: '',
  max: 1,
}

const ASSET_STATE = {
  name: '',
  symbol: '',
  totalSupply: '',
  assetAddr: '',
  assetType: false,
  assetId: 0,
  quantity: 1
}

const AssetTypeTag = ({ assetType }) => {
  switch (assetType) {
    case 1: 
      return <Tag>EIP20</Tag>
    case 2:
      return <Tag>EIP721</Tag>
    case 3:
      return <Tag>EIP1155</Tag>
    default:
      return <Tag>UNKNOWN</Tag>
  }
}

const AssetAction = ({ text, label, icon, onClick }) => (
  <Center h={100} w="full" borderWidth={1} borderColor={mode('gray.100', 'gray.900')} _hover={{ bg: mode('gray.100', '#050505') }} cursor="pointer" rounded="md">
    <VStack>
      { icon }
      <Box textAlign="center" fontSize="xs">
        <Text fontWeight="bold">{text}</Text>
        <Text>{label}</Text>      
      </Box>
    </VStack>
  </Center>        
)

// ability to add assets and list them for selection
// ability to deploy 721 and 1155 collection contract on the fly
// 

const AssetSelector = ({ ...rest }) => {
  const provider = useProviderHelper()
  const [assets, setAssets] = useState([])

  return (
    <Box>
      <FormLabel>Select Asset</FormLabel>
      <HStack gap={2}>
        <AssetAction text="Create" label="721" icon={<IoAddCircle fontSize={30} />} />
        <AssetAction text="Create" label="1155" icon={<IoAddCircle fontSize={30} />} />      
        <AssetAction text="Import" label="Collection" icon={<IoAddCircle fontSize={30} />} />
      </HStack>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2} {...rest}>

      </Grid>
    </Box>
  )
}

const CurrencyInputX = ({ onSelect, onChange, ...rest }) => {
  const provider = useProviderHelper({})
  const network = useNetwork()
  const [currencies, setCurrencies] = useState([])
  const [native, setNative] = useState(false)
  const symbol = network?.network?.symbol
  const [currency, setCurrency] = useState({
    _id: 0,
    name: symbol,
    symbol: symbol,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    hashId: provider.NATIVE_HASH_ID
  })

  useEffect(() => {
    loadCurrencies()
  }, [])

  const loadCurrencies = async() => {
    const currencies = await provider.getCurrencies(network.network.short)
    console.log("CURRENCIES", currencies)
    setCurrencies(currencies)
  }

  const handleSelect = (currency) => {
    setCurrency(currency)
    onSelect && onSelect(currency)
  }

  const handlePayNative = ({ target: { checked } }) => {
    setNative(checked)
    if (checked) {
      const currency = {
        _id: 0,
        name: symbol,
        symbol: symbol,
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        hashId: provider.NATIVE_HASH_ID
      }
      setCurrency(currency)
      onSelect && onSelect(currency)      
    } else {
      setCurrency(false)
    }
  }

  // {
  //   currency && (
  //     <HStack borderWidth={1} gap={2} p={4} mb={4} rounded="md">
  //       <Avatar boxSize="40px" bg="transparent" src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${currency.address}/logo.png`} />
  //       <Box fontSize="xs">
  //         <Text>Name: <b>{currency.name}</b></Text>
  //         <Text>Symbol: <b>{currency.symbol}</b></Text>
  //         <Text>Hash ID: <CopyAddress address={currency.hashId} variant="unstyled" pos="right" /></Text>
  //       </Box>
  //       <Spacer />
  //     </HStack>
  //   )
  // }  

  return (
    <Box {...rest}>
      <FormSwitch isChecked={native} label={`Pay with ${symbol}`} onChange={handlePayNative} control={{ mb: 4 }} />
      {
        !native && (
          <HStack>
            <FormAutoComplete
              label="Currency to Pay" 
              name="currency"
              autoComplete="none"
              options={currencies}
              onSelect={handleSelect}
              renderItem={r => `${r.name} ${r.symbol}`}
              renderKey={r => r._id}
              control={{ isRequired: true, mb: 4 }}
              />
          </HStack>
        )
      }
      <FormInput 
        label="Price" 
        name="price" 
        autoComplete="none"
        type="decimal"
        right={
          <HStack>
            <Text>{currency.symbol}</Text>
            <Avatar boxSize="16px" bg="transparent" src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${network.network.short == 'bsc' ? 'smartchain' : network.network.short}/assets/${currency.address}/logo.png`} />
          </HStack>
        }
        onChange={onChange}
        rightProps={{ fontSize: 'sm', fontFamily: 'mono', fontWeight: 'bold', color: 'gray.500' }}
        control={{ isRequired: true }}                    
        />
    </Box>
  )
}



const AssetInput = () => {
  const provider = useProviderHelper({})
  const network = useNetwork()
  const [assets, setAssets] = useState([])
  const [asset, setAsset] = useState(ASSET_STATE)
  const [assetAddr, setAssetAddr] = useState(false)
  const [owned, setOwned] = useState(false)
  const [info, setInfo] = useState(false)
  const [assetType, setAssetType] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChangeId = ({ target: { value: assetId } }) => {
    assetId = parseInt(assetId) > asset.totalSupply ? asset.totalSupply : assetId;
    setAsset({ ...asset, assetId })
    console.log("CHECK IF OWNER OF ID")
  }

  const handleChangeQty = ({ target: { value: quantity } }) => {
    quantity = asset.assetType == 2 ? 1 : quantity;
    setAsset({ ...asset, quantity })
  }

  const handleChangeAddr = async({ target: { value: assetAddr } }) => {
    setLoading(true)
    const assetInfo = await provider.getAssetInfo(assetAddr, network?.network?.short)
    if (assetInfo) {
      setAsset({ ...asset, assetAddr, ...assetInfo })
      setAssetAddr(assetAddr)
    } else {
      setAsset(false)
      setAssetAddr(false)
    }
    setLoading(false)
  }

//   <Grid mb={4} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={2}>
//   <AssetAction text="Create" />
//   <AssetAction text="Import" />    
//   </Grid>

  return (
    <Box mb={4}>

      <FormInput 
        name="assetAddr"
        label="Asset Address"
        control={{ mb: 2 }}
        right={loading ? <Spinner size="sm" /> : <AssetTypeTag assetType={asset.assetType || 0} />}
        onChange={handleChangeAddr}
        />
      {
        assetAddr && (
          <HStack borderWidth={1} gap={2} p={4} mb={4} rounded="md">
            <BoringAvatar size={40} name={asset.assetAddr} />
            <Box fontSize="xs">
              <Text>Asset Name: <b>{asset.name}</b></Text>
              <Text>Asset Symbol: <b>{asset.symbol}</b></Text>              
              <HStack><Text>Total Supply: </Text><Text fontWeight="bold" fontFamily="mono">{asset.totalSupply}</Text></HStack>
            </Box>
            <Spacer />
            { asset.assetType == 1 && <HStack><Text>Balance: </Text><Text fontWeight="bold" fontFamily="mono">100</Text></HStack> }
          </HStack>
        )
      }

      {
        (assetAddr && (asset.assetType == 2 || asset.assetType == 3)) && (
          <HStack mb={4} gap={2}>
            <FormInput 
              label="Asset ID" 
              name="assetId"
              right={owned && <IoCheckmarkDone color="green" />}
              type="number"
              min={0}
              max={asset.totalSupply} 
              step={1}
              value={asset.assetId}
              onChange={handleChangeId}              
              control={{ isRequired: true }}
              />
            <FormInput 
              label="Quantity To Sell" 
              name="quantity" 
              type="number"
              min={1}
              step={1}
              max={asset.assetType == 2 ? 1 : asset.totalSupply}
              value={asset.quantity}
              onChange={handleChangeQty}
              control={{ isRequired: true }}
              />
          </HStack>      
        )
      }


    </Box>
  )

  return 
}

const CollectionCard = ({ asset, ...rest }) => {
  return (
    <HStack 
      transition="all 300ms ease"
      cursor="pointer"
      _hover={{ bg: mode('gray.100', 'gray.900') }} 
      borderWidth={1}
      borderColor={mode('gray.100', 'gray.900')} 
      p={2}
      rounded="md"
      {...rest}>
      <BoringAvatar size={40} name={asset.address} />
      <Box w="full" fontSize="xs">
        <Text fontWeight="bold">{asset.name}</Text>
        <HStack>
          <Text>{asset.symbol}</Text>          
          <Text color="gray.500">{asset.assetType}</Text>
        </HStack>
      </Box>
    </HStack>
  )
}

const PlatformFee = ({ txFee = 1, price = 50, currency }) => {
  return (
    <Box borderWidth={1} borderColor={mode('gray.100', 'gray.900')} rounded="md" p={4} fontSize="sm">
      <HStack>
        <Text>Platform Fee</Text>
        <Spacer />
        <Text>{txFee}%</Text>
      </HStack>
      <Divider my={2} />
      <HStack>
        <Text>You will receive</Text>
        <Spacer />
        <Text>{ price * ((100 - txFee) / 100) }</Text>                    
      </HStack>
    </Box>    
  )
}

const CollectionSelector = ({ onSelect, collections, selected, label, ...rest }) => {
  return (
    <Box {...rest}>
      { label && <FormLabelText>{label}</FormLabelText> }
      <Grid templateColumns={{ base: 'repeat(2, 1fr)' }} gap={2} >
        {(collections || []).map(col => (
          <CollectionCard 
            key={col.address} 
            asset={col} 
            onClick={() => onSelect && onSelect(col)}
            borderColor={selected == col.address ? mode('gray.400', 'gray.600') : mode('gray.100', 'gray.900')}
            bg={selected == col.address ? mode('gray.200', 'gray.800') : mode('gray.100', 'gray.900')}
            />
        ))}
      </Grid>
    </Box>
  )
}

const CreditSection = ({ onMarketChange }) => {
  const wallet = useWallet()
  const helper = useProviderHelper()
  const network = useNetwork()
  const [markets, setMarkets] = useState([])
  const [market, setMarket] = useState(false)
  const [credits, setCredits] = useState(0)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    loadMarkets()
  }, [])

  useEffect(() => {
    if (markets) {
      loadCredits()
    }
  }, [markets])

  const loadMarkets = async() => {
    const markets = await helper.getMarketContracts()
    console.log("MARKETS", markets)
    if (markets.length > 0) {
      setMarkets(markets)
      setMarket(markets[0])
      console.log("MARKET", markets[0])
      onMarketChange && onMarketChange(markets[0].address)
    }
  }

  const loadCredits = async() => {
    setChecking(true)
    if (markets.length > 0) {
      setCredits(await helper.getCredits(markets[0].address, wallet.account, wallet.network.short))
    }
    setChecking(false)
  }

  const buyCredits = async() => {

  }

  return (
    <Card title="Choose Wallet" mb={4}>
      <HStack fontSize="sm" p={2} borderWidth={1} borderColor={mode('gray.100', 'gray.900')} rounded="lg">
        <BoringAvatar />
        <Box w="full">
          <CopyAddress address={wallet.account} pos="right" />
          <HStack>
            <Text fontSize="xs">Available Credits: <b>{credits}</b> in</Text>
            { markets.length > 0 && <IconButton size="xs" as="a" href={network.getAddressExplorer(markets[0].address)} target="_blank" icon={<TbExternalLink />} /> }
            <Spacer />
            <IconButton size="xs" isLoading={checking} icon={<TbRefresh />} onClick={loadCredits} />
            <Button size="xs">Top Up</Button>
          </HStack>
        </Box>
      </HStack>
    </Card>    
  )
}


export default function Create() {
  const utils = useSDKUtils()
  const provider = useProviderHelper({})
  const wallet = useWallet()
  const auth = useWalletAuth()
  const toast = useToast()

  const [market, setMarket] = useState(false)
  const [item, setItem] = useState(ITEM_STATE)
  const [asset, setAsset] = useState(false)
  const [collections, setCollections] = useState([])
  const [listing, setListing] = useState(LISTING_STATE)
  const bounceAssetId = useDebounce(listing.assetId)

  // statuses
  const [loading, setLoading] = useState(false)
  const [minting, setMinting] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [approving, setApproving] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (bounceAssetId >= 0) {
      handleVerify()
    }
  }, [bounceAssetId])

  useEffect(() => {
    if (wallet.account) {
      loadAssets()
    }
  }, [wallet.account])

  const loadAssets = async() => {
    if (wallet.account) {
      setLoading(true)
      const asset = await provider.getWalletAsset(wallet.account, wallet.network?.short)
      if (asset) {
        setCollections(asset?.collections || [])
      }
      setLoading(false)
    }
  }

  const handleChangeItem = ({ target: { name, value } }) => setItem({ ...item, [name]: value })

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (market) {
      if (listing.quantity <= 0) {
        toast({
          title: 'Listing Quantity Required',
          status: 'error',
          isClosable: true
        })
        return false
      }

      setSubmitting(true)
      const uri = btoa(JSON.stringify(item))
      const params = [listing.assetAddr, listing.assetId, listing.startTime, listing.duration, listing.quantity, listing.currencyId, listing.priceWei, uri]

      console.log("SIUBMTTT", uri, params, market)
      const status = await provider.createListing(market, params)
      if (status) {
        toast({
          title: 'Listing Created Successfully',
          status: 'success',
          isClosable: true
        })
        await provider.syncListings()
        setListing(LISTING_STATE)
        setItem(ITEM_STATE)
      }
      setSubmitting(false)
    }
  }

  const durationOpts = [
    { label: 'Custom', value: 0 },    
    { label: '1 Day', value: 86400 },
    { label: '7 Days', value: 604800 },
    { label: '1 Month', value: 2592000 },
    { label: '3 Months', value: 25920000 },    
  ]

  const handleAssetSelect = (asset) => {
    setAsset(asset)
    setListing({ ...listing, 
      assetAddr: asset.address,
      assetType: asset.assetType,
      quantity: asset.assetType == 'EIP721' ? 1 : listing.quantity
    })
  }

  const handleChangeTime = ({ target: { name, value } }) => {
    setListing({ ...listing, [name]: toUnix(value) })
  }

  const handleChangeDuration = ({ target: { value } }) => {
    setListing({ ...listing, duration: value })
  }

  const handlePriceChange = ({ target: { value} }) => {
    if (parseFloat(value) > 0) {
      setListing({ ...listing, price: parseFloat(value), priceWei: utils.toWei(value || 0).toString() })
    }
  }

  const handleCurrencyChange = (currency) => {
    console.log("CURRENCY CHANGED", currency)
    setListing({ ...listing, currencyId: currency.hashId, currencySymbol: currency.symbol })
  }

  const handleChangeQty = ({ target: { name, value } }) => {
    if (!isNaN(value)) {
      setListing({ ...listing, [name]: parseInt(value) })    
    }
  }

  const handleItemImage = (ipfs) => {
    setItem({ ...item, imageSrc: utils.ipfsUrl(ipfs.Hash), image: ipfs.Hash, size: ipfs.Size, uploaded: ipfs.Name })
  }

  const handleMint = async() => {
    if (listing.assetAddr) {
      setMinting(true)
      const uri = btoa(JSON.stringify(item))
      console.log("MINT", item, uri)
      const assetId = await provider.mint(listing.assetType, listing.assetAddr, uri)
      console.log("LISTING ID", assetId)
      setListing({ ...listing, assetId, quantity: listing.quantity })
      setMinting(false)
    }
  }

  const handleVerify = async() => {
    console.log("MARKET", market)
    if (listing.assetAddr && listing.assetId && market) {
      setVerifying(true)
      const assetVerified = await provider.verifyOwnership(wallet.account, listing.assetAddr, listing.assetId)
      const assetApproved = await provider.verifyApproval(wallet.account, market, listing.assetAddr, listing.assetId, listing.quantity)
      setListing({ ...listing, assetVerified, assetApproved, quantity: listing.quantity })
      setVerifying(false)
    }    
  }

  const handleApprove = async() => {
    if (listing.assetAddr && listing.assetId && market) {
      setApproving(true)
      await provider.setApprovalForAll(listing.assetAddr, market, true)
      const assetApproved = await provider.verifyApproval(wallet.account, market, listing.assetAddr, listing.assetId, listing.quantity)
      setListing({ ...listing, assetApproved, quantity: listing.quantity })
      setApproving(false)
    }
  }

  // <AssetSelector mb={4}  />
  // <CreditSection onMarketChange={setMarket} />

  if (auth.isAuthed) {
    return (
      <AppLayout>
        <AppSpacer />
        <Container maxW="container.md" pb={100} py={50}>
          <PageHeading title="Create Listing" mb={4} />

          <Grid templateColumns={{ base: 'auto', md: 'auto 300px' }} gap={4} mb={400}>
            <Box as="form" method="POST" onSubmit={handleSubmit}>


              <AccountCredit onMarketChange={setMarket} />

              <Card title="Item Metadata" mb={4}>

                <ImageUpload 
                  label="Upload File"
                  src={item.imageSrc}
                  onChange={handleItemImage}
                  mb={4} />
                <FormInput 
                  label="Name" 
                  name="name" 
                  value={item.name} 
                  control={{ mb: 4, isRequired: true }}
                  onChange={handleChangeItem}
                  />
                <FormTextArea 
                  label="Description" 
                  name="desc"
                  value={item.desc} 
                  control={{ mb: 4, isRequired: true }}
                  onChange={handleChangeItem}                
                  />
              </Card>              

              <Card title="Listing Details" mb={4}>
                <CollectionSelector 
                  collections={collections} 
                  label="Choose Collection" 
                  selected={listing.assetAddr}
                  onSelect={handleAssetSelect} mb={4} 
                  />
              </Card>
              <Card>

                <FormInput 
                  label="Asset ID" 
                  type="number" 
                  placeholder="Enter Asset ID if existing"
                  value={listing.assetId}
                  name="assetId"
                  onChange={handleChangeQty} 
                  control={{ mb: 4 }}
                  />

                <FormInput 
                  label="Quantity" 
                  type="number" 
                  placeholder="How many items for sale"
                  value={listing.quantity}
                  name="quantity" 
                  onChange={handleChangeQty} 
                  control={{ mb: 4 }}
                  />

                <CurrencyInput mb={4} 
                  onChange={handlePriceChange} 
                  onSelect={handleCurrencyChange}
                  />

                <PlatformFee price={parseFloat(listing.price || 0)} />

                <Box mb={10} />

                <FormLabelText mb={0}>Listing Duration</FormLabelText>
                <Text fontSize="sm" color="gray.500" mb={4}>How long the listing availble for sale</Text>
                <FormInput 
                  label="Start Time" 
                  name="startTime"
                  type="datetime-local"
                  tag={listing.startTime && fromNow(listing.startTime)}
                  onChange={handleChangeTime}
                  control={{ mb: 4, isRequired: true }}
                  />
                <FormSelect 
                  label="Date of listing expiration"
                  onChange={handleChangeDuration}
                  options={durationOpts}
                  control={{ mb: 4, isRequired: true }}
                  />     

                {
                  (!listing.assetId)
                  && <Button w="full" mb={2} onClick={handleMint} isLoading={minting}>Mint</Button>
                }

                {
                  !listing.assetApproved && listing.assetVerified
                  && <Button w="full" mb={2} type="submit" isLoading={approving} onClick={handleApprove}>Approve</Button>
                }

                <Button w="full" type="submit" isLoading={submitting} disabled={!(listing.assetId && listing.assetAddr && listing.assetVerified && listing.assetApproved)}>List Item</Button>
              </Card>
            </Box>
            <Sticky offsetTop={80} offsetBottom={20}>
              <Box w={{ base: '100%', md: '300px' }} >
                <Text mb={4}>Preview</Text>
                <Card position="relative">

                  {
                    asset && (
                      <HStack mb={2} fontSize="sm" pos="absolute" top={5} left={5} bg="rgba(0,0,0,0.9)" p={1}>
                        <BoringAvatar name={asset.address} size={20} />
                        <Box>
                          <Text>{asset.name}</Text>
                        </Box>
                      </HStack>
                    )
                  }

                  {
                    item.image
                    ? <Image src={utils.ipfsUrl(item.image)} mb={4} objectFit="cover" objectPosition="center center" h="200px" w="full" />
                    : <Center h="300px"><IoColorFilterOutline fontSize="120px" /></Center>
                  }
                  <HStack>
                    { item.name && <Heading size="sm">{item.name}</Heading> }
                    <Spacer />
                    <Box>
                      { listing.price && <HStack><Text fontWeight="bold">{listing.price}</Text><Text color="gray.500">{listing.currencySymbol}</Text></HStack> }
                    </Box>
                  </HStack>
                  <HStack fontSize="xs" color="gray.500" mb={2}>
                    <Text>{ listing.assetType == 'EIP1155' ?  'Multi Edition' : 'Single Edition' }</Text>
                    <Spacer />
                    { listing.assetId && <Text>{ listing.assetId } of { (listing.totalSupply ? listing.totalSupply : '∞' ) } </Text> }
                  </HStack>
                  { item.desc && <Text color="gray.500" fontSize="xs" mb={4}>{item.desc}</Text> }


                  <HStack fontSize="sm" mb={4}>
                    <Text>by</Text>
                    <Text fontWeight="bold">{utils.shortAddr(wallet.account).toLowerCase()}</Text>
                    <Spacer />
                    { listing.startTime && <Text>{fromNow(listing.startTime)}</Text> }
                  </HStack>
                  <Button w="full" variant="outline" disabled>Buy</Button>
                </Card>
              </Box>
            </Sticky>
          </Grid>
        </Container>
      </AppLayout>
    )    
  }

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl">
        <Center h="80vh">
          <WalletAuth />
        </Center>
      </Container>
    </AppLayout>
  )

}


// {
//   !listing.assetVerified
//   && <Button w="full" mb={2} onClick={handleVerify} isLoading={verifying}>Verify Ownership</Button>
// }

  // <Box wordBreak="break-all">
  // { JSON.stringify(listing)}
  // </Box>              


  // <Box wordBreak="break-all">
  // { JSON.stringify(listing)}
  // </Box>

  // <Code wordBreak="break-all" p={4} rounded="md">
  // {btoa(JSON.stringify(item))}
  // </Code>


  // { 
  //   listing.assetAddr != '' 
  //     && (
  //       <Tabs colorScheme="gray">
  //         <TabList>
  //           <Tab>Mint New</Tab>
  //           <Tab>Use Existing</Tab>
  //         </TabList>
  //         <TabPanels>
  //           <TabPanel p={0} pt={4}>
  //             <Button w="full">Mint</Button>
  //           </TabPanel>
  //           <TabPanel p={0} pt={4}>
  //             <AssetItemId
  //               label="Asset ID" 
  //               assetAddr={listing.assetAddr} 
  //               onVerified={handleAssetIDVerified} 
  //               control={{ mb: 8 }} mb={2}
  //             />
  //           </TabPanel>                    
  //         </TabPanels>
  //       </Tabs>                        
  //     )
  //   }