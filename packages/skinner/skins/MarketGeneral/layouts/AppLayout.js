import { 
  Box, 
  Spacer, 
  useColorMode,
  useDisclosure,
  useColorModeValue as mode, 
  IconButton,
  HStack,
  Spinner,
  Avatar,
  Stack,
  Text,
  Center} from '@chakra-ui/react'
import { useApp, useUtils } from '@xircus-web3/react'
import { Fragment } from "react"
import { AppBrand, AppHeader, AppLinks } from '../components/AppContainer'
import Head from 'next/head'
import { TbSun, TbMoon } from 'react-icons/tb'
import AccountWallet from '../components/AccountWallet'
import AppFooter from '../components/AppFooter'
import { MobileDrawer } from '../components/Drawer'
import { NetworkSwitcherMobile } from '../components/NetworkSwitcher'
import { MobileWallet } from '../components/MobileWallet'
import { AppLinksMobile } from '../components/AppMenu'

export const AppLayout = ({ children }) => {
  const app = useApp()
  const utils = useUtils()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()  

  const routes = [
    {
      path: '/',
      label: 'Explore'
    },
    {
      path: '/categories',
      label: 'Categories'
    },
    {
      path: '/earn',
      label: 'Earn'
    },
    {
      path: '/tokens',
      label: 'Tokens'
    },
    {
      path: '/create',
      label: 'Create Listing'
    }    
  ]

  if (!app.name) {
    return <Spinner />
  }

  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;300;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <MobileDrawer isOpen={isOpen} onClose={onClose}>
        <Stack p={2} pt={12}>
          <Center mb={8}>
            <Avatar src={utils.ipfsUrl(app.logo)} />
          </Center>
          <MobileWallet onClose={onClose} />
          <Box h="40px" />
          <AppLinksMobile routes={routes} />
          <Box h="50px" />
          <NetworkSwitcherMobile />
          <HStack>
            <Text textAlign="center" color="gray.500" fontSize="xs">Powered By Xircus</Text>
            <Spacer />
            <Text textAlign="center" color="gray.500" fontSize="xs">Unverified</Text>            
          </HStack>
        </Stack>
      </MobileDrawer>
      <AppHeader>
        <AppBrand
          title={app.name}
          logo={utils.ipfsUrl(app.logo)}
          onMenuClick={onOpen}
          />
          <AppLinks routes={routes}  />
        <Spacer />
        <HStack display={{ base: 'none', md: 'flex' }}>
          <IconButton size="sm" variant="ghost" onClick={toggleColorMode} icon={colorMode == 'dark' ? <TbSun /> : <TbMoon />} />
          <AccountWallet />
        </HStack>
      </AppHeader>
      <Box minH="100vh">
        {children}
      </Box>
      <AppFooter />
    </Fragment>
  )
}

export default AppLayout