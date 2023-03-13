// AppLayout with custom tabs

import { Box, Heading } from "@chakra-ui/react";
import { CustomTab } from "../components/Tab";

export default function AppTabLayout() {

  const tabs = [
    {
      key: 'tab1',
      label: 'Home'
    }
  ]

  return (
    <Box>
      <Heading>AppTab</Heading>
      <CustomTab tabs={tabs} />
    </Box>
  )
}