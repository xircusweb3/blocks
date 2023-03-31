import { List, Box, Button, Avatar, HStack, Spinner, Divider, Text, useColorModeValue as mode } from "@chakra-ui/react"
import { useWallet, useWalletProviderAuth } from "@xircus-web3/react"
import { useRouter } from "next/router"
import { Fragment, useMemo } from "react"
import { shortAddr } from "../hooks/utils"

const btnStyle = {
  w: 'full',
  size: 'lg',
  justifyContent: 'flex-start',
  variant: 'ghost'
}

export const MobileWallet = ({ onClose }) => {
  const wallet = useWallet()
  const auth = useWalletProviderAuth()
  const router = useRouter()

  const handleWalletConnect = () => {
    wallet.connectWalletConnect()
    onClose && onClose('walletconnect')
  }

  const renderAuthed = useMemo(() => {
    if (auth.isAuthed) {
      return (
        <Fragment>
          <Button 
            {...btnStyle}
            onClick={() => router.push('/settings/account')}>
            Edit Profile
          </Button>
          <Button 
            {...btnStyle}
            onClick={() => router.push('/settings/wallets')}>
            Wallet
          </Button>                
          <Button 
            {...btnStyle}
            onClick={() => router.push('/settings/assets')}>
            My Assets
          </Button>        
          <Button 
            {...btnStyle}
            onClick={() => router.push('/settings/listings')}>
            My Listings
          </Button>
        </Fragment>
      )
    }
    return <Button {...btnStyle} onClick={auth.auth} isLoading={auth.authenticating}>Authenticate</Button>
  }, [auth.isAuthed, auth.authenticating])

  if (wallet.status == 'connected' && wallet.account) {
    return (
      <List>
        <HStack px={6} mb={6}>
          <Avatar boxSize={30} />
          <Box w={{ base: 'full', sm: 'full', md: 'auto' }}>
            <Text fontSize="xs" lineHeight="initial" fontWeight="bold">{shortAddr(wallet.account)}</Text>
            <Text fontSize={10} color="gray.500">{wallet.network?.name}</Text>
          </Box>
          <Divider orientation="vertical" h={30} />
          <Box>
            <Text fontSize="xs" lineHeight="initial" fontWeight="bold">{parseFloat(wallet.balance).toFixed(4)}</Text>
            <Text fontSize={10} color="gray.500">{wallet.network?.symbol}</Text>
          </Box>
        </HStack>
        { renderAuthed }
        <Button 
          {...btnStyle}
          onClick={wallet.disconnect}>
          Disconnect
        </Button>
      </List>
    )
  }

  return (
    <List>
      <Button 
        {...btnStyle}
        onClick={wallet.connectMetamask}
        leftIcon={<Avatar size="xs" bg="transparent" src="/wallets/metamask150.png" />}>
        Connect Metamask
      </Button>
      <Button 
        {...btnStyle}      
        onClick={handleWalletConnect}
        leftIcon={<Avatar size="xs" bg="transparent" src="/wallets/walletconnect150.png" />}>
        Connect WalletConnect
      </Button>
      <Button 
        {...btnStyle}      
        onClick={wallet.connectCoinbase}
        leftIcon={<Avatar size="xs" bg="transparent" src="/wallets/coinbase150.png" />}>
        Connect Coinbase
      </Button>
    </List>
  )
}