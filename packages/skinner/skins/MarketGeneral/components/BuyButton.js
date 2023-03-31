import { 
  Box, 
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
} from '@chakra-ui/react'
import { useNetwork, useProviderHelper, useWallet } from '@xircus-web3/react'
import { Fragment, useMemo, useState } from 'react'

// size can be full w or not
// checks if correct network
// checks if has token approval
// if no balance tell to purchase

export const BuyButton = ({ item, btnProps, children, }) => {
  const helper = useProviderHelper()
  const network = useNetwork()
  const wallet = useWallet()
  const [approved, isApproved] = useState(false)

  const handleSwitchNetwork = () => {
    const networkId = network?.chains.find(c => c.short == item.chain)?.networkId
    network.switchNetwork(networkId)
  }

  const handleApprove = () => {

  }

  const handleProceed = async() => {
    const allowance = await helper.getAssetAllowance(wallet.account, item.marketAddr, item.currency)
    console.log("ITEM", item, allowance.allowance)
  }

  const renderPopAction = useMemo(() => {
    if (wallet.status != 'connected') {
      return (
        <Fragment>
          <PopoverHeader>Wallet Required</PopoverHeader>
          <PopoverBody>
            <Text mb={4}>Please connect your account wallet</Text>
            <Button size="sm" w="full" onClick={wallet.connectMetamask} isLoading={wallet.status == 'connecting'}>Connect</Button>
          </PopoverBody>                     
        </Fragment>
      )
    }

    if (item.chain != network?.network?.short) {
      return (
        <Fragment>
          <PopoverHeader>Incorrect Network</PopoverHeader>
          <PopoverBody>
            <Text mb={4}>Please switch to the correct network</Text>
            <Button size="sm" w="full" onClick={handleSwitchNetwork}>Switch</Button>
          </PopoverBody>   
        </Fragment>
      )      
    }

    return (
      <Fragment>
        <PopoverHeader>Confirming Purchase</PopoverHeader>
        <PopoverBody>
            <Text mb={4}>Are you sure to buy this item?</Text>
            <Button size="sm" w="full" onClick={handleProceed}>Proceed Purchase</Button>
          </PopoverBody>          
      </Fragment>
    )

  }, [wallet, network, item])

  return (
    <Popover>
      <PopoverTrigger>
        <Button {...btnProps}>Buy</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        { renderPopAction }
      </PopoverContent>
    </Popover>    
  )
}