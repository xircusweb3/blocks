import { Box, Button, ButtonGroup, Center, Divider, Heading, HStack, IconButton, Spacer, Stack, Tooltip, useColorModeValue as mode, useDisclosure } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { TbArrowDown, TbArrowUp, TbSettings, TbPlus, TbSun, TbTrash, TbChevronsDown, TbChevronsUp, TbSortAscending, TbSortDescending, TbSortDescending2 } from "react-icons/tb"
import { motion } from "framer-motion"
import { useBlock } from '../hooks/provider'

Array.prototype.move = function(from, to) {
  return this.splice(to, 0, this.splice(from, 1)[0])
}

const createKey = (length = 10) => (Math.random() + 1).toString(36).substring(length)

const swipeConfidenceThreshold = 5000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

const InAdd = () => (
  <Box pos="relative">
    <HStack _hover={{ opacity: 1 }} opacity="0">
      <Divider />
      <IconButton size="xs" rounded="full" icon={<TbPlus />} />
      <Divider />
    </HStack>  
  </Box>
)

export default function BlockRenderer({ name, blocks = [], components = {} }) {
  const { edit, setBlocks } = useBlock()
  const [items, setItems] = useState(blocks)
  const [history, setHistory] = useState([])
  const [counter, setCounter] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!edit) {
      setBlocks(name, blocks)
    }
  }, [edit])

  const updateAndPushHistory = () => {
    history.push(items)
    setHistory(history)
    setCounter(counter + 1)
  }

  const onMoveUp = (blockIndex) => {
    if (blockIndex > 0) {
      let newItems = items
      newItems.move(blockIndex, blockIndex - 1)
      setItems(newItems)
      updateAndPushHistory()
    }
  }

  const onMoveDown = (blockIndex) => {
    if (blockIndex < items.length) {
      items.move(blockIndex, blockIndex + 1)
      setItems(items)
      updateAndPushHistory()      
    }
  }

  const onAdd = (item) => {
    let newItems = items
    newItems.push({ ...item, key: createKey() })
    setItems(newItems)
    updateAndPushHistory()    
  }

  const onRemove = (blockIndex) => {
    let newItems = items
    delete newItems[blockIndex]
    setItems(newItems)
    updateAndPushHistory()
  }

  const onSave = (blockIndex, item) => {
    let newItems = items
    newItems[blockIndex] = item
    setItems(newItems)
    updateAndPushHistory()
  }

  const handleDragEnd = (blockIndex, { offset, velocity }) => {
    const swipe = swipePower(offset.y, velocity.y)
    if (swipe < -swipeConfidenceThreshold) {
      onMoveUp(blockIndex)
    } else if (swipe > swipeConfidenceThreshold) {
      onMoveDown(blockIndex)
    }
  }  

  const renderBlocks = useMemo(() => {
    if (edit) {
      return items.map((block, blockIndex) => {
        const BlockComponent = components[block.name]
        return BlockComponent ? 
          <Box
            key={block.key}
            as={motion.div}
            drag="y"
            pos="relative"
            role="group"
            onDragEnd={(e, o) => handleDragEnd(blockIndex, o)}
            dragConstraints={{ top: 0, bottom: 0 }}>
            <Box borderStyle="dashed" borderWidth={1}>
              <HStack pos="absolute" top="50%" left="50%" zIndex={1399} display="none" _groupHover={{ display: 'block' }}>
                <Spacer />
                <ButtonGroup size="xs" isAttached>
                  <Tooltip label="Add Block Before">
                    <IconButton onClick={() => onMoveDown(blockIndex)} icon={<TbSortAscending />} rounded="full" size="xs" />
                  </Tooltip>
                  <Tooltip label="Add Block After">
                    <IconButton onClick={() => onMoveDown(blockIndex)} icon={<TbSortDescending />} rounded="full" size="xs" />              
                  </Tooltip>
                  <IconButton onClick={() => onMoveDown(blockIndex)} icon={<TbChevronsDown />} />
                  <IconButton onClick={() => onMoveUp(blockIndex)} icon={<TbChevronsUp />} />
                  <IconButton onClick={() => onRemove(blockIndex)} icon={<TbTrash />} />                
                </ButtonGroup>
              </HStack>
              <BlockComponent
                block={block}
                blockIndex={blockIndex}
                onSave={onSave}
              />
            </Box>
          </Box>
        : null
      })   
    }

    return items.map((block, blockIndex) => {
      const BlockComponent = components[block.name]
      return BlockComponent
        ? <BlockComponent
            key={block.key}
            block={block}
            blockIndex={blockIndex}
          />
        : null
    })

  }, [edit, items, components, onSave])

  return (
    <>
      {renderBlocks}
    </>
  )
}