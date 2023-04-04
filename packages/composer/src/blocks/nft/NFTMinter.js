import { useMemo } from 'react'
import { Box, Container, Textarea, Grid, Image, Button, HStack, Heading, Text } from "@chakra-ui/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemePopEditor from '../../editor/ThemePopEditor'
import { FormInput, FormTextArea } from '../../components/CustomInput'
import BoringAvatar from 'boring-avatars'
import ThemeEditor from '../../editor/ThemeEditor'

export const NFTMinterDefaults = {
  name: 'NFTMinter',
  group: 'main',
  theme: {
    wrap: {},
    container: { maxW: 'container.md' }
  },
  data: {
    assetAddress: '',
    chain: '' 
  }
}

export const NFTMinter = props => {
  const { edit } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderAssetInfo = useMemo(() => {
    return (
      <HStack bg="gray.500" p={6} mb={4} rounded="md" gap={4}>
        <BoringAvatar variant="bauhaus" size={50} />
        <Box>
          <Heading size="sm">Asset Name</Heading>
          <Text>Asset Address</Text>
        </Box>
      </HStack>
    )
  }, [data?.assetAddress])

  const renderContent = useMemo(() => {
    return (
      <Box minH={edit ? '30px' : 'auto'} {...theme?.wrap}>
        <Container my={12} {...theme?.container}>
          {renderAssetInfo}
          <Grid templateColumns={{ base: 'auto', md: 'auto 300px' }} gap={4}>
            <Box>
              <FormInput 
                label="Name"
                name="name"
                control={{ mb: 4 }}
                />
              <FormTextArea 
                label="Description"
                name="description"
                control={{ mb: 4 }}                
                />                
              <FormInput 
                label="Background Color"
                name="name"
                help="for Opensea"
                control={{ mb: 4 }}                
                />                
              <FormInput 
                label="External URL"
                name="name"
                help="for Opensea"
                control={{ mb: 4 }}
                />                                
            </Box>
            <Box>
              <Box mt={6} >
                <Image minH={300} fallbackSrc="http://placehold.it/300x300" w="full" objectFit="cover" rounded="md" />
              </Box>
            </Box>
          </Grid>
          <Button w="full">Mint To IPFS</Button>
        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard title="Content" mb={4}>
          <Textarea size="sm" onChange={handleInput} name="text" value={data?.text} />
        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}