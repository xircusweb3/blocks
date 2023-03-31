import { 
  Text, Heading, Container, Button, Grid, Spinner,
  HStack, Tag, Avatar, Spacer, Center, VStack,
  Box, Code, useColorModeValue as mode, IconButton, Input, FormLabel, ButtonGroup, useToast, FormHelperText, FormControl } from '@chakra-ui/react'
import { useProviderHelper, useNetwork, useWallet, useDebounce } from '@xircus-web3/react'

import { FormInput } from './Form'
import { useEffect, useMemo, useState } from 'react'
import BoringAvatar from "boring-avatars"
import { IoCheckmarkDone } from 'react-icons/io5'
import { TbCheck, TbPlus, TbTrash, TbX } from 'react-icons/tb'

const ASSET_STATE = {
  name: '',
  symbol: '',
  totalSupply: '',
  assetAddr: '',
  assetType: false,
  assetId: 0,
  quantity: 1
}

const ASSET_TYPES = {
  0: 'Unknown',
  1: 'EIP20',
  2: 'EIP721',
  3: 'EIP1155'
}

const keyItem = () => Math.random().toString().substr(6, 14)

export const AssetItemIds = ({ assetAddr, onComplete }) => {
  const [assets, setAssets] = useState({})
  const [assetIds, setAssetIds] = useState([{ value: 0, key: keyItem() }])

  const handleAdd = () => {
    setAssetIds([...assetIds, { key: keyItem(), value: 0 }])
  }

  const handleVerified = (assetId) => {
    setAssets({ ...assets, [assetId]: true })
    console.log("VERIFIED", assetId)
  }

  const handleRemove = (key) => {
    setAssetIds(assetIds.filter(o => o.key != key))
  }

  const handleComplete = () => {
    console.log("ASSETS", assets)
    onComplete && onComplete(assets)
  }

  return (
    <FormControl>
      <FormLabel mb={0}>Asset IDs</FormLabel>
      <Text color="gray.500" fontSize="sm">Add one or more asset ids to verify your ownership</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)' }} gap={2} mb={4} alignItems="flex-end">
        { 
          assetIds.map((o, assetIdKey) => 
            <AssetItemId 
              key={o.key} 
              assetKey={o.key}
              assetAddr={assetAddr} 
              onVerified={handleVerified}
              onRemove={handleRemove}
              />
          )
        }
        <Button w="full" onClick={handleAdd}>Add</Button>
      </Grid>
      <Button w="full" onClick={handleComplete}>Add Asset</Button>
    </FormControl>
  )
}

export const AssetItemId = ({ assetAddr, onVerified, control, onRemove, ...rest }) => {
  const wallet = useWallet()
  const provider = useProviderHelper()
  const toast = useToast()
  const [assetId, setAssetId] = useState(0)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const bounceId = useDebounce(assetId)

  useEffect(() => {
    if (bounceId) {
      handleVerify()
    }
  }, [bounceId])

  const loadAssetURI = async() => {
    const uri = await provider.getAssetURI(assetAddr, assetId, wallet.network.short)
    console.log("URI", uri)
  }

  const handleVerify = async() => {
    setLoading(true)
    console.log("ASSET ID", assetId, assetAddr, wallet.account)
    if (assetAddr && wallet.account) {
      const isOwner = await provider.verifyOwnership(wallet.account, assetAddr, assetId, wallet.network.short)
      if (isOwner) {
        setVerified(isOwner)
        onVerified && onVerified(assetId)
        toast({
          title: 'Ownership Verification Successful',
          status: 'success',
          isClosable: true
        })      
      } else {
        toast({
          title: 'Asset Not Owned',
          status: 'error',
          isClosable: true
        })
  
      }
    }
    setLoading(false)
  }

  const handleRemove = () => {
    onRemove && onRemove(assetKey)
  }

  const handleChange = ({ target: { value } }) => {
    setVerified(false)
    setAssetId(value)
  }

  return (
    <Box {...control}>
      <FormInput 
        right={(
          <ButtonGroup isAttached>
            { 
            verified 
              ? <IconButton size="xs" variant="ghost" color="green" icon={<TbCheck />} /> 
              : <Button size="xs" variant="ghost" isLoading={loading} onClick={handleVerify}>Verify</Button>
            }
            { onRemove && <IconButton size="xs" variant="ghost" onClick={handleRemove} icon={<TbX />} /> }
          </ButtonGroup>
        )}
        type="number"
        min={0}
        step={1}
        value={assetId}
        onChange={handleChange}
        {...rest}
        />
      <Button size="sm" w="full" onClick={loadAssetURI}>Get Asset Item Metadata</Button>
    </Box>
  )  
}

export const AssetFormInput = ({ onComplete }) => {
  const wallet = useWallet()
  const provider = useProviderHelper()
  const network = useNetwork()
  const toast = useToast()
  const [asset, setAsset] = useState(false)
  const [assetAddr, setAssetAddr] = useState('')
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)

  const resetAsset = () => {
    setAsset(false)
    setAssetAddr('')
  }

  const handleChangeAddr = async({ target: { value: assetAddr } }) => {
    setLoading(true)
    setAssetAddr(assetAddr)
    const assetInfo = await provider.getAssetInfo(assetAddr, network?.network?.short)
    if (assetInfo) {
      if (assetInfo.assetType == 2 || assetInfo.assetType == 3) {
        setAsset({ ...asset, assetAddr, ...assetInfo })
      } else {
        resetAsset()    
      }
    } else {
      resetAsset()
    }
    setLoading(false)
  }

  const handleComplete = async() => {
    setAdding(true)
    console.log("COMPLETE", assetAddr, wallet.account, wallet.network.short)
    if (assetAddr && wallet.account) {
      const status = await provider.addWalletCollection(wallet.account, assetAddr, wallet.network?.short)
      console.log("ADDED STATUS", status)
      onComplete && onComplete(assetAddr)
      resetAsset()
      toast({
        title: 'Asset Added',
        isClosable: true
      })
    }
    setAdding(false)    
  }

  return (
    <Box mb={4}>
      <FormInput 
        name="assetAddr"
        label="Asset Address"
        value={assetAddr}
        placeholder="Paste the contract address of your NFT collection that you want to list"
        control={{ mb: 6 }}
        right={loading ? <Spinner size="sm" /> : <Tag>{ASSET_TYPES[asset?.assetType || 0]}</Tag>}
        onChange={handleChangeAddr}
        />
      {
        (assetAddr && asset) && (
          <HStack borderWidth={1} gap={2} p={4} mb={6} rounded="md">
            <BoringAvatar size={40} name={asset.assetAddr} />
            <HStack w="full" fontSize="xs">
              <Box w="full">
                <Text>Asset Name: <b>{asset.name}</b></Text>
                <Text>Asset Symbol: <b>{asset.symbol}</b></Text>              
              </Box>
              <Box w="full">
                <Text>Asset Type: <b>{ASSET_TYPES[asset.assetType]}</b></Text>
                <HStack><Text>Total Supply: </Text><Text fontWeight="bold" fontFamily="mono">{asset.totalSupply}</Text></HStack>
              </Box>
            </HStack>
          </HStack>
        )
      }
      <Button w="full" disabled={!(assetAddr && asset)} isLoading={adding} onClick={handleComplete}>Add Asset</Button>
    </Box>
  )

}

// { assetAddr && <AssetItemIds assetAddr={assetAddr} /> }
