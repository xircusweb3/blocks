import { useState, useRef } from 'react'
import { Box, Button, Grid, HStack } from "@chakra-ui/react"

const scrollbar = { 
  '&::-webkit-scrollbar': { width: '6px', height: '6px', background: '#181818', borderRadius: '2px' },
  '&::-webkit-scrollbar-thumb': { background: '#fff', borderRadius: '2px' },
}

export default function SlideLayout() {
  return (
    <Box>
      <Grid w="100vw" h="100vh" pos="fixed" top={0} autoFlow="column" overflowX="auto" scrollSnapStop="always" scrollSnapType="x mandatory" sx={scrollbar}>
        <Box id="#1" w="100vw" bg="green.500">Slide A</Box>
        <Box id="#2" w="100vw" bg="orange.500">Slide B</Box>
      </Grid>
    </Box>
  )
}