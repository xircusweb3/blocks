import { Button, ButtonGroup, HStack } from "@chakra-ui/react"

const DEFAULT_FILTERS = {
  sorter: [
    { name: 'All', filter: {} },
    { name: 'Popular', filter: { sort: 'likes', order: 'asc' } },
    { name: 'Latest', filter: { sort: 'createdAt', order: 'desc' } },
  ],
  chains: [

  ],
}

// horizontal block
// TODO: Menu on every button
export const FilterHorizBlock = ({  }) => {
  return (
    <ButtonGroup size="sm" variant="outline">
      <Button>All</Button>
      <Button>Blockchain</Button>
      <Button>Category</Button>
      <Button>Collection</Button>      
      <Button>Filter</Button>
    </ButtonGroup>
  )
}

// TODO
export const FilterVertBlock = () => {

}