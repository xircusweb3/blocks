import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue as mode, Box } from '@chakra-ui/react'

export const CustomTab = ({ tabs = [], style, ...rest }) => {
  // const tabListStyle = {
  //   borderBottomWidth: 1,
  //   borderBottomColor: mode('gray.200', 'gray.900'),    
  // }
  
  // const tabStyle = {
  //   fontWeight: 'bold',
  //   color: 'gray.500',
  //   whiteSpace: 'nowrap',
  //   borderBottomWidth: 1,
  //   mb: '-1px',
  //   py: 2,
  //   px: 5,
  //   borderBottomColor: mode('gray.200', 'gray.900'),    
  //   _selected: {
  //     borderImageSource: 'linear-gradient(to left, #8a2387, #e94057, #f27121)',
  //     borderImageSlice: 1,
  //     bgGradient: 'linear(to-l, #8a2387, #e94057, #f27121)',
  //     bgClip: 'text',
  //     color: 'orange.500',
  //   },
  // }
  
  // const tabPanel = {
  //   p: 0,
  //   m: 0
  // }

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