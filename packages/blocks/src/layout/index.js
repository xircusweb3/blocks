import { useMemo } from 'react'
import { Box, Button, Heading, HStack, useColorMode } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import { AppLayout } from "./AppLayout"
import { StackLayout } from './StackLayout'
import { useTranslations } from 'use-intl'

export const LayoutManager = () => {
  const { toggleColorMode } = useColorMode()
  const { layout, edit, toggleEdit, changeVariant, page, dir } = useBlock()
  const t = useTranslations(page)

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'AppLayout': return <AppLayout />
      case 'StackLayout': return <StackLayout />
    }
  }, [layout.variant])

  const renderEdit = useMemo(() => {
    return (
      <Box bg="card">
        <Heading textAlign={dir == 'rtl' ? 'right' : 'left'}>{t('welcome')}</Heading>
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

  return (
    <Box>
      {renderLayout}
      {renderEdit}
    </Box>
  )
}