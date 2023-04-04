import { useMemo } from 'react'
import { Box, Container } from "@chakra-ui/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemeEditor from '../../editor/ThemeEditor'
import { FormInput } from '../../components/CustomInput'

export const TokenBalanceDefaults = {
  name: 'TokenBalance',
  group: 'main',
  theme: {
    wrap: {},
    container: { maxW: 'container.md' }
  },
  data: {
    assetAddress: '',
    walletAddress: '',
    chain: '' 
  }
}

export const TokenBalance = props => {
  const { edit } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box minH={edit ? '30px' : 'auto'} {...theme?.wrap}>
        <Container my={12} {...theme?.container}>

        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard title="Content" mb={4}>
          <FormInput 
            label="Token Address"
            value={data?.assetAddress}
            control={{ mb: 4 }}
            />
          <FormInput 
            label="Wallet Address"
            value={data?.walletAddress}
            control={{ mb: 4 }}
            />            
        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}