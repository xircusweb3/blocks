import { useState, useEffect } from 'react'
import { Box, useDisclosure } from "@chakra-ui/react";

export default function EditPanel({ block, onChange, onSave }) {
  const [theme, setTheme] = useState(block?.theme || {})
  const [data, setData] = useState(block?.data || {})
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onChange && onChange({ variant, theme, setting })
  }, [variant, theme, setting])

  const handleClose = () => {
    onSave && onSave()
    onClose()
  }

  return (
    <Box>

    </Box>
  )
}