import { Box, keyframes } from '@chakra-ui/react'

const gradient = keyframes`
  0% { 
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
`

export const GradientLoader = props => (
  <Box 
    h={8}
    animation={`${gradient} 2s infinite forwards linear`}
    background="repeating-linear-gradient(to right, #7928CA 0%, #FF0080 50%, #7928CA 100%)"
    backgroundSize="200% auto"
    backgroundPosition="0 100%"
    {...props}
  />  
)