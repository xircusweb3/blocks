import { useState, useEffect } from 'react'
import { Box, Input, Button, Select, List, ListItem, Spacer, InputGroup, InputLeftElement, InputLeftAddon, Stack, VStack, IconButton } from '@chakra-ui/react'
import { ThemeItemStack } from "./ThemeItemStack"
import { ThemeItemForm } from './ThemeItemForm'
import { TbTrash } from 'react-icons/tb'

export const ThemeItem = ({ styles, name, onChange }) => {
  const [values, setValues] = useState(styles)

  useEffect(() => {
    onChange && onChange(name, values)
  }, [values])

  const handleChange = ({ target: { name, value } }) => {
    if (name.split('.').length == 2) {
      let [n, k] = name.split('.')
      setValues({ ...values, [n]: { ...values[n], [k]: value } })
    } else {
      setValues({ ...values, [name]: value })
    }
  }

  const handleClick = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  const addValues = (newValues = {}) => {
    setValues({ ...values, ...newValues })
  }

  const removeValues = (names = []) => {
    let newValues = values
    for (let name of names) {
      delete newValues[name]
      console.log("DELETED", name)
    }
    setValues(newValues)
  }

  const handleNewStyle = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  const renderOption = (name) => {
    if (typeof values[name] == 'object') {
      const keys = Object.keys(values[name])
      return (
        <ThemeItemStack name={name}>
          <VStack alignItems="flex-end">
          {
            keys.map(k => 
              <InputGroup size="xs" key={k} w="auto">
                <InputLeftAddon>{k}</InputLeftAddon>
                <Input name={`${name}.${k}`} step={1} w={160} value={values[name][k]} onChange={handleChange} />
              </InputGroup>
            )
          }
          </VStack>
        </ThemeItemStack>
      )                
    }
    return (
      <ThemeItemStack name={name}>
        <Input name={name} step={1} size="xs" w={160} value={values[name]} onChange={handleChange} />
        { !values[name] && <IconButton size="xs" icon={<TbTrash />} onClick={() => removeValues([name])} /> }
      </ThemeItemStack>
    )
  }

  return (
    <Box>
      <List spacing={2}>
        {
          Object.keys(values).map(name => <ListItem key={name}>{renderOption(name)}</ListItem>)
        }
        <ThemeItemForm onComplete={handleNewStyle} />
      </List>
    </Box>
  )
}