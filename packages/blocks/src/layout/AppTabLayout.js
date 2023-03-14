// AppLayout with custom tabs

import { Box, Heading } from "@chakra-ui/react";
import { CustomTab } from "../components/Tab";

export default function AppTabLayout() {

  const tabs = [
    {
      key: 'tab1',
      label: 'Home',
      content: 'Tab1'
    },
    {
      key: 'tab2',
      label: 'Another',
      content: 'Tab2'
    }    
  ]

  return (
    <Box>
      <Heading>AppTab</Heading>
      <CustomTab tabs={tabs} />
    </Box>
  )
}