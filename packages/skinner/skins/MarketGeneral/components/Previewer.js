import { useState } from 'react';
import Sticky from 'wil-react-sticky';

import { IoColorFilterOutline } from 'react-icons/io5'
import {
  Box, Heading, Img, HStack, Center, Spacer, Switch, Text,
  useColorMode
} from '@chakra-ui/react'

import { GradientBox } from './GradientBox'

export const BoxPreviewer = ({ url, type, ...rest }) => {
  switch (type) {
    case 'image':
      return (
        <Center w="full" {...rest}>
          <Img
            src={url}
            objectFit="cover"
            objectPosition="center center"
            h="full"
            />
        </Center>
      )
      break;
    case 'video':
      return (
        <Center as="video" controls {...rest}>
          <Box as="source" src={url} />
        </Center>
      )
      break;
    case 'audio':
      return (
        <Center as="audio" controls {...rest}>
          <Box as="source" src={url} />
        </Center>
      )
    default:
      return null;
  }
}

export const PreviewBox = ({ type, url }) => {
  switch (type) {
    case 'image':
      return (
        <Center>
          <Img
            src={url}
            objectFit="cover"
            objectPosition="center center"
            h="300px"
            />
        </Center>
      )
      break;
    case 'video':
      return (
        <Box>
          <Box as="video" controls w="100%">
            <Box as="source" src={url} />
          </Box>
        </Box>
      )
      break;
    case 'audio':
      return (
        <Box my={4}>
          <Box as="audio" controls w="100%">
            <Box as="source" src={url} />
          </Box>
        </Box>
      )
    default:
      return <Center h="300px"><IoColorFilterOutline fontSize="120px" /></Center>
  }
}

export const Previewer = ({
  children,
  unlockable, preview, url, type, name = 'Content Name', editions = '1',
  price = '0', currency = 'BNB', listing = '1'
}) => {
  const { colorMode } = useColorMode()
  const [show, setShow] = useState(true)

  const renderByType = (url) => {
    switch (type) {
      case 'image':
        return (
          <Center>
            <Img
              src={url}
              objectFit="cover"
              objectPosition="center center"
              h="300px"
              />
          </Center>
        )
        break;
      case 'video':
        return (
          <Box>
            <Box as="video" controls w="100%">
              <Box as="source" src={url} />
            </Box>
          </Box>
        )
        break;
      case 'audio':
        return (
          <Box my={4}>
            <Box as="audio" controls w="100%">
              <Box as="source" src={url} />
            </Box>
          </Box>
        )
      default:
        return <Center h="300px"><IoColorFilterOutline fontSize="120px" /></Center>
    }
  }

  return (
    <Sticky offsetTop={20} offsetBottom={20}>
      <Box w={{ base: '100%', md: '300px' }} mt="65px">
        <Heading size="xs" mb={4} letterSpacing={2} color="gray.500">PREVIEW</Heading>
        <GradientBox
          pos="relative"
          borderWidth={2}
          overflow="hidden"
          borderRadius="lg">
          {
            unlockable && (
              <HStack mt={4} ml={4}>
                <Switch colorScheme="purple" size="sm" onChange={e => setShow(e.target.checked)} />
                <Text>{show ? 'Owner View' : 'Public View' }</Text>
              </HStack>
            )
          }
          <Box p={4} pb={0} borderRadius="md" overflow="hidden">
            { show ? <PreviewBox type={type} url={url} /> : <PreviewBox type={type} url={preview} /> }
          </Box>
          <Box p={4}>
            <Heading size="sm" mb={2}>{name}</Heading>
            <HStack>
              <Heading size="xs">1 / {editions}</Heading>
              <Spacer />
              <Heading size="xs" color="gray.500">{(listing == 2 || listing == 3) ? 'Bid' : 'Buy'}</Heading>
              <Heading size="xs"> {price} {currency}</Heading>
            </HStack>
          </Box>
        </GradientBox>

        { children }

      </Box>
    </Sticky>
  )
}
