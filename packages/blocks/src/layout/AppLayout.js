import { Box, Button, Heading } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import { useWallet } from '@xircus-web3/react'

export const AppLayoutDefault = {
  name: 'AppLayout',
  theme: {},
  data: {},
}

export const AppLayout = () => {
  const wallet = useWallet()
  const { app, layout } = useBlock()


  
  return (
    <Box>
      App Layout 
      <Heading>
      {app.name}
      </Heading>
      <Box>
      {wallet.account}
      </Box>
      <Button onClick={wallet.connectMetamask}>Connect</Button>
      <Button onClick={wallet.connectWalletConnect}>Wallet Connect</Button>      
      <Button onClick={wallet.disconnect}>Disconnect</Button>
    </Box>
  )
}