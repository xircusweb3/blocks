import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const styles = {
  global: (props) => ({
    ':root': {
      '--popover-bg': 'orange'
    },
    body: {
      backgroundColor: props.colorMode === 'dark' ? '#090909' : 'white'
    },
    outline: '0px !important',
  })
}

const components = {
  Popover: {
    baseStyle: {
      content: {
        borderWidth: 0
      }
    }
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'transparent'
    },
    variants: {
      outline: props => ({
        borderColor: props.colorMode == 'light' ? 'gray.100' : 'gray.900',
        _hover: {
          borderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
        },
        _focus: {
          borderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
        },        
      }),
      filled: props => ({
        bg: props.colorMode == 'light' ? 'gray.100' : 'gray.900',
        _hover: {
          bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
        },
        _focus: {
          bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
        },
        borderColor: 'transparent'
      })
    },
  },
  Select: {
    variants: {
      outline: props => ({
        field: {
          borderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
          _hover: {
            borderColor: props.colorMode == 'light' ? 'gray.300' : 'gray.700',            
          },
          _focus: {
            borderColor: props.colorMode == 'light' ? 'gray.300' : 'gray.700',                        
          }
        }
      }),
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'transparent'
    },
    variants: {
      outline: props => ({
        field: {
          borderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
          _hover: {
            borderColor: props.colorMode == 'light' ? 'gray.300' : 'gray.700',            
          },
          _focus: {
            borderColor: props.colorMode == 'light' ? 'gray.300' : 'gray.700',                        
          }
        }
      }),
      filled: props => ({
        field: {
          bg: props.colorMode == 'light' ? 'gray.100' : 'gray.900',
          _hover: {
            bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
          },
          _focus: {
            bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
          },
          borderColor: 'transparent'
        }
      }) 
    }
  },
  Button: {
    variants: {
      solid: props => ({
        bg: props.colorMode == 'dark' ? 'gray.900' : 'gray.100',
        _hover: {
          bg: props.colorMode == 'dark' ? 'gray.800' : 'gray.200',          
        }
      }),
      outline: props => ({
        borderWidth: 1,
        borderColor: props.colorMode == 'dark' ? 'gray.900' : 'gray.100',
        _hover: {
          bg: props.colorMode == 'dark' ? 'gray.900' : 'gray.100',
        }
      })
    },
  }
}

export default extendTheme({ 
  config, 
  components, 
  styles
})