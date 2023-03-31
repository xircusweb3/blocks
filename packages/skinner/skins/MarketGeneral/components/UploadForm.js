import { useRef, useState } from 'react'
import { VStack, Box, Avatar, Spinner, Button, Center, IconButton, Text, FormLabel, Tag, useColorModeValue as mode } from '@chakra-ui/react'
import { TbArrowsDiagonal } from 'react-icons/tb';
import { useStorage } from '@xircus-web3/react';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
})


export const ImageUpload = ({ value, label, src, cover, acceptTypes, help, left, right, wrap, control, tag, onChange, input, ...rest }) => {
  const inputRef = useRef(null)
  const storage = useStorage()
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = async({ target: { files } }) => {
    setLoading(true)
    const ipfs = await storage.uploadInfura(files[0])
    onChange && onChange(ipfs)
    const base64 = await toBase64(files[0])
    // console.log("BASE64", base64, ipfs)
    setPreview(base64)
    inputRef.current.value = '';
    setLoading(false)
  }

  return (
    <Box>
      <FormLabel fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>      
      <VStack pos="relative" minH="140px" borderWidth={1} borderStyle="dashed" rounded="md" overflow="hidden" {...rest}>
        {
          src && <Box w="full" minH="140px" bgImage={src} bgPos="center center" bgSize="cover" />
        }
        <Center pos="absolute" w="full" h="100%" top={0}>
          { src && <IconButton icon={<TbArrowsDiagonal />} pos="absolute" right={4} top={2} rounded="full" /> }
          <VStack fontSize="sm" fontWeight="bold">
            <Text bg={mode('#fff', '#000')} p={1}>PNG, GIF, JPG, MP4 (max 8Mb)</Text>
            <Button isLoading={loading} onClick={() => inputRef.current.click()}>Choose File</Button>
          </VStack>
        </Center>
        <input
          type="file" 
          accept={acceptTypes} 
          ref={inputRef} 
          style={{ display: 'none' }}
          onChange={handleChange}
          {...rest} />
      </VStack>    
    </Box>
  )
}