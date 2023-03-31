import { useMemo } from 'react'
import { Box, Container, Heading, Center, Image, Code, Textarea, Button, List, ListItem } from '@chakra-ui/react'
import { useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ReactMarkdown from 'react-markdown'
import ThemeEditor from '../../editor/ThemeEditor'

export const MarkdownDefault = {
  name: 'Markdown',
  group: 'main',
  theme: {
    wrap: { },
    container: { maxW: 'container.xl' },
    content: {},
  },
  data: {
    content: 'Content Goes Here',
  }
}

const markdownComponents = {
  h1: ({ node, ...props }) => <Heading size="2xl" mb={2} {...props} />,
  h2: ({ node, ...props }) => <Heading size="xl" mb={2} {...props} />,
  p: ({ node, ...props }) => <Box py={4} {...props} />,  
  a: ({ node, ...props }) => <Button variant="link" {...props} />,  
  ul: ({ node, ...props }) => <List py={4} {...props} />,
  li: ListItem,
  code: ({ node, ...props }) => <Code size="xl" {...props} />,
}

export const Markdown = props => {
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Container {...theme?.container}>
          <ReactMarkdown components={markdownComponents}>
            {data?.content}
          </ReactMarkdown>
        </Container>
      </Box>               
    )
  }, [data, theme, markdownComponents])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard title="Content" mb={4}>
          <Textarea size="sm" onChange={handleInput} name="content" value={data?.content} />
        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}