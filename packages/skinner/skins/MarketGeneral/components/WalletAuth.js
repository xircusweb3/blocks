import { Box, Button, useBreakpointValue } from "@chakra-ui/react"
import { useWallet, useWalletProviderAuth } from "@xircus-web3/react"
import { Fragment, useEffect, useState } from "react"

export const WalletConnect = ({ children, connectProps, ...rest }) => {
  const wallet = useWallet()
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false })  
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    console.log(isMobile)
  }, [isMobile])

  const handleConnect = () => {
    setConnecting(true)
    if (isMobile) {
      wallet.connectWalletConnect()
    } else {
      wallet.connectMetamask()
    }
    setConnecting(false)
  }


  if (wallet.status == 'disconnected' || wallet.status == 'connecting') {
    return <Button onClick={handleConnect} w="full" isLoading={connecting} {...connectProps}>Connect Wallet</Button>
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export const WalletAuth = () => {
  const [connecting, setConnecting] = useState(false)
  const wallet = useWallet()
  const auth = useWalletProviderAuth()
  const isMobile = useBreakpointValue({ base: false, sm: true, md: false })

  const handleConnect = () => {
    setConnecting(true)
    if (isMobile) {
      wallet.connectWalletConnect()
    } else {
      wallet.connectMetamask()
    }
    setConnecting(false)
  }

  if (wallet.status == 'connected' && !auth.isAuthed) {
    return <Button onClick={auth.auth} isLoading={auth.authenticating}>Authenticate Your Wallet</Button>
  }

  return <Button onClick={handleConnect} isLoading={connecting}>Connect Your Wallet</Button>
}