import { useMemo } from 'react'
import { Box, Container } from "@chakra-ui/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemeEditor from '../../editor/ThemeEditor'
import { FormInput } from '../../components/CustomInput'

export const ExchangeSwapDefaults = {
  name: 'ExchangeSwap',
  group: 'main',
  theme: {
    wrap: {},
    container: { maxW: 'container.md' }
  },
  data: {
    inAddress: '',
    outAddress: ''
  }
}

export const ExchangeSwap = props => {
  const { edit } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box minH={edit ? '30px' : 'auto'} {...theme?.wrap}>
        <Container {...theme?.container}>
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