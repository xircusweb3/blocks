import { useMemo } from 'react'
import { useWallet } from '@xircus-web3/react'
import { Avatar, Box, Button, Heading, useDisclosure, Text, Wrap, VStack, Center, Grid, HStack } from '@chakra-ui/react'
import { ICONS_URL } from '../constants/urls'
import { CustomDrawer } from './CustomDrawer'
import { CustomModal } from './CustomModal'

export const ConnectModal = ({ children, btnProps, btnLabel, variant = 'modal' }) => {
  const wallet = useWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const defWallets = [
    { 
      key: 'metamask',
      content: 'Metamask', 
      icon: `${ICONS_URL}/metamask150.png`,
      onClick: wallet.connectMetamask
    },
    { 
      key: 'walletconnect',
      content: 'WalletConnect', 
      icon: `${ICONS_URL}/walletconnect150.png`,      
      onClick: wallet.connectWalletConnect
    },
    { 
      key: 'coinbase',
      content: 'Coinbase Wallet',
      icon: `${ICONS_URL}/coinbase150.png`,      
      onClick: wallet.connectCoinbase
    },
    { 
      key: 'phantom',
      content: 'Phantom',
      icon: `${ICONS_URL}/phantom150.png`,      
      onClick: wallet.connectPhantom
    },        
    { 
      key: 'sender',
      content: 'Sender',
      icon: `${ICONS_URL}/sender150.png`,      
      onClick: wallet.connectSender
    }
  ]

  const handleConnect = (wallet) => {
    onClose()
    wallet.onClick()
  }

  const renderConnectWallet = useMemo(() => {
    if (wallet.status != 'connected') {
      return (
        <Box>
          <Box mb={4}>
            <Text>Choose how you want to connect. There are several wallet providers.</Text>
          </Box>
          <Grid templateColumns={{ base: 'repeat(2, 1fr)' }} gap={2} mb={4}>
            {defWallets.map(wallet => (
              <HStack 
                key={wallet.key} 
                borderWidth={1} 
                p={2} 
                transition="all 300ms ease"
                cursor="pointer"
                onClick={() => handleConnect(wallet)}
                _hover={{ borderColor: 'gray.500' }} rounded="md">
                <Avatar size="sm" bg="transparent" src={wallet.icon} />
                <Text fontSize="sm">{wallet.content}</Text>
              </HStack>
            ))}
          </Grid>
          <Text mb={4} fontSize="xs" color="gray.500">Start by connecting with one of the wallets above. This action will never access your seed phrase or private keys. Be sure to store your private keys or seed phrase securely. Never share them with anyone.</Text>
        </Box>
      )
    }
  }, [wallet.status, defWallets, handleConnect])

  return wallet.status == 'connected' 
    ? children 
    : (
        <>
          <CustomModal header="Choose Your Wallet" isOpen={variant == 'modal' && isOpen} onClose={onClose}>
            {renderConnectWallet}
          </CustomModal>
          <CustomDrawer isOpen={variant == 'drawer' && isOpen} onClose={onClose}>
            {renderConnectWallet}
          </CustomDrawer>
          <Button onClick={onOpen} {...btnProps}>{btnLabel || 'Connect Wallet'}</Button>
        </>
      )

}