import { Box } from "@chakra-ui/react";
import { useBlock } from "../hooks/provider";



// Renders The Page Blocks
export default function PageRenderer() {
  const { blocks, page, setPageBlocks } = useBlock()

  return (
    <Box>

    </Box>
  )
}