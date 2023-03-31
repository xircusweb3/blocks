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

export default extendTheme({
  config,
  styles
})