import { useMemo } from 'react'
import { Grid, Box, Container, Heading, Center, Image, Avatar, Text, Input, 
  Button, HStack, VStack, List, ListItem,
  useColorModeValue as mode
} from '@chakra-ui/react'
import { useUtils } from '@xircus-web3/react'
import { IoDiamond, IoFlash, IoGift, IoHelpBuoy, IoHome, IoLayers, IoPodium, IoReceipt, IoShapes, IoStorefront } from 'react-icons/io5'
import { TbApps, TbBolt, TbBrandPocket, TbChartCircles, TbCircle, TbCircles, TbComet, TbConfetti, TbCrown, TbCurrencyRipple, TbFlame, TbIcons, TbMist, TbReplace, TbSeeding, TbUserCircle, TbUsers } from "react-icons/tb"
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemeEditor from '../../editor/ThemeEditor'
import { NameValueForm } from '../../components/Form'
import Link from 'next/link'

const icons = {
  storefront: <IoStorefront />,
  helpbouy: <IoHelpBuoy />,
  diamond: <IoDiamond />,
  shapes: <IoShapes />,
  receipt: <IoReceipt />,
  podium: <IoPodium />,
  flash: <IoFlash />,
  user: <TbUserCircle />,
  users: <TbUsers />,
  apps: <TbApps />,
  icons: <TbIcons />,
  replace: <TbReplace />,
  mist: <TbMist />,
  seed: <TbSeeding />,
  flame: <TbFlame />,
  ripple: <TbCurrencyRipple />,
  crown: <TbCrown />,
  confetti: <TbConfetti />,
  comet: <TbComet />,
  circle: <TbCircles />,
  currency: <TbChartCircles />,
  bolt: <TbBolt />,
  pocket: <TbBrandPocket />
}

export const SidebarDefault = {
  name: 'Sidebar',
  group: 'left',
  theme: {
    wrap: { w: 'full' },
    container: { w: 'full' },
    content: {},
  },
  data: {
    links: [
      { path: '/', label: 'Explore', icon: 'bolt' },
      { path: '/collections', label: 'Collections', icon: 'diamond' },
      { path: '/creators', label: 'Creators', icon: 'users' },      
      { path: '/categories', label: 'Categories', icon: 'icons' },
      { path: '/earn', label: 'Earn', icon: 'replace' },
      { path: '/tokens', label: 'Tokens', icon: 'currency' },
      { path: '/about', label: 'About', icon: 'mist' },
      { path: '/my/listings', label: 'My Listings', icon: 'apps' },
      { path: '/my/wallets', label: 'My Wallets', icon: 'pocket' },      
      { path: '/my/profile', label: 'My Profile', icon: 'user' },    
    ]
  }
}

const ListLink = ({ path = '#', children, theme, btnProps }) => (
  <ListItem {...theme?.link}>
    <Link href={path}>
      <Button variant="ghost" w="full"  justifyContent="flex-start" {...btnProps} {...theme?.linkBtn}>{children}</Button>
    </Link>
  </ListItem>  
)

export const Sidebar = props => {
  const utils = useUtils()
  const { app } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderLinks = useMemo(() => {
    return (data?.links || []).map(
      link => (
        <ListLink key={link.path} theme={theme} btnProps={{ leftIcon: icons[link.icon || 'home'] }}>
          {link.label}
        </ListLink>
      ))
  }, [data, theme])

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Center py={6}>
          <Avatar src={utils.ipfsUrl(app.logo)} />
        </Center>        
        <List p={4} spacing={1} {...theme?.list}>
          {renderLinks}
        </List>
      </Box>               
    )
  }, [data, theme, app, renderLinks])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard title="Content" mb={4}>
        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}