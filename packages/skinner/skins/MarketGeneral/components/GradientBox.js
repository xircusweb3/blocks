import { Heading, Box, Button, useColorMode } from '@chakra-ui/react'

export const GradientTitle = ({ children, ...rest }) => (
  <Heading size="lg" letterSpacing={2} bgGradient="linear(to-l, #8a2387, #e94057, #f27121)" bgClip="text" {...rest}>
    {children}
  </Heading>
)

export const GradientBox = props => {
  return (
    <Box
      borderWidth={2}
      borderColor="transparent"
      style={{
        backgroundImage: `
          ${useColorMode().colorMode == 'light' ? 'linear-gradient(#f7fafc, #f7fafc)' : 'linear-gradient(black, black)' },
          ${useColorMode().colorMode == 'light' ? 'linear-gradient(#f7fafc, #f7fafc)' : 'linear-gradient(black, black)' },
          linear-gradient(to right, #8a2387, #e94057, #f27121)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, padding-box, border-box'
      }}
      {...props}
      />
  )
}

export const GradientButton = ({ children, ...props }) => (
  <Button
    color="white"
    transition="all 300ms ease"
    borderRadius="6px"
    borderWidth={0}
    size="md" bgGradient="linear(to-l, #8a2387, #e94057, #f27121)"
    _hover={{ boxShadow: '0px 0px 10px orange', bg: '#111', bgGradient: 'linear(to-l, #8a2387, #e94057, #f27121)' }}
    {...props}>
    {children}
  </Button>
)
