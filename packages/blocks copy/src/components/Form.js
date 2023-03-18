import { useState } from "react"
import { Box, HStack, IconButton, Input, Text } from "@chakra-ui/react"
import { TbPlus } from "react-icons/tb"

const DATA_STATE = { name: '', value: '' }

export const NameValueForm = ({ title, size = 'sm', nameProps, valueProps, onComplete, ...rest }) => {
  const [data, setData] = useState(DATA_STATE)

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.name != '' && data.value != '') {
      onComplete && onComplete(data.name, data.value)
      setData(DATA_STATE)
    }
  }

  return (
    <Box>
      { title && <Text>{title}</Text> }
      <HStack onSubmit={handleSubmit} method="POST" as="form" {...rest}>
        <Input size={size} name="name" value={data.name} onChange={handleChange} isRequired {...nameProps} />        
        <Input size={size} name="value" value={data.value} onChange={handleChange} isRequired {...valueProps} />
        <IconButton size={size} type="submit" icon={<TbPlus />}  />
      </HStack>
    </Box>
  )
}