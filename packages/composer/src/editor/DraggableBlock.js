import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const swipeConfidenceThreshold = 5000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export default function DraggableBlock({ blockIndex, children, onUp, onDown }) {

  const handleDragEnd = (event, options) => {
    const { offset, velocity } = options
    const swipe = swipePower(offset.y, velocity.y)
    if (swipe < -swipeConfidenceThreshold) {
      onUp(blockIndex)
    } else if (swipe > swipeConfidenceThreshold) {
      onDown(blockIndex)
    }
  }

  return (
    <Box
      as={motion.div}
      drag="y"
      pos="relative"
      role="group"
      onDragEnd={handleDragEnd}
      dragConstraints={{ top: 0, bottom: 0 }}>
      {children}
    </Box>
  )
}