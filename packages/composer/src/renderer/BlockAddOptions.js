import { useMemo } from 'react'
import { Box, Button, IconButton, useDisclosure, Center, Wrap } from "@chakra-ui/react";
import { useBlock } from '../hooks/provider';
import { TbPlus } from 'react-icons/tb';
import { CustomModal } from '../components/CustomModal';

export default function BlockAddOptions({ components, label, blockDefaults, onAdd }) {
  const { edit } = useBlock()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAddBlock = (name) => {
    onAdd && onAdd(blockDefaults[name])
  }

  const renderOptions = useMemo(() => {
    return (
      <CustomModal title="Select Block" size="lg" isOpen={isOpen} onClose={onClose}>
        <Wrap gap={4} my={4}>
          {
            Object.keys(components).map((name) => <Button key={name} onClick={() => handleAddBlock(name)}>{name}</Button>)
          }
        </Wrap>
      </CustomModal>
    )
  }, [components, isOpen, onClose, handleAddBlock])

  const renderAddControl = useMemo(() => {
    return (
      <Center py={2}>
        {
          label
          ? <Button size="xs" leftIcon={<TbPlus />} onClick={onOpen}>{label}</Button>
          : <IconButton icon={<TbPlus />} rounded="full" onClick={onOpen} />
        }
        
      </Center>
    )
  }, [edit, onOpen])

  return (
    <>
      {renderOptions}
      {renderAddControl}      
    </>
  )
}