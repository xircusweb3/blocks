import { useMemo } from 'react'
import { Box, Text, Textarea } from "@chakra-ui/react"
import { useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/Card'
import ThemePopEditor from '../../editor/ThemePopEditor'

export const MarqueeDefault = {
  name: 'Marquee',
  icon: '',
  tab: 'content',
  theme: {

  },
  data: {

  }
}

export const Marquee = props => {
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Text {...theme?.text}>{data?.text}</Text>
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