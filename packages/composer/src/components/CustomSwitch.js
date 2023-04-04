import { FormControl, FormLabel, Spacer, Flex, Switch } from '@chakra-ui/react'

export const CustomSwitch = ({ label, ...rest }) => {
  return (
    <FormControl as={Flex}>
      <FormLabel>{label}</FormLabel>
      <Spacer />
      <Switch {...rest} />
    </FormControl>    
  )
}