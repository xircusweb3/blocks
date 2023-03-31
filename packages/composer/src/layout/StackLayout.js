import { useMemo } from 'react'
import { Box } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import BlockRenderer from "../renderer/BlockRenderer"
import { headerBlocks, mainBlocks } from "../blocks"

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
  }, [layout])

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
      {renderHeader}
      {renderMain}
      {renderFooter}
    </Box>
  )
}