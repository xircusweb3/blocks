import { Box, HStack, IconButton, Button, Spacer, Text, useColorModeValue as mode, Select } from "@chakra-ui/react"
import { useAppData, useNetwork, useProviderHelper, useWallet } from "@xircus-web3/react"
import BoringAvatar from "boring-avatars"
import { useState, useEffect } from "react"
import { TbExternalLink, TbLifebuoy, TbRefresh, TbShoppingCart } from "react-icons/tb"
import { OutlineCard } from "./Card"
import { CopyAddress } from "./Copy"
import { RightDrawer } from "./Drawer"
import { FormLabelText, FormSelect } from "./Form"
import { TopUpForm } from "./TopUpForm"

export const TopUpModal = () => {

  return (
    <Box>

    </Box>
  )
}

export const AccountCredit = ({ onMarketChange }) => {
  const appData = useAppData()
  const wallet = useWallet()
  const helper = useProviderHelper()
  const network = useNetwork()
  const [markets, setMarkets] = useState([])
  const [market, setMarket] = useState(false)
  const [shorts, setShorts] = useState([])
  const [credits, setCredits] = useState(0)
  const [checking, setChecking] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    loadMarkets()
  }, [network.network])

  useEffect(() => {
    if (markets) {
      loadCredits()
    }
  }, [markets])

  const loadMarkets = async() => {
    // const markets = await helper.getMarketContracts()

    const markets = appData?.markets || []
    console.log("MARKETS", markets)

    if (markets.length > 0) {
      setMarkets(markets)
      setShorts(markets.map(m => m.chain))
      const market = markets.find(m => m.chain == network.network.short)
      setMarket(market)
      onMarketChange && onMarketChange(market.address)
    }
  }

  const loadCredits = async() => {
    setChecking(true)
    if (markets.length > 0) {
      setCredits(await helper.getCredits(market.address, wallet.account, wallet.network.short))
    }
    setChecking(false)
  }

  const buyCredits = async() => {

  }

  const handleSwitchNetwork = async({ target: { value: networkId } }) => {
    network.switchNetwork(networkId)
  }

  const handleOpenModal = () => setModal(true)
  const handleCloseModal = () => setModal(false)

  return (
    <Box>
      <RightDrawer 
        header="Top Up"
        isOpen={modal} onClose={handleCloseModal}>
        <TopUpForm market={market} />
      </RightDrawer>
      <Box p={4} borderWidth={1} borderColor={mode('gray.100', 'gray.900')} rounded="lg" mb={2}>
        <HStack mb={2}>
          <FormLabelText m={0}>You will be listing in</FormLabelText>
          <Spacer />
          <IconButton size="xs" icon={<TbLifebuoy />} />
        </HStack>
        <Select value={network.currentChainId} onChange={handleSwitchNetwork}>
        { (network.chains || []).filter(c => shorts.indexOf(c.short) > -1).map(c => <option key={c.short} value={c.networkId}>{c.name}</option>) }
        </Select>
      </Box>
      <HStack fontSize="sm" p={4} borderWidth={1} borderColor={mode('gray.100', 'gray.900')} rounded="lg" mb={4}>
        <BoringAvatar variant="beam" name={wallet.account} />
        <Box w="full">
          <CopyAddress address={wallet.account} pos="right" />
          <HStack>
            <Text fontSize="xs">Available Credits: <b>{credits}</b></Text>
            <Spacer />
            { markets.length > 0 && <IconButton size="xs" as="a" href={network.getAddressExplorer(market.address)} target="_blank" icon={<TbExternalLink />} /> }
            <IconButton size="xs" isLoading={checking} icon={<TbRefresh />} onClick={loadCredits} />
            <Button size="xs" onClick={handleOpenModal}>Top Up</Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

// export const AccountCredit = ({ markets = [], onMarketChange }) => {
//   const wallet = useWallet()
//   const network = useNetwork()
//   const helper = useProviderHelper()
//   const [markets, setMarkets] = useState([])
//   const [market, setMarket] = useState(false)
//   const [credits, setCredits] = useState(0)
//   const [checking, setChecking] = useState(false)

//   const handleTopUp = () => {

//   }

//   const handleRefresh = () => {

//   }

//   return (
//     <HStack>
//       <BoringAvatar />

//     </HStack>
//   )
// }