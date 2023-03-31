import { 
  Container, Grid, Heading
} from "@chakra-ui/react"
import { useMemo } from "react"
import { PageHeading } from "../components/Typo"
import { ItemCard } from "./Cards"
import { ItemFeatSkeleton } from "./Skeletons"

export default function FeatItemList({ title = 'Featured Items', data = [], loaders = 4, ...rest }) {

  const renderLoaders = useMemo(() => {
    if ((data || []).length == 0) {
      return [...Array(loaders).keys()].map((l, lId) => <ItemFeatSkeleton key={lId} />)
    }
  }, [data])

  return (
    <Container maxWidth="container.xl" {...rest}>
      <PageHeading title={title} mb={4} />
      <Grid templateColumns={{ base: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
        { renderLoaders }
        {
          (data || []).map((item, itemKey) => <ItemCard key={itemKey} item={item} />)
        }        
      </Grid>
    </Container>

  )
}