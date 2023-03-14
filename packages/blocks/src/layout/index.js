import { useMemo } from 'react'
import { Box, Button, HStack, useColorMode } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import { AppLayout } from "./AppLayout"
import { StackLayout } from './StackLayout'
import LayoutEditor from '../editor/LayoutEditor'
import AppTabLayout from './AppTabLayout'
import SlideLayout from './SlideLayout'

export const LayoutManager = ({ children }) => {
  const { toggleColorMode } = useColorMode()
  const { layout, edit, toggleEdit, changeVariant } = useBlock()

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'AppLayout': return <AppLayout />
      case 'AppTabLayout': return <AppTabLayout />
      case 'StackLayout': return <StackLayout />
      case 'SlideLayout': return <SlideLayout />
    }
  }, [layout.variant])

  const renderChildren = useMemo(() => {
    if (typeof children == 'function') {
      return children({ test: '' })
    }
    if (typeof children == 'object') {
      return children
    }
  }, [children])

  return (
    <Box>
      {renderChildren}
      {renderLayout}
      <LayoutEditor />
    </Box>
  )
}