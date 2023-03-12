import { useMemo } from 'react'
import { Box, Button, HStack } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import { AppLayout } from "./AppLayout"
import { StackLayout } from './StackLayout'

export const LayoutManager = () => {
  const { layout, edit, toggleEdit, changeVariant } = useBlock()

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'AppLayout': return <AppLayout />
      case 'StackLayout': return <StackLayout />
    }
  }, [layout.variant])

  const renderEdit = useMemo(() => {
    return (
      <Box>
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
  }, [toggleEdit, changeVariant])

  return (
    <Box>
      {renderLayout}
      {renderEdit}
    </Box>
  )
}