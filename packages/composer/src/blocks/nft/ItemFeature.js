import { useMemo } from "react"
import { Box, Container, Heading, Input, Textarea, Button, keyframes } from '@chakra-ui/react'
import { TbArrowRight } from "react-icons/tb"
import { motion } from "framer-motion"
import Link from "next/link"
import ThemeEditor from "../../editor/ThemeEditor"
import { useBlockItem } from "../../hooks/provider"
import { OutlineCard } from "../../components/CustomCard"

export const ItemFeatureDefault = {
  name: 'ItemFeature',
  theme: {
    wrap: {},
    container: { maxW: '1440px', bgSize: 'cover', h: '500px', rounded: { base: 'none', md: 'md' } },
    quote: { size: 'lg',  },
    grid: { templateColumns: { base: 'auto', md: 'repeat(4, 1fr)' } }
  },
  data: {
    href: '#',
    name: 'The Mummyfield Collection',
    itemId: '1542',
    price: '100',
    currency: 'USDC',
    action: 'Buy',
    image: 'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=1000x750&vertical=top'
  }
}

const keyFrames = keyframes`
  0% { background-position: center center; }
  50% { background-position: 100% 100%; }
  100% { background-position: center center; }  
`

const animation = `${keyFrames} 20s ease-in-out infinite`

export const ItemFeature = props => {
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Container as={motion.div} {...theme?.container} pos="relative" bgImage={data?.image} animation={animation}>
          <Box maxW="340px" w="full" rounded={{ base: 'none', md: 'md' }} bottom={2} p={6} right={2} pos="absolute" backdropFilter="blur(10px)">
            <Heading size="md">{data?.name}</Heading>
            <Heading fontFamily="mono">#{data?.itemId}</Heading>
            <Heading size="md" mb={4} fontFamily="mono">{data?.price} {data?.currency}</Heading>
            <Link href={data?.href || '#'}>
              <Button w="full" shadow="lg" rightIcon={<TbArrowRight />} bgGradient="linear(to-l, #7928CA, #FF0080)">{data?.action}</Button>        
            </Link>
          </Box>
        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard>
          <Input type="file" name="" mb={2} />
          <Textarea name="name" onChange={handleInput} value={data?.name} mb={2} />
          <Input name="itemId" onChange={handleInput} value={data?.itemId} mb={2} />
          <Input name="price" onChange={handleInput} value={data?.price} mb={2} />
          <Input name="currency" onChange={handleInput} value={data?.currency} mb={2} />          
        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}