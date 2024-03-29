import { useMemo } from 'react'
import { Box, Container, Textarea } from "@chakra-ui/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemePopEditor from '../../editor/ThemePopEditor'

export const CallToActionDefaults = {
  name: 'CallToAction',
  group: 'main',
  theme: {
    wrap: {}
  },
  data: {}
}

export const CallToAction = props => {
  const { edit } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box minH={edit ? '30px' : 'auto'} {...theme?.wrap}>
        <Container overflow="hidden" {...theme?.container}>
          {data?.text}
        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemePopEditor {...getEditorActions}>
        <OutlineCard title="Content">
          <Textarea size="sm" onChange={handleInput} name="text" value={data?.text} />
        </OutlineCard>
      </ThemePopEditor>
      {renderContent}
    </>
  )
}