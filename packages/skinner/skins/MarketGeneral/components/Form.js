import { useState, useEffect, useRef, useMemo } from 'react'
import {
  useColorModeValue as mode, useDisclosure, VStack, Textarea, Text,
  Box, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Tag, Avatar, HStack,
  Input, FormControl, FormLabel, Select, IconButton, FormHelperText, Switch,
  Popover, PopoverTrigger, PopoverContent, PopoverBody, Button, Spinner,
  Highlight
} from '@chakra-ui/react'

export const FormSwitch = ({ label, left, right, rightProps, control, tag, ...rest }) => (
  <FormControl display="flex" alignItems="center" justifyContent="space-between" {...control}>
    <FormLabel mb={0} fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>
    <Switch {...rest} />
  </FormControl>
)

export const FormTags = ({ tags = [], separator = ',' }) => {
  const handleChange = () => {

  }

  return (
    <Box>
      { tags.map(tag => <Tag key={`tag-${tag}`}>{tag}</Tag>) }
      <Input variant="unstyled" onChange={handleChange} />
    </Box>
  )
}

// borderColor={mode('gray.200','gray.800')}
export const FormLabelText = ({ children, ...rest }) => <FormLabel fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')} {...rest}>{children}</FormLabel>

export const FormInput = ({ label, left, right, rightProps, leftProps, help, control, tag, ...rest }) => (
  <FormControl {...control}>
    <FormLabel fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>
    <InputGroup>
      { left && <InputLeftElement {...leftProps}>{left}</InputLeftElement> }
      <Input 
        {...rest}
        />
      { right && <InputRightElement w="auto" pr={3} {...rightProps}>{right}</InputRightElement> }
    </InputGroup>
    { help && <FormHelperText color="gray.500">{help}</FormHelperText> }
  </FormControl>
)

export const FormTextArea = ({ label, left, right, control, tag, ...rest }) => (
  <FormControl {...control}>
    <FormLabel fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>
    <InputGroup>
      { left && <InputLeftElement children={left} /> }
      <Textarea 
        {...rest}
        />
      { right && <InputRightElement width="4.5rem">{right}</InputRightElement> }
    </InputGroup>
  </FormControl>
)

export const FormSelect = ({ label, left, right, help, rightProps, control, options, ...rest }) => (
  <FormControl {...control}>
    <FormLabel fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label}</FormLabel>
    <InputGroup>
      { left && <InputLeftElement children={left} /> }
      <Select {...rest}>
        <option key="selector" value="">Select an option</option>
        { (options || []).map(option => <option key={option.value} value={option.value}>{option.label}</option>) }
      </Select>
      { right && <InputRightElement w="4.5rem" {...rightProps}>{right}</InputRightElement> }
    </InputGroup>
    <FormHelperText>{help}</FormHelperText>
  </FormControl>
)

export const FormAutoComplete = ({ options = [], label, selected, extra, left, right, rightProps, leftProps, help, renderItem, renderKey, control, tag, onSelect, ...rest }) => {
  const inputRef = useRef()
  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = mode('gray.200', 'gray.800')

  const results = useMemo(() => search.length > 2
    ? options.filter(o => JSON.stringify(o).search(new RegExp(search, 'ig')) > -1)
    : [],
    [search, options]
  )

  const handleChange = (e) => {
    setSearch(e.target.value)
    onOpen()
  }

  const handleSelect = (item) => {
    setSearch(renderItem(item))
    onSelect && onSelect(item)
  }

  const handleSelectText = () => {
    inputRef.current.select()
  }

  return (
    <Popover placement="bottom-start" closeOnBlur closeOnEsc matchWidth isOpen={isOpen} initialFocusRef={inputRef}>
      <PopoverTrigger>
        <FormControl {...control}>
          <HStack mb={2}>
            <FormLabel mb={0} flex={1} fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label}</FormLabel>
            {tag && <Tag size="sm">{tag}</Tag>}
            {extra}
          </HStack>
          <InputGroup>
            { left && <InputLeftElement {...leftProps}>{left} </InputLeftElement> }
            <Input ref={inputRef} onBlur={onClose} value={search} onChange={handleChange} onFocus={handleSelectText} {...rest} />
            { right && <InputRightElement width="4.5rem" {...rightProps}>{right}</InputRightElement> }
          </InputGroup>
          { help && <FormHelperText>{help}</FormHelperText> }
        </FormControl>
      </PopoverTrigger>
      {
        results.length > 0 && (
          <PopoverContent bg={bg} w="full" borderWidth={0} _focus={{ borderWidth: 0 }} _hover={{ borderWidth: 0 }}>
          <PopoverBody>
          {
            results.slice(0, 10).map(r =>
              <Text onClick={() => handleSelect(r)} _hover={{ bg: mode('gray.100', 'gray.900'), rounded: 'md' }} key={renderKey(r)} fontWeight="bold" fontSize="sm" cursor="pointer" p={2}>
                <Highlight query={search} styles={{ color: 'orange.500' }}>
                  { renderItem(r) }
                </Highlight>
              </Text>
            )
          }
          </PopoverBody>
        </PopoverContent>
        )
      }
    </Popover>
  )
}


  // <Button
  // variant="ghost"
  // size="sm"
  // isFullWidth
  // mr={2}
  // leftIcon={r.selected && <FiCheckCircle />}

  // >

  // </Button>
  // )
