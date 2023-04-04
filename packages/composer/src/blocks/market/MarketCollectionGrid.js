import { useMemo } from 'react'
import { Grid, Box, Container, Heading, Center, Image, Text, Tag, HStack, IconButton, Input, ButtonGroup, Button, VStack, useColorModeValue as mode, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Spacer, Select, Icon, layout, InputGroup, InputLeftElement, InputRightElement, InputRightAddon } from '@chakra-ui/react'
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemeEditor from '../../editor/ThemeEditor'
import { FormInput } from '../../components/CustomInput'
import { ItemCardMini, ItemCard } from './ItemCards'
import { TbAdjustmentsHorizontal, TbChevronDown, TbColumns, TbGridDots, TbGridPattern, TbLayoutGrid, TbSearch, TbSettings } from "react-icons/tb"

export const MarketCollectionsGridDefaults = {
  name: 'MarketCollectionsGrid',
  group: 'main',
  theme: {
    wrap: {},
    container: { maxW: 'container.xl' }
  },
  data: {
    items: [...Array(15).keys()],
    columns: 4,
    variant: 'mini'
  }
}

const ItemCardWrap = ({ variant, ...props }) => {
  switch(variant) {
    case 'mini':
      return <ItemCardMini {...props} />
    default:
      return <ItemCard {...props} />
  }
}

export const MarketCollectionsGrid = props => {
  const { edit } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderItems = useMemo(() => {
    return (
      <Grid gap={6} w="full" {...theme?.grid} templateColumns={{ base: 'auto', md: 'repeat(4, 1fr)' }}>
        { (data?.items).map((item, itemKey) => <ItemCardWrap variant={data?.variant || 'mini'} key={itemKey} item={item} theme={theme} />) }
      </Grid>      
    )
  }, [theme, data])

  const renderContent = useMemo(() => {
    return (
      <Box minH={edit ? '30px' : 'auto'} {...theme?.wrap}>
        <Container {...theme?.container}>
          {renderItems}
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