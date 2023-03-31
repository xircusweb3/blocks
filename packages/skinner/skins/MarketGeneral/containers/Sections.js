import { useMemo } from "react"
import { Container, Grid, Heading } from "@chakra-ui/react"
import { ItemCard } from "./Cards"
import { ItemFeatSkeleton } from "./Skeletons"

export const SectionItems = ({ title = 'Section Title', data = [], loaders = 4, ...rest }) => {

  const renderLoaders = useMemo(() => {
    if ((data || []).length == 0) {
      return [...Array(loaders).keys()].map((l, lId) => <ItemFeatSkeleton key={lId} />)
    }
  }, [data])

  return (
    <Container maxWidth="container.xl" {...rest}>
      <Heading mb={6} size="md">{title}</Heading>
      <Grid templateColumns={{ base: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
        { renderLoaders }
        {
          (data || []).map((item, itemKey) => <ItemCard key={itemKey} {...item} />)
        }        
      </Grid>
    </Container>

  )
}

export const SectionCollections = () => {
  return (
    <Container>

    </Container>
  )
}

export const SectionUsers = () => {
  return (
    <Container>
      
    </Container>
  )
}

export const SectionCarousel = () => {
  return (
    <Container>

    </Container>
  )  
}