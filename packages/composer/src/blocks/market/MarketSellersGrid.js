import { useMemo } from 'react'
import { Box, Container, Grid } from "@chakra-ui/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemeEditor from '../../editor/ThemeEditor'
import { FormInput } from '../../components/CustomInput'
import { SellerCard } from './SellerCards'

export const MarketSellersGridDefaults = {
  name: 'MarketSellersGrid',
  group: 'main',
  theme: {
    wrap: { py: 8 },
    container: { maxW: 'container.xl', bg: 'transparent' },
    grid: { templateColumns: { base: 'auto', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 4 },
    sellerCard: {},
    sellerAvatar: {},
    sellerContent: {},
    sellerName: {},
    sellerText: {}
  },
  data: {
    url: '',
    sellers: []
  }
}

export const MarketSellersGrid = props => {
  const { edit } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box minH={edit ? '30px' : 'auto'} {...theme?.wrap}>
        <Container {...theme?.container}>
          <Grid {...theme?.grid}>
            <SellerCard theme={theme} />
            <SellerCard theme={theme} />
            <SellerCard theme={theme} />
            <SellerCard theme={theme} />
            <SellerCard theme={theme} />
            <SellerCard theme={theme} />            
          </Grid>
        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard title="Content" mb={4}>
          
        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}