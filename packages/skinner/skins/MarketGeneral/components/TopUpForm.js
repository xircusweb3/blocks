import { Box, Button, Divider, HStack, Spacer, Text, useToast } from "@chakra-ui/react"
import { useAppData, useNetwork, useProviderHelper, useSDKUtils, useWallet } from "@xircus-web3/react"
import { useEffect, useMemo, useState } from "react"
import { OutlineCard } from "./Card"
import { FormInput, FormSelect } from "./Form"


// What Currency
// How Many Credits
// Display Total To Pay
// Which Marketplace

const TOPUP_STATE = {
  currencyId: '',
  credits: 0,
  totalPrice: 0,
}

export const TopUpForm = ({ market, onComplete }) => {
  const appData = useAppData()
  const helper = useProviderHelper()
  const utils = useSDKUtils()
  const network = useNetwork()
  const wallet = useWallet()
  const toast = useToast()
  const currentChain = network?.network?.short
  const currencies = useMemo(() => 
    (appData?.currencies || []).filter(c => c.chain == currentChain).map(c => ({ label: c.name, value: c.hashId })), 
    [appData.currencies]
  )
  const [topup, setTopup] = useState(TOPUP_STATE)
  const [currency, setCurrency] = useState(false)
  const [balance, setBalance] = useState(0)
  const [allowance, setAllowance] = useState(0)

  useEffect(() => {
    handleBalance()
  }, [currency])

  const handleBalance = async() => {
    if (wallet.account && currency) {
      const balance = await helper.getAssetBalance(wallet.account, currency.address, currentChain)
      const allowance = await helper.getAssetAllowance(wallet.account, market.address, currency.address, currentChain)
      setBalance(parseFloat(balance.balance))
      setAllowance(parseFloat(allowance.allowance))
      console.log("BALANCE", balance, allowance, wallet.account, currency.address)
    }
  }

  const handleChangeCurrency = ({ target: { value } }) => {
    const currency = appData?.currencies.find(c => c.hashId == value)
    console.log("CURRENCY", currency, value)
    setCurrency(currency)
  }

  const handleChangeCredit = ({ target: { value: credits = 0 } }) => {
    setTopup({ 
      ...topup, 
      credits,
      totalPrice: credits * (market.listFee / 100)
    })
  }

  const handleApprove = async() => {
    if (topup.totalPrice > balance) {
      toast({
        title: `Not Enough ${currency.symbol} Balance`,
        status: 'info',
        isClosable: true
      })
      return
    }

    try {
      const priceInWei = utils.toWei(topup.totalPrice.toString(), currency.decimals)
      const tx = await helper.approveAllowance(currency.address, market.address, priceInWei)
      console.log("APPROVAL", tx, priceInWei.toString())
    } catch (e) {
      toast({
        title: e.reason || e.message,
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <Box>
      <OutlineCard mt={4} mb={12}>
        Only stable coins are accepted for buying listing credits
      </OutlineCard>
      <FormSelect 
        label="Select Currency"
        options={currencies}
        onChange={handleChangeCurrency}
        control={{ mb: 4 }}
        />
      <FormInput 
        type="number"
        value={topup.credits}
        onChange={handleChangeCredit}
        label="Listing Credits You Need"
        step={1}
        min={1}
        control={{ mb: 4 }}
        />
      <OutlineCard mb={4}> 
        <HStack>
          <Text>Fee</Text>
          <Spacer />
          <Text><b>${market.listFee / 100}</b> per listing credit</Text>
        </HStack>
        <Divider my={2} />
        <HStack>
          <Text>You will pay</Text>
          <Spacer />
          <Text fontWeight="bold">{topup.totalPrice}</Text>
          <Text color="gray.500">{currency.symbol}</Text>
        </HStack>
        <Divider my={2} />
        <HStack>
          <Text>Balance</Text>
          <Spacer />
          <Text fontWeight="bold">{balance}</Text>
          <Text color="gray.500">{currency.symbol}</Text>              
        </HStack>
      </OutlineCard>
      <Button w="full" mb={2} onClick={handleApprove}>Approve</Button>
      <Button w="full">Buy Credits</Button>
    </Box>
  )
}