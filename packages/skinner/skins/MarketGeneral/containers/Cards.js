import { 
  Avatar, Box, Button, Flex, Heading, HStack, IconButton, Image, Spacer, Tag, Text,
  useColorModeValue as mode
} from "@chakra-ui/react";
import { useNetwork, useProviderHelper, useSDKUtils } from "@xircus-web3/react";
import { IoHeart } from "react-icons/io5";
import BoringAvatar from 'boring-avatars'
import { TbExternalLink } from "react-icons/tb";
import NextLink from 'next/link'
import { CopyAddress } from "../components/Copy";
import { BuyButton } from "../components/BuyButton";
import Link from "next/link";

export const ItemCard = ({ item }) => {
  return (
    <Box 
      p={4}
      borderWidth={1} 
      borderColor={mode('gray.100', 'gray.900')}
      rounded="xl"
      cursor="pointer"
      position="relative"
      transition="all 300ms ease"
      _hover={{ bg: mode('gray.100', 'rgba(0,0,0,0.4)'), transform: 'scale(1.01)' }}>
      
      <NextLink href={`/nfts/${item._id}`}>
        <Image w="full" h={240} src={item.imageUrl} objectFit="cover" objectPosition="center center" fallbackSrc="https://source.unsplash.com/random" rounded="sm" mb={4} />
      </NextLink>

      <HStack 
        mb={2} rounded="full" 
        fontSize="sm" pos="absolute" 
        top={5} left={5} bg={mode('gray.100', 'gray.900')} p={1} px={2} as="a" href={item.assetUrl} target="_blank">
        <BoringAvatar name={item.assetAddr} size={20} />
        <Box>
          <Text>{item.assetShort}</Text>
        </Box>
      </HStack>      

      <Box pos="absolute" right={5} top={5}>
        <IconButton icon={<TbExternalLink />} variant="ghost" size="xs" as="a" href={item.nftUrl} target="_blank" />
      </Box>

      <Heading size="sm" mb={2}>{item.name}</Heading>
      
      <HStack fontSize="sm" mb={2}>
        <Text fontWeight="bold">#{item.nftId}</Text>
        <Text color="gray.500">{ item.assetType == 'EIP721' ? 'Single Edition' : 'Multi Edition' }</Text>
        <Spacer />
        <Tag size="sm">{item.chain.toUpperCase()}</Tag>
      </HStack>

      <HStack fontSize="sm" mb={4}>
        <Text color="gray.500">by</Text>
        <Link href={`/u/${item.sellerName}`}>
          <Text fontWeight="bold">@{item.sellerName}</Text>
        </Link>
        <Spacer />
        <HStack gap={0}>
          <Text fontSize="md" fontFamily="mono" fontWeight="bold">{item.priceNormal}</Text>
          <Text color="gray.500">{item.currencySymbol}</Text>
        </HStack>
      </HStack>

      <HStack>
        { 
          item.soldAt == '0' 
          ? <NextLink href={`/nft/${item._id}`}><Button rounded="full" size="sm">Buy</Button></NextLink>
          : <Button rounded="full" size="sm" disabled>Sold 🔥</Button>
        }
        <Spacer />
        <Button size="sm" variant="ghost" leftIcon={<IoHeart color="red" />}>{item.likes || 0}</Button>
      </HStack>
    </Box>
  )
}

// ? <BuyButton btnProps={{ rounded: 'full', size: 'sm', px: 8 }} item={item}></BuyButton>

export const CollectionCard = ({ name, cover, image, username, sales }) => {
  return (
    <Box 
      cursor="pointer"
      transition="all 250ms ease"
      _hover={{ bg: mode('gray.100', 'gray.900'), transform: 'scale(1.05)' }}
      borderWidth={1} 
      borderColor={mode('gray.100', 'gray.900')} 
      rounded="md" overflow="hidden"> 
      <Image src={cover} h={140} w="full" objectFit="cover" />
      <Box pos="relative" h={6}>
        <Avatar size="md" pos="absolute" src={cover} mt={-6} ml={4} bg="transparent" />
      </Box>
      <Box p={4}>
        <Heading size="xs">{username}</Heading>
        <Text fontSize="sm" color="gray.500" fontFamily="mono">${sales}</Text>
      </Box>
    </Box>
  )
}