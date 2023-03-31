import { Text, Heading } from '@chakra-ui/react'
import { AppSpacer } from '../../components/AppContainer'
import FeatExploreList from '../../containers/FeatExploreList'
import AppLayout from '../../layouts/AppLayout'

export default function Items() {
  return (
    <AppLayout>
      <AppSpacer />
      <FeatExploreList />
    </AppLayout>
  )

}