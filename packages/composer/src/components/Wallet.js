import { useState } from 'react'
import { Avatar, HStack, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useWallet, useUtils, useNetwork } from '@xircus-web3/react'
import { TbCheck, TbCopy, TbExternalLink, TbLogout, TbRefresh, TbSend, TbSignature } from 'react-icons/tb'
import { Dropdown } from './Dropdown'
import { ICONS_URL } from '../constants/urls'

export const Wallet = ({ children, theme }) => {
  const network = useNetwork()
  const wallet = useWallet()
  const utils = useUtils()
  const toast = useToast()
  const { onCopy, hasCopied, value } = useClipboard(wallet.account || '')
  const [loading, setLoading] = useState(false)

  const handleCopy = () => {
    onCopy()
    toast({
      title: 'Address Copied',
      description: value,
      variant: 'solid',
      status: 'info',
      isClosable: true,
      containerStyle: {
        bg: 'bg.orange'
      }
    })
  }

  const handleGetBalance = async() => {
    setLoading(true)
    await wallet.getAccountBalance()
    setLoading(false)
  }

  if (wallet.status == 'connected') {

    const defActions = [
      {
        key: 'copy',
        content: hasCopied ? 'Copied' : 'Copy Address',
        icon: hasCopied ? <TbCheck /> : <TbCopy />,      
        onClick: handleCopy      
      },
      {
        key: 'balance',
        content: 'Get Balance',
        icon: <TbRefresh />,
        onClick: handleGetBalance
      },      
      // {
      //   key: 'transfer',
      //   content: 'Transfer',
      //   icon: <TbSend />,
      //   onClick: handleGetBalance
      // },
      // {
      //   key: 'sign',
      //   content: 'Sign Message',
      //   icon: <TbSignature />,
      //   onClick: handleGetBalance
      // },                  
      {
        key: 'explore',
        content: 'View Explorer',
        icon: <TbExternalLink />,
        href: network.getAddressExplorer(wallet.account) || '#',
        as: 'a',
        target: '_blank'
      },            
      {
        key: 'disconnect',
        content: 'Disconnect', 
        icon: <TbLogout />,      
        onClick: wallet.disconnect        
      },
    ]

    const action = (
      <>
        <HStack fontSize="xs">
          <Text fontWeight="bold">{utils.shortAddr(wallet.account)}</Text>
        </HStack>
        <HStack fontSize="10px" spacing={1}>
          <Text fontWeight="bold">{parseFloat(wallet.balance).toFixed(4)}</Text>
          <Text color="gray.500">{wallet.network?.symbol}</Text>
        </HStack>      
      </>
    )

    return (
      <Dropdown 
        action={action}
        items={!children && defActions}
        btnProps={{ 
          ...theme?.button,
          isLoading: loading, 
          leftIcon: <Avatar size="xs" bg="transparent" src={`${ICONS_URL}/metamask150.png`} /> 
        }}
        {...theme?.dropdown}>
        {children}
      </Dropdown>
    )
  }
}