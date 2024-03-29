import { useMemo } from 'react'
import { Box, Container, HStack, Text, Textarea } from "@chakra-ui/react"
import { useBlockItem } from "../hooks/provider"
import { OutlineCard } from '../components/CustomCard'
import ThemePopEditor from '../editor/ThemePopEditor'

export const TemplateDefaults = {
  name: '',
  group: '',
  theme: {},
  data: {}
}

export const TemplateName = props => {
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
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