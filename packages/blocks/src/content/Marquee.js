import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Box, Container, HStack, Text, Textarea, useDimensions } from "@chakra-ui/react"
import { useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/Card'
import ThemePopEditor from '../../editor/ThemePopEditor'

export const MarqueeDefault = {
  name: 'Marquee',
  theme: {
    wrap: { bgGradient: 'linear(to-l, #7928CA, #FF0080)', py: 2 },
    container: { w: 'full', maxW: 'full', bg: 'transparent' },
    text: { fontSize: '1em', fontWeight: 'bold', color: 'white', fontFamily: 'Space Grotesk' }    
  },
  data: {
    text: 'Xircus made this marquee text customizable so you can always broadcase your message to your users'
  }
}

const transition = {
  repeat: Infinity,
  repeatType: 'loop',
  duration: 20,
  ease: 'linear'
}

export const Marquee = props => {
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)
  const ref = useRef()
  const dimensions = useDimensions(ref)
  const themer = MarqueeDefault.theme

  const renderContent = useMemo(() => {
    return (
      <Box {...themer.wrap} {...theme?.wrap}>
        <Container overflow="hidden" {...themer.container} {...theme?.container}>
          <Box as={motion.div} animate={{ x: [0, -(dimensions?.borderBox.width)], transition }}>
            <HStack ref={ref} whiteSpace="nowrap" gap={10}>
              <Text {...themer.text} {...theme?.text}>{data?.text}</Text>
              <Text {...themer.text} {...theme?.text}>{data?.text}</Text>
              <Text {...themer.text} {...theme?.text}>{data?.text}</Text>
            </HStack>
          </Box>
        </Container>
      </Box>
    )
  }, [data, theme, dimensions, transition])

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