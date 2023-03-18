import { useMemo } from 'react'
import { Box } from "@chakra-ui/react";
import { components } from "../blocks";
import { CustomTab } from '../components/Tab';
import { RightDrawer } from '../components/Drawer';

export default function BlockOptions() {

  const tabs = [
    { key: 'content', label: 'Content', content: 'C' },
    { key: 'header', label: 'Header' },
    { key: 'footer', label: 'Footer' },
    { key: 'social', label: 'Social' },  
    { key: 'payment', label: 'Payment' },
    { key: 'user', label: 'User' },  
    { key: 'nft', label: 'NFT' },
    { key: 'marketplace', label: 'Marketplace' },
    { key: 'contract', label: 'Contract' },      
    { key: 'defi', label: 'DeFi' },    
    { key: 'launchpad', label: 'Launchpad' },
  ]  

  const render = useMemo(() => {
    return (
      <Box>
        <CustomTab tabs={tabs} />
      </Box>
    )
  }, [components])

  return (
    <RightDrawer>
      {render}
    </RightDrawer>
  )
}