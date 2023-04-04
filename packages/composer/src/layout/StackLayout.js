import { useMemo } from 'react'
import { Box } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import BlockRenderer from "../renderer/BlockRenderer"
import { footerBlocks, headerBlocks, mainBlocks } from "../blocks"

export const StackLayoutDefault = {
  name: 'StackLayout',
  theme: {
    wrap: {},
    header: {},
    main: {},
    footer: {},
    left: {},
    right: {}
  },
  data: {},
}

export const StackLayout = () => {
  const { blocks, page, layout, edit } = useBlock()
  const theme = useMemo(() => layout?.theme || StackLayoutDefault.theme, [layout])

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
  }, [layout, page, theme])

  // console.log("BLOCKS MAIN", blocks)

  // const renderMain = useMemo(() => {
  //   return (

  //   )
  // }, [blocks, page, edit])

  const renderFooter = useMemo(() => {
    return (
      <Box {...theme.header}>
        <BlockRenderer
          group="footer"
          label="Add Footer Blocks"
          page={page}
          blocks={layout?.footer || []}
          components={footerBlocks}
        />
      </Box>
    )
  }, [layout, page, theme])

  return (
    <Box {...theme?.wrap}>
      {renderHeader}
      <Box {...theme?.main}>
        <BlockRenderer
          group="main"
          label="Add Blocks"
          page={page}
          blocks={blocks || []}
          components={mainBlocks}
        />
      </Box>
      {renderFooter}
    </Box>
  )
}

// {renderMain}
