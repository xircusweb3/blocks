import { useMemo } from 'react'
import { HStack, Box, Container, Spacer, Avatar, Heading,  
  FormControl, FormLabel, Flex,
  Switch, Button, useColorMode, IconButton, useDisclosure
} from '@chakra-ui/react'
import { useUtils, useWallet } from "@xircus-web3/react"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemePopEditor from '../../editor/ThemePopEditor'
import { ConnectButton } from '../../components/ConnectButton'
import { Wallet } from '../../components/Wallet'
import Link from 'next/link'
import { CustomSwitch } from '../../components/CustomSwitch'
import { ConnectModal } from '../../components/ConnectModal'

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
    links: [
      { key: 'explore', label: 'Explore', path: '/' },
      { key: 'creators', label: 'Creators', path: '/creators' },
      { key: 'earn', label: 'Earn', path: '/earn' },
      { key: 'create', label: 'Create', path: '/create' }
    ],
    align: 'left',
    logo: true,
    name: true,
    wallet: true,
    modal: false,
    colorMode: true    
  }
}

export const AppHeader = props => {
  const { app } = useBlock()
  const { data, theme, getEditorActions, handleInput, handleData } = useBlockItem(props)
  const utils = useUtils()

  const renderBrand = useMemo(() => {
    return (
      <Link href="/">
        <HStack {...theme?.stack}>
          { data.logo && <Avatar src={utils.ipfsUrl(app.logo)} {...theme?.logo} /> }
          { data.name && <Heading display={{ base: 'none', md: 'inline-block' }} {...theme?.name}>{app.name}</Heading> }
        </HStack>
      </Link>
    )
  }, [data, theme, app])

  const renderLinks = useMemo(() => {
    return (
      <HStack display={{ base: 'none', md: 'flex' }}>
        {(data?.links || []).map(link => (
          <Link key={link.key} href={link.path}>
            <Button variant="ghost">{link.label}</Button>
          </Link>
        ))}
      </HStack>
    )
  }, [data, theme])

  const renderWallet = useMemo(() => {
    if (data.modal) {
      return (
        <ConnectModal>
          <Wallet />
        </ConnectModal>
      )
    }
    return (
      <ConnectButton>
        <Wallet />
      </ConnectButton>
    )
  }, [data]) 

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Container overflow="hidden" {...theme?.container}>
          <HStack>
            {renderBrand}
            <Spacer />
            {renderLinks}
            <Spacer />
            {renderWallet}
          </HStack>
        </Container>
      </Box>
    )
  }, [data, theme])

  const handleSwitch = ({ target: { name, checked } }) => {
    console.log("TARGET", name, checked)
    handleData(name, checked)
  }

  return (
    <>
      <ThemePopEditor {...getEditorActions}>
        <OutlineCard title="Content">
          <CustomSwitch label="Name" onChange={handleSwitch} name="name" isChecked={data?.name} />
          <CustomSwitch label="Logo" onChange={handleSwitch} name="logo" isChecked={data?.logo} />          
          <CustomSwitch label="Modal" onChange={handleSwitch} name="modal" isChecked={data?.modal} />                    
        </OutlineCard>
      </ThemePopEditor>
      {renderContent}
    </>
  )
}