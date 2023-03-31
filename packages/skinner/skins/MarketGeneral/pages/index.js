import { Box } from '@chakra-ui/react'
import { useAppData, useNetwork, useProviderHelper, useUtils } from '@xircus-web3/react'
import { AppLayout } from '../layouts/AppLayout'
import { HeroSection } from '../containers/HeroSection'
import FeatItemList from '../containers/FeatItemList'
import FeatCollectionList from '../containers/FeatCollectionList'
import FeatSellerList from '../containers/FeatSellerList'
import FeatExploreList from '../containers/FeatExploreList'
import { AppSpacer } from '../components/AppContainer'
import { useEffect, useState } from 'react'

export default function General() {
  const appData = useAppData()
  const utils = useUtils()
  const helper = useProviderHelper()
  const [items, setItems] = useState([])
  const network = useNetwork()

  useEffect(() => {
    if (appData?.items) {
      // console.log("APP ITEMS", appData.items)
      setItems((appData.items || []).map(item => ({
        ...item,
        nftUrl: network.getNFTExplorer(item.assetAddr, item.nftId),
        assetUrl: network.getAddressExplorer(item.assetAddr),
        assetShort: utils.shortAddr(item.assetAddr),
        priceNormal: utils.millify(helper.getCurrencyPrice(item.price, item.currencyId)),
        imageUrl: utils.ipfsUrl(item.image),
        sellerName: helper.getUsername(item.seller),
        currencySymbol: helper.getCurrencySymbol(item.currencyId),
      })))
    }
  }, [appData])

  return (
    <AppLayout>
      <AppSpacer />
      <Box mt={10} />
      <HeroSection mb={20} item={items[0] || false} />
      <FeatItemList title="Featured" data={items || []} mb={20} />
    </AppLayout>
  )
}

// 
// <FeatItemList title="Featured" data={items} mb={20} />
// <FeatCollectionList title="Featured Collections" items={collections} mb={20} />
// <FeatSellerList mb={20} />
// <FeatExploreList title="Explore" mb={20} data={items} />
