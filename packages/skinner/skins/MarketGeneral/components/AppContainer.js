import { Fragment } from 'react'
import Link from 'next/link'
import {
  Box, HStack, Container, Img, Button, Spacer, Heading, Text, IconButton,
  Menu, MenuButton, MenuList, MenuItem, Stack, Divider, CloseButton,
  useColorModeValue as mode,
  List
} from '@chakra-ui/react'

import { IoClose, IoMenu } from 'react-icons/io5'
import { GradientLoader } from './GradientLoader'

export const AppHeader = ({ children, top, bottom, ...rest }) => (
  <Box {...rest}>
    {top}
    <Box
      bg={mode('rgba(255,255,255,0.7)', 'rgba(0,0,0,0.7)')}
      backdropFilter="blur(20px)"
      py={2} pos="fixed" w="full" zIndex="1000">
      <Container maxW="container.xl">
        <HStack>
          {children}
        </HStack>
      </Container>
      {bottom}
    </Box>
  </Box>

)

export const AppSpacer = () => <Box h="72px" />

export const AppBrand = ({ logo, title = '', onMenuClick }) => (
  <HStack w={{ base: 'full', md: 'auto' }} minH="50px" mr={{ base: 0, md: 8 }}>
    <Link href="/">
      <Box cursor="pointer">
        {
          logo
          ? <Img src={logo} boxSize="40px" borderRadius="full" />
          : <Heading size="md">{title}</Heading>
        }
      </Box>
    </Link>
    <Spacer />
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      variant="ghost"
      mr={0}
      onClick={onMenuClick}
      icon={<IoMenu fontSize="30px" />}
      />
  </HStack>
)

export const AppLinks = ({ routes = [], direction = 'row', children, btnProps, ...rest }) => (
  <Stack
    fontWeight="bold"
    direction={direction}
    alignItems="center"
    display={{ base: (direction == 'column' ? 'flex' : 'none'), md: 'flex' }}
    {...rest}>
    {
      routes.map((route, rId) =>
        route.isDivider
        ? <Divider key={route.key} orientation={direction === 'row' ? 'vertical' : 'horizontal'} h={direction == 'column' ? 'auto' : '30px'} alignSelf="center" borderWidth="1px" />
        : route.render ? <Fragment key={rId}>{route.render()}</Fragment> : <Link href={route.path} key={route.path}><Button size="sm" variant="ghost" {...route.btnProps} {...btnProps}>{route.label}</Button></Link>)
    }
    {children}
  </Stack>
)