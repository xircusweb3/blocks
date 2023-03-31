import { Box, Container, Heading, HStack, Image, Text, Grid, Center, Button, Spacer, Skeleton, Tag, IconButton } from "@chakra-ui/react"
import { useProviderHelper, useUtils } from "@xircus-web3/react"
import Link from "next/link"
import NextLink from 'next/link'
import { BuyButton } from "../components/BuyButton"
import { CopyAddress } from "../components/Copy"
import { GradientTitle } from "../components/GradientBox"
import { PageHeading } from "../components/Typo"

export const HeroSection = ({ item, ...rest }) => {
  const utils = useUtils()
  const helper = useProviderHelper()

  if (!item) {
    return (
      <Container maxWidth="container.lg" py={{ base: 0, md: 12 }} {...rest}>
        <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)' }}>
          <Center>
            <Skeleton h={340} maxW={340} w="full" />
          </Center>
          <Center pl={4} flexDirection="column" alignItems="flex-start" py={{ base: 6, sm: 6, md: 0 }}>
            <Skeleton mb={4} h="20px" w="70px" />
            <Skeleton mb={4} h="44px" w="300px" />

            <Skeleton mb={4} h="24px" w="200px" />
            <Skeleton mb={4} h="30px" w="200px" />

            <HStack mt={6}>
              <Skeleton h="48px" w="140px" />
              <Skeleton h="48px" w="160px"/>
            </HStack>
          </Center>          
        </Grid>
      </Container>
    )
  }

  return (
    <Container maxWidth="container.lg" py={{ base: 0, md: 12 }} {...rest}>
      <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)' }} >
        <Center>
          <Image 
            src={utils.ipfsUrl(item.image)}
            w="full" maxW={340} h={340} 
            objectFit="cover" objectPosition="center center" 
            rounded="md"
            />
        </Center>
        <Center pl={4} flexDirection="column" alignItems="flex-start" py={{ base: 6, sm: 6, md: 0 }}>
          <GradientTitle size="md" mb={4}>Trending 🔥</GradientTitle>
          <Heading mb={4}>{item.name}</Heading>
          <HStack mb={4} align="space-between">
            <Text fontWeight="bold">#{item.nftId}</Text> 
            <Text color="gray.500">{item.assetType == 'EIP721' ? 'Single Edition' : 'Multi Edition' }</Text>      
            <Tag>{item.chain.toUpperCase()}</Tag>
          </HStack>
          <HStack mb={4}>
            <Text color="gray.500">Collection</Text>
            <CopyAddress address={item.assetAddr} pos="right" />
          </HStack>
          <HStack mb={4}>
            <Text color="gray.500">by</Text>
            <Link href={`/u/${item.sellerName}`}>
              <Text fontWeight="bold">@{item.sellerName}</Text>
            </Link>            
          </HStack>
          <HStack mb={4}>
            <Text color="gray.500">for</Text>                
            <Text fontWeight="bold" fontSize="lg" fontFamily="mono">{utils.fromWei(item.price.toString()).toString()}</Text>
            <Text fontWeight="bold" color="gray.500">{helper.getCurrencySymbol(item.currencyId)}</Text>
          </HStack>
          <HStack mt={6}>
            { 
              item.soldAt == '0' 
              ? <BuyButton item={item} btnProps={{ rounded: 'full', size: 'lg' }}>Buy Now</BuyButton>
              : <Button rounded="full" size="lg" disabled>Sold 🔥</Button>
            }
            <NextLink href={`/nfts/${item._id}`}>
              <Button rounded="full" size="lg">View Artwork</Button>            
            </NextLink>
          </HStack>
        </Center>
      </Grid>
    </Container>
  )
}

{/* <Text fontWeight="bold" fontFamily="mono" color="gray.500">${helper.getRateInUSD(item.currency, utils.fromWei(item.price.toString()).toString())}</Text> */}
