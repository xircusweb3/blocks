import { Avatar } from '@chakra-ui/react'
import { useWallet } from '@xircus-web3/react'
import { Dropdown } from './Dropdown'
import { ICONS_URL } from '../constants/urls'

export const ConnectButton = ({ title, children, theme }) => {
  const wallet = useWallet()

  const defWallets = [
    { 
      key: 'metamask',
      icon: <Avatar size="xs" bg="transparent" src={`${ICONS_URL}/metamask150.png`} />,
      content: 'Metamask', 
      onClick: wallet.connectMetamask
    },
    { 
      key: 'walletconnect',
      content: 'WalletConnect', 
      icon: <Avatar size="xs" bg="transparent" src={`${ICONS_URL}/walletconnect150.png`} />,      
      onClick: wallet.connectWalletConnect
    },
    { 
      key: 'coinbase',
      content: 'Coinbase Wallet',
      icon: <Avatar size="xs" bg="transparent" src={`${ICONS_URL}/coinbase150.png`} />,      
      onClick: wallet.connectCoinbase
    },
    { 
      key: 'phantom',
      content: 'Phantom',
      icon: <Avatar size="xs" bg="transparent" src={`${ICONS_URL}/phantom150.png`} />,      
      onClick: wallet.connectPhantom
    },        
    { 
      key: 'sender',
      content: 'Sender',
      icon: <Avatar size="xs" bg="transparent" src={`${ICONS_URL}/sender150.png`} />,      
      onClick: wallet.connectSender
    }
  ]

  return wallet.status == 'connected' 
    ? children 
    : <Dropdown 
        items={defWallets} 
        action={title || 'Connect'} 
        btnProps={theme?.button}
        {...theme?.dropdown}
        />
}