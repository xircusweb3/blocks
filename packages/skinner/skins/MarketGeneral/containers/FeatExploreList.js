import { 
  Avatar,
  Box, Button, Container, Grid, Heading, HStack, IconButton, Image, Spacer, Text, VStack,
  useColorModeValue as mode,
  ButtonGroup
} from "@chakra-ui/react";
import { ItemCard } from "./Cards";

export default function FeatExploreList({ title, data = [], ...rest }) {
  return (
    <Container maxWidth="container.xl" {...rest}>
      <HStack mb={6}>
        <Heading size="md">{title}</Heading>
        <Spacer />
        <ButtonGroup size="sm" variant="outline" display={{ base: 'none', md: 'inline-block' }}>
          <Button rounded="full">All</Button>
          <Button rounded="full" >Blockchain</Button>          
          <Button rounded="full">Category</Button>
          <Button rounded="full">Collection</Button>
          <Button rounded="full">Filter</Button>          
        </ButtonGroup>
        <Spacer />
        <Button size="sm">View All</Button>
      </HStack>
      <Grid templateColumns={{ base: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
        {
          (data || []).map((item, itemKey) => <ItemCard key={itemKey} {...item} />)
        }        
      </Grid>
    </Container>

  )
}