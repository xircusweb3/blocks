import { useMemo } from 'react'
import { Box, Button, HStack, useColorMode } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import { AppLayout } from "./AppLayout"
import { StackLayout } from './StackLayout'
import LayoutEditor from '../editor/LayoutEditor'
import AppTabLayout from './AppTabLayout'

export const LayoutManager = ({ children }) => {
  const { toggleColorMode } = useColorMode()
  const { layout, edit, toggleEdit, changeVariant } = useBlock()

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'AppLayout': return <AppLayout />
      case 'AppTabLayout': return <AppTabLayout />
      case 'StackLayout': return <StackLayout />
    }
  }, [layout.variant])

  const renderEdit = useMemo(() => {
    return (
      <Box>
        <Button onClick={toggleColorMode}>Toggle</Button>
        <Button onClick={toggleEdit}>{edit ? 'Save' : 'Edit'}</Button>
        {
          edit && (
            <HStack>
              <Button onClick={() => changeVariant('AppLayout')}>AppLayout</Button>
              <Button onClick={() => changeVariant('StackLayout')}>StackLayout</Button>
            </HStack>
          )
        }
      </Box>
    )
  }, [toggleEdit, changeVariant, toggleColorMode])

  const renderChildren = useMemo(() => {
    if (typeof children == 'function') {
      // pass some data
      return children({ test: '' })
    }
    if (typeof children == 'object') {
      return children
    }
  }, [children])

  return (
    <Box>
      {renderLayout}
      {renderEdit}
      <LayoutEditor />
      {renderChildren}
    </Box>
  )
}