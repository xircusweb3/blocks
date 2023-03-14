import { useState } from 'react'
import { Box, Heading } from "@chakra-ui/react"
import { useBlock } from "../../hooks/provider"

export const MarqueeDefault = {
  name: 'Marquee',
  theme: {

  },
  data: {

  }
}

export const Marquee = ({ block, blockIndex }) => {
  const { edit } = useBlock()
  const [data, setData] = useState(block?.data)

  console.log("MARQUEEEEE", block, edit)

  return (
    <Box>
      <Heading>{data.text}</Heading>
    </Box>
  )
}