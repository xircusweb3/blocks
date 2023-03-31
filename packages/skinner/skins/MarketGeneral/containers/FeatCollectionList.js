import { 
  Box, Heading, Image, Grid, Container, Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CollectionCard } from "./Cards";

export default function FeatCollectionList({ title, data = [], loading, loadingRows = 4, ...rest }) {

  return (
    <Container maxW="container.xl" {...rest}>
      <Heading mb={6} size="md">{title}</Heading>
      <Grid templateColumns={{ base: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={6}>
        {
          (data || []).map((item, itemKey) => <CollectionCard key={itemKey} {...item} />)
        }
      </Grid>
    </Container>
  )
}