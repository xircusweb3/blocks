import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue as mode, Box } from '@chakra-ui/react'

export const CustomTab = ({ tabs = [], style, ...rest }) => {
  return (
    <Tabs size="sm" variant="unstyled" isLazy {...rest}>
      <Box overflowY="hidden" overflowX="auto">
        <TabList {...(style || {}).list}>
          {
            (tabs || []).map((t, tId) => <Tab key={t.key}>{t.label}</Tab>)
          }
        </TabList>
      </Box>
      <TabPanels>
        {
          tabs.map((t, tId) => (
            <TabPanel key={t.key} {...(style || {}).panel} {...(t.style)}>
              { t.render ? t.render(t, tId) : t.content }
            </TabPanel>
          ))
        }
      </TabPanels>
    </Tabs>
  )
}