import { useMemo } from 'react'
import { HStack, Box, Container, Spacer, Avatar, Heading, Button, useColorMode, IconButton, useDisclosure } from '@chakra-ui/react'
import { useUtils, useWallet } from "@xircus-web3/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemePopEditor from '../../editor/ThemePopEditor'
import { ConnectButton } from '../../components/ConnectButton'
import { Wallet } from '../../components/Wallet'

export const AppHeaderDefaults = {
  name: 'AppHeader',
  group: 'header',
  theme: {
    wrap: { bg: 'transparent', shadow: 'none', py: 2 },
    container: { maxW: '1440px', bg: 'transparent' },
    stack: {},
    logo: { size: 'md' },
    name: { color: '#fff', size: 'lg', fontFamily: 'Space Grotesk' }
  },
  data: {
    logo: true,
    name: true,
    wallet: true,
    colorMode: true    
  }
}

export const AppHeader = props => {
  const { app } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)
  const utils = useUtils()
  const wallet = useWallet()  

  const renderBrand = useMemo(() => {
    return (
      <HStack {...theme?.stack}>
        { data.logo && <Avatar src={utils.ipfsUrl(app.logo)} {...theme?.logo} /> }
        { data.name && <Heading display={{ base: 'none', md: 'inline-block' }} {...theme?.name}>{app.name}</Heading> }
      </HStack>
    )
  }, [data, theme, app])

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Container overflow="hidden" {...theme?.container}>
          <HStack>
            {renderBrand}
            <Spacer />
            <ConnectButton>
              <Wallet />
            </ConnectButton>
          </HStack>
        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemePopEditor {...getEditorActions}>
        <OutlineCard title="Content">

        </OutlineCard>
      </ThemePopEditor>
      {renderContent}
    </>
  )
}