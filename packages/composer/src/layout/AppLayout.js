import { useMemo } from 'react'
import { Box, Grid, Stack } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import BlockRenderer from "../renderer/BlockRenderer"
import { headerBlocks, mainBlocks, sideBlocks } from "../blocks"

export const AppLayoutDefault = {
  name: 'AppLayout',
  theme: {
    wrap: {},
    container: {},
    header: {},
    main: {},
    footer: {},
    left: {},
    right: {}
  },
  data: {

  },
}

export const AppLayout = () => {
  const { blocks, page, layout, edit } = useBlock()
  const theme = useMemo(() => layout?.theme || AppLayoutDefault.theme, [layout])

  const renderLeft = useMemo(() => {
    return (
      <Box w="full" {...theme.left}>
        <BlockRenderer
          group="left"
          label="Add Left Blocks"
          page={page}
          blocks={layout?.left || []}
          components={sideBlocks}
        />
      </Box>
    )
  }, [layout, theme, page])

  const renderHeader = useMemo(() => {
    return (
      <Box {...theme.header}>
        <BlockRenderer
          group="header"
          label="Add Header Blocks"
          page={page}
          blocks={layout?.header || []}
          components={headerBlocks}
        />
      </Box>
    )
  }, [layout, theme])

  const renderMain = useMemo(() => {
    return (
      <Box {...theme?.main}>
        <BlockRenderer
          group="main"
          label="Add Blocks"
          page={page}
          blocks={blocks || []}
          components={mainBlocks}
        />
      </Box>
    )
  }, [blocks, page, edit])

  const renderFooter = useMemo(() => {
    return (
      <Box {...theme.header}>
        <BlockRenderer
          group="footer"
          label="Add Footer Blocks"
          page={page}
          blocks={layout?.footer || []}
          components={mainBlocks}
        />
      </Box>
    )
  }, [layout])

  return (
    <Box {...theme?.wrap}>
      <Grid templateColumns={{ base: 'auto', md: '240px auto' }} {...theme?.container}>
        <Box display={{ base: 'none', md: 'grid' }} {...theme?.left}>
          <Box {...theme?.left} pos="fixed" h="100vh" w={240} display={{ base: 'none', md: 'flex' }}>
            {renderLeft}
          </Box>
        </Box>
        <Box {...theme?.main}>
          {renderHeader}
          {renderMain}
          {renderFooter}
        </Box>
      </Grid>
    </Box>
  )
}




  // <BlockAddOptions
  // components={mainBlocks}
  // blockDefaults={blockDefaults}
  // group="main"
  // page={page}
  // />
