import { Box, Button, Container, Grid, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { useApp } from '@xircus-web3/react'
import { AppSpacer } from '../../components/AppContainer'
import { GradientTitle } from '../../components/GradientBox'
import AppLayout from '../../layouts/AppLayout'
import { Card } from '../../components/Card'
import { CustomTable } from '../../components/Table'
import { PageHeading } from '../../components/Typo'
import { IoTrash } from 'react-icons/io5'

// Create or import collection contracts



export default function MyCollections() {
  const collectionFields = [
    {
      key: '_id',
      label: 'ID'
    },
    {
      key: '',
      label: 'Name'
    },    
    {
      key: '',
      label: 'Symbol'
    },        
    {
      key: '',
      label: 'Asset Type'
    },        
  ]

  const itemFields = [
    {
      key: '_id',
      label: 'NFT ID'
    },
    {
      key: 'collection',
      label: 'Collection Name'
    },
    {
      key: 'metadata',
      label: 'Metadata'
    },
    {
      key: 'collection',
      label: 'Quantity'
    },
    {
      key: 'listingId',
      label: 'Listing ID'
    },    
    {
      key: 'listedIn',
      label: 'Marketplace'
    },        
    {
      key: 'actions',
      label: '',
      render: () => (
        <HStack>
          <IconButton icon={<IoTrash />} />
        </HStack>
      )
    }
  ]

  return (
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.lg" mt="50px"> 

        <Card mb={4} p={6}>
          <PageHeading title="Manage Collections" mb={4}>
            <HStack>
              <Button size="sm">Create</Button>
              <Button size="sm">Import</Button>        
            </HStack>
          </PageHeading>
          <CustomTable fields={collectionFields} rows={[]} />
        </Card>

        <Card mb={4} p={6}>
          <PageHeading title="Manage Items" mb={4}>
            <HStack>
              <Button size="sm">Create</Button>
              <Button size="sm">Import</Button>        
            </HStack>
          </PageHeading>
          <CustomTable fields={itemFields} rows={[]} />
        </Card>

      </Container>
    </AppLayout>
  )
}