import { HStack, Input, Box, FormLabel, FormControl, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const DateTimeInput = ({ label, control, showUnix = true, onComplete }) => {
  const [date, setDate] = useState(false) 
  const [unix, setUnix] = useState('')
  const [rel, setRel] = useState('')

  useEffect(() => {
    if (date) {
      const d = dayjs(date)
      setUnix(d.unix())
      setRel(d.fromNow())
      onComplete && onComplete(unix, date)
    }
  }, [date])

  const handleChange = ({ target: { value } }) => setDate(value)

  return (
    <FormControl {...control}>
      <Flex justify="space-between">
        <FormLabel fontSize="sm" fontWeight="bold" color={mode('gray.700', 'gray.300')}>{label}</FormLabel> 
        { showUnix && <FormLabel fontSize="sm" mx={0} color="gray.500">{unix} {rel && `(${rel})`}</FormLabel> }
      </Flex>
      <HStack gap={2}>
        <Input name="date" type="datetime-local" onChange={handleChange} />
      </HStack>
    </FormControl>
  )
}