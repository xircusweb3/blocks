import { useState, useEffect } from 'react'
import { useDisclosure, IconButton } from "@chakra-ui/react";
import { RightDrawer } from "../components/Drawer";
import { TbEdit } from 'react-icons/tb';
import { OutlineCard } from '../components/Card';
import { useBlock } from '../hooks/provider';

export default function ThemeEditor({ theme, children, onSave, onChange }) {
  const { edit } = useBlock()
  const { isOpen, onOpen, onClose } = useDisclosure()  
  
  useEffect(() => {
    onChange && onChange({ theme })
  }, [theme])

  const handleClose = () => {
    onSave && onSave()
    onClose()
  }

  const handleChange = (name, values) => {
    setTheme({ ...theme, [name]: values })
  }

  return (
    <>
      <RightDrawer size="sm" onClose={handleClose} isOpen={isOpen} header="Edit">
        {children}
        <OutlineCard title="theme">
        </OutlineCard>
      </RightDrawer>
      <IconButton icon={<TbEdit />} size="xs" pos="absolute" zIndex={1399} top="50%" right={2} onClick={onOpen} />
    </>
  )
}