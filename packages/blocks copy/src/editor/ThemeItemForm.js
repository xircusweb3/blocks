import { useState } from 'react'
import { Box, HStack, Select, Text, Input, IconButton, useColorModeValue as mode, Button, Tab, TabList, TabPanels, TabPanel, Tabs } from '@chakra-ui/react'
import { TbPlus, TbShape, TbSubtask } from 'react-icons/tb'
import { NameValueForm } from '../components/Form'

export const ThemeItemForm = ({ onComplete }) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [fields, setFields] = useState({})
  
  const tabStyle = {
    fontSize: 'xs',
    color: mode('black', 'white'),
    borderBottomWidth: 1,
  }

  const panelStyle = {
    px: 0,
    py: 2
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      onComplete && onComplete(name, value)
      setName('')
      setValue('')
    }
  }

  const handleSave = () => {
    if (name) {
      onComplete && onComplete(name, fields)
      console.log("FIELDS", name, fields)
      setName('')
      setFields({})
    }
  }

  const handleFieldsComplete = (name, value) => {
    console.log("FIELDs", name, value)
    setFields({ ...fields, [name]: value })
  }

  return (
    <Tabs size="sm">
      <TabList borderBottomWidth={1} borderBottomColor={mode('gray.100', 'gray.900')}>
        <Tab {...tabStyle}>Basic</Tab>
        <Tab {...tabStyle}>SubField</Tab>        
      </TabList>
      <TabPanels>
        <TabPanel {...panelStyle}>
          <HStack onSubmit={handleSubmit} method="POST" as="form">
            <Input size="xs" value={name} onChange={e => setName(e.target.value)} isRequired />
            <Input size="xs" value={value} onChange={e => setValue(e.target.value)} isRequired />
            <IconButton size="xs" type="submit" icon={<TbPlus />}  />
          </HStack>
        </TabPanel>
        <TabPanel {...panelStyle}>
          <Input size="xs" value={name} onChange={e => setName(e.target.value)} isRequired mb={2} />
          {
            Object.keys(fields).map((f) => (
              <HStack key={f} fontSize="sm" mb={2}>
                <Text w="full" bg="gray.500" color="white" pl={2}>{f}</Text>
                <Text w="full" fontWeight="bold">{fields[f]}</Text>
              </HStack>
            ))
          }
          <NameValueForm size="xs" onComplete={handleFieldsComplete} mb={2} />
          <Button size="xs" w="full" onClick={handleSave}>Save</Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}