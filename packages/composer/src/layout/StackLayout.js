import { Fragment, useMemo, useState } from 'react'
import { Box, Button, IconButton } from "@chakra-ui/react"
import { TbEdit } from 'react-icons/tb'
import { useBlock } from '../hooks/provider'

export const StackLayoutDefaults = {
  name: 'StackLayout',
  theme: {},
  data: {}
}

export const StackLayout = ({ }) => {
  const { layout, edit } = useBlock()

  return (
    <Box>
      Stack Layout
    </Box>
  )  
}