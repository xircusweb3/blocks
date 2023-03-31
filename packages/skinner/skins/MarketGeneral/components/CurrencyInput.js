import { Box, HStack, Text, Avatar } from "@chakra-ui/react"
import { useAppData, useNetwork, useProviderHelper } from "@xircus-web3/react"
import { useMemo, useState } from "react"
import { FormInput, FormSelect, FormSwitch } from "./Form"

export const CurrencyInput = ({ onChange, onSelect }) => {
  const helper = useProviderHelper()
  const network = useNetwork()
  const appData = useAppData()
  const currencies = useMemo(() => 
    (appData?.currencies || []).filter(c => c.chain == network?.network?.short).map(c => ({ label: c.name, value: c.hashId })), 
    [appData.currencies]
  )
  const [currency, setCurrency] = useState(helper.getNativeCurrency())
  const [native, setNative] = useState(false)

  const handleChangeCurrency = ({ target: { value } }) => {
    const currency = appData?.currencies.find(c => c.hashId == value)
    setCurrency(currency)
    onSelect && onSelect(currency)
  }

  const handlePayNative = ({ target: { checked } }) => {
    setNative(checked)
    if (checked) {
      const currency = helper.getNativeCurrency()
      setCurrency(currency)
      onSelect && onSelect(currency)      
    } else {
      setCurrency(false)
    }
  }

  return (
    <Box>
      <FormSwitch 
        isChecked={native}
        label={`Pay with ${currency.symbol}`} 
        onChange={handlePayNative} 
        control={{ mb: 4 }}        
        />
      <FormSelect 
        label="Currency To Pay" 
        options={currencies} 
        onChange={handleChangeCurrency}
        control={{ isRequired: true, mb: 4 }}
        />
      <FormInput 
        label="Price" 
        name="price" 
        autoComplete="none"
        type="decimal"
        right={
          <HStack>
            <Text>{currency.symbol}</Text>
            <Avatar boxSize="16px" bg="transparent" src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${network?.network?.short == 'bsc' ? 'smartchain' : network.network.short}/assets/${currency.address}/logo.png`} />
          </HStack>
        }
        onChange={onChange}
        rightProps={{ fontSize: 'sm', fontFamily: 'mono', fontWeight: 'bold', color: 'gray.500' }}
        control={{ isRequired: true, mb: 4 }}                    
        />        
    </Box>
  )
}