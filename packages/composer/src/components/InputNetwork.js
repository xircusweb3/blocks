import { Box, FormControl, Select } from "@chakra-ui/react"

export const InputNetwork = ({ label, theme, ...rest }) => {

  return (
    <FormControl {...theme?.control}>
      <FormLabel {...theme?.label}>{label}</FormLabel>
      <Select {...theme?.input}>
            
      </Select>
      <FormHelperText {...theme?.help}>We'll never share your email.</FormHelperText>
    </FormControl>
  )
}