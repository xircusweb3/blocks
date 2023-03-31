import { useMemo } from 'react'
import { Grid, Box, Container, Heading, Center, Image, Textarea } from '@chakra-ui/react'
import { useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemePopEditor from '../../editor/ThemePopEditor'

export const HeroDefault = {
  name: 'Hero',
  group: 'main',
  theme: {
    wrap: { py: 12 },
    container: {  maxW: '100%', px: 0 },
    grid: { gap: 8 },
    content: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', p: { base: '4', md: '0' } },
    image: { },
    title: { size: 'lg' },
    desc: { size: 'md' }
  },
  data: {
    variant: 'left',
    image: 'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=1000x750&vertical=top',
    title: 'Title Goes Here',
    desc: 'Content Goes Here',
  }
}

export const Hero = props => {
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    switch(data?.variant) {
      case 'left':
        return (
          <Box {...theme?.wrap}>
            <Container {...theme?.container}>
              <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)' }} {...theme?.grid}>
                <Image src={data.image} {...theme?.image} />
                <Center {...theme?.content}>
                  <Heading {...theme?.title}>{data.title}</Heading>
                  <Heading {...theme?.desc}>{data.desc}</Heading>
                </Center>
              </Grid>
            </Container>
          </Box>              
        )
      case 'right':
        return (
          <Box {...theme?.wrap}>
            <Container {...theme?.container}>
              <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)' }} {...theme?.grid}>
                <Center {...theme?.content}>
                  <Heading {...theme?.title}>{data.title}</Heading>
                  <Heading {...theme?.desc}>{data.desc}</Heading>
                </Center>
                <Image src={data.image} {...theme?.image} />
              </Grid>
            </Container>
          </Box>              
        )          
    }
  }, [data, theme])

  return (
    <>
      <ThemePopEditor {...getEditorActions}>
        <OutlineCard title="Content">
          <Textarea size="sm" onChange={handleInput} name="title" value={data?.title} />
          <Textarea size="sm" onChange={handleInput} name="desc" value={data?.desc} />          
        </OutlineCard>
      </ThemePopEditor>
      {renderContent}
    </>
  )
}