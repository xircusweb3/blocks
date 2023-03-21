import { useMemo } from 'react'
import { Box, Button, Heading } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import BlockRenderer from "../renderer/BlockRenderer"
import { mainComponents } from "../blocks"

export const AppLayoutDefault = {
  name: 'AppLayout',
  theme: {},
  data: {},
}

export const AppLayout = () => {
  const { blocks, page, layout } = useBlock()

  const renderHeader = useMemo(() => {

  }, [layout])

  const renderMain = useMemo(() => {
    return <BlockRenderer
              group="main"
              blocks={blocks || []}
              components={mainComponents}
            />
  }, [blocks, page])

  return (
    <>
      {renderMain}
    </>
  )
}