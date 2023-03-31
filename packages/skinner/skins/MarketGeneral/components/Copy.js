import { useClipboard, Button, Text, HStack, Tooltip } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { shortAddr } from '../hooks/utils'

export const CopyAddress = ({ address, pos = 'left', copied = 'Copied', ...rest }) => {
  const { hasCopied, setValue, onCopy, value } = useClipboard(address)
  const copyIcon = useMemo(() => hasCopied ? <FiCheck /> : <FiCopy />, [hasCopied])

  useEffect(() => {
    setValue(address)
  }, [address])

  return (
    <Tooltip 
      rounded="md"
      placement="top-end"
      p={2}
      hasArrow
      closeOnPointerDown
      label="Click To Copy"
      bg="#000" color="white" fontSize="xs">
      <Button 
        size="sm"
        p={0}
        m={0}
        bg="transparent"
        verticalAlign="inherit"
        height="auto"
        leftIcon={pos == 'left' && copyIcon} 
        rightIcon={pos == 'right' && copyIcon}
        onClick={onCopy} 
        _hover={{ textDecoration: 'none' }}
        {...rest}>
        {hasCopied ? (copied ? copied : shortAddr(address)) : shortAddr(address)}
      </Button>
    </Tooltip>
  )
}
