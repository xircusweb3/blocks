import { Box, Button, Heading, HStack, IconButton, Image, Spacer, Tag, Text, Avatar } from "@chakra-ui/react"
import { TbHeart } from "react-icons/tb"
import BoringAvatar from 'boring-avatars'

// Image, Collection Name, NFTId, Price, Chain
export const ItemCard = ({ item, theme }) => {
  return (
    <Box transition="all 400ms ease" pos="relative" cursor="pointer" role="group">
      <Image 
        rounded="md" 
        w="full" 
        h="140px"
        objectFit="cover"
        objectPosition="center"
        transition="all 500ms ease"
        _groupHover={{ objectPosition: '25% 25%' }}
        src="https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=300x300&vertical=top"
        />
      <HStack py={2}>
        <Box>
          <Heading size="xs">Item Name</Heading>
          <HStack fontSize="sm">
            <Text fontWeight="bold" fontFamily="mono">#1452</Text>
            <Avatar boxSize="20px" src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" />
          </HStack>
        </Box>
        <Spacer />
        <BoringAvatar variant="beam" size={30} />        
      </HStack>
      <HStack>
        <Button w="full" size="xs" as={HStack}>
          <Text>Buy</Text>
          <Text fontWeight="bold">125.45</Text>
          <Text color="gray.500">USDC</Text>
        </Button>
        <IconButton size="xs" icon={<TbHeart />} />
      </HStack>
    </Box>
  )
}

// Image, Collection Name, Item Name, NFTId, Price, Chain, Like
export const ItemCardFull = () => {
  return (
    <Box>

    </Box>
  )
}

// _hover={{ transform: 'scale(1.05)' }}

// Image Thumb with Price, chain
export const ItemCardMini = ({ item, theme }) => {
  return (
    <Box transition="all 400ms ease" pos="relative" cursor="pointer" role="group" overflow="hidden" rounded="md">
      <Image 
        w="full" 
        h="200px"
        objectFit="cover"
        objectPosition="center center"
        transition="all 500ms ease"
        _groupHover={{ objectPosition: '0% 0%' }}
        src="https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=300x300&vertical=top"
        />
      <Box pos="absolute" top={2} right={2}>
        <Text fontWeight="bold" fontFamily="mono" color="white">#1452</Text>
      </Box>
      <HStack pos="absolute" bottom={0} w="full" p={2} backdropFilter="blur(20px)">
        <Button size="xs" color="white" bgGradient="linear(to-l, #7928CA, #FF0080)" _hover={{ bgGradient: 'linear(to-l, #7928CA, #FF0080)' }} as={HStack} w="full">
          <Text>Buy</Text>
          <Text fontWeight="bolder">125.45</Text>
          <Text fontWeight="bolder">USDC</Text>
        </Button>
        <Avatar boxSize="20px" src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" />
      </HStack>
    </Box>
  )
}
