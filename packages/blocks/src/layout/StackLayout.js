import { Fragment, useMemo, useState } from 'react'
import { Box, Button, IconButton } from "@chakra-ui/react"
import { TbEdit } from 'react-icons/tb'

export const StackLayout = ({ data, edit, onLoad, onSave }) => {
  const [blocks, setBlocks] = useState(data?.main || [])
  const [theme, setTheme] = useState(data?.theme || {})

  const renderBlocks = useMemo(() => {
    return (blocks || []).map(block => <Box>{block}</Box>)
  }, [blocks])

  const renderFooter = useMemo(() => {

  }, [])

  const renderHeader = useMemo(() => {

  }, [])

  const renderEdit = useMemo(() => {
    return (
      <Box>
        <IconButton icon={<TbEdit />} />
      </Box>
    )
  }, [edit, data])

  return (
    <Fragment>
      { edit && renderEdit }
      { renderBlocks }
    </Fragment>
  )  
}