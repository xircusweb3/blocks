import { Fragment, useMemo } from 'react'
import { useNetwork, useProviderHelper, useWallet, useWalletAuth, useWalletProviderAuth } from '@xircus-web3/react'
import { useRouter } from 'next/router'
import { 
  Box, Text, HStack, Heading, 
  MenuItem, Divider, Avatar, Select, Spinner,
  useColorModeValue as mode,
  useClipboard,
  useToast,
  useBreakpointValue
} from '@chakra-ui/react'
import { ButtonMenu } from './Menu'
import { shortAddr } from '../hooks/utils'
import BoringAvatar from 'boring-avatars'

const connectors = ['solana', 'near', 'aptos', 'tezos', 'cosmos']

export default function WalletAccount() {
  const toast = useToast()
  const network = useNetwork()
  const wallet = useWallet()
  const router = useRouter()
  const auth = useWalletProviderAuth({
    onFailed: (...args) => {
      console.log(args)
    },
    onAuthed: (user) => {
      if (user) {
        toast({
          title: 'Authentication Successful',
          description: user.address,
          status: 'success',
          isClosable: true
        })
      }
    }
  })
  const isMobile = useBreakpointValue({ base: false, sm: true, md: false })
  
  const menuItemStyle = {
    borderRadius: 'md',
    bg: 'transparent',
    _hover: { 
      bg: mode('gray.100', 'gray.900')
    }
  }

  const connectMenus = useMemo(() => [
    { 
      label: 'Metamask', 
      icon: <Avatar size="xs" bg="transparent" src="/wallets/metamask150.png" />,
      onClick: wallet.connectMetamask
    },
    { 
      label: 'WalletConnect', 
      icon: <Avatar size="xs" bg="transparent" src="/wallets/walletconnect150.png" />,      
      onClick: wallet.connectWalletConnect
    },
    { 
      label: 'Coinbase Wallet',
      icon: <Avatar size="xs" bg="transparent" src="/wallets/coinbase150.png" />,      
      onClick: wallet.connectCoinbase
    },  
  ], [wallet])

  const menuLinks = useMemo(() => {
    if (auth.isAuthed) {
      return (
        <Fragment>
          <MenuItem {...menuItemStyle} onClick={() => router.push('/settings/account')}>Edit Profile</MenuItem>
          <MenuItem {...menuItemStyle} onClick={() => router.push('/settings/assets')}>My Assets</MenuItem>            
          <MenuItem {...menuItemStyle} onClick={() => router.push('/settings/listings')}>My Listings</MenuItem>      
          <MenuItem onClick={wallet.disconnect}  {...menuItemStyle}>Logout</MenuItem>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <MenuItem onClick={auth.auth} {...menuItemStyle}>Authenticate</MenuItem>
        <MenuItem onClick={wallet.disconnect}  {...menuItemStyle}>Logout</MenuItem>        
      </Fragment>
    )
  }, [auth, wallet])

  const renderEVM = useMemo(() => (
    <ButtonMenu
      key="evm"
      btnProps={{ variant: 'unstyled', rightIcon: null, w: 'full' }}
      label={wallet.account && ( 
        <HStack spacing={3} textAlign="left">
          {auth.authenticating && <Spinner size="xs" />}
          <BoringAvatar variant="beam" name={wallet.account} size={30} />
          <Box w={{ base: 'full', sm: 'full', md: 'auto' }} textAlign={{ base: 'right', sm: 'right', md: 'left' }}>
            <Text fontSize="xs" lineHeight="initial" fontWeight="bold">{shortAddr(wallet.account)}</Text>
            <Text fontSize={10} color="gray.500" display={{ base: 'none', sm: 'block' }}>{wallet.network?.name}</Text>
            <Text textAlign="right" display={{ base: 'block', sm: 'none' }} fontSize={9}>{parseFloat(wallet.balance).toFixed(4)} {wallet.network?.symbol}</Text>
          </Box>
          <Divider orientation="vertical" h="40px" />
          <Box display={{ base: 'none', sm: 'block' }}>
            <Text fontSize="xs" lineHeight="initial" fontWeight="bold">{parseFloat(wallet.balance).toFixed(4)}</Text>
            <Text fontSize={10} color="gray.500">{wallet.network?.symbol}</Text>
          </Box>
        </HStack>
      )}>
      { menuLinks }
    </ButtonMenu>
  ), [wallet, auth.authenticating, isMobile])

  return (
    <HStack>
      {
        wallet.status == 'connected'
        ? connectors.indexOf(wallet.connector) > -1 ? renderChain : renderEVM
        : <ButtonMenu
            key="connect"
            label="Connect"
            menus={connectMenus}
            menuProps={{ placement: 'bottom-end' }}
            btnProps={{ size: { base: 'lg', sm: 'lg', md: 'sm' }, variant: 'ghost', w: 'full', textAlign: 'left' }}
          />
      }
    </HStack>
  )
}