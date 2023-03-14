import { Box, Button, ButtonGroup, Center, Divider, Heading, HStack, IconButton, Spacer, Stack, Tooltip, useColorModeValue as mode, useDisclosure } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { TbArrowDown, TbArrowUp, TbSettings, TbPlus, TbSun, TbTrash, TbChevronsDown, TbChevronsUp, TbSortAscending, TbSortDescending, TbSortDescending2 } from "react-icons/tb"
import { motion } from "framer-motion"
import { useBlock } from '../hooks/provider'
import BlockOptions from "./BlockOptions"

Array.prototype.move = function(from, to) {
  return this.splice(to, 0, this.splice(from, 1)[0])
}

const createKey = (length = 10) => (Math.random() + 1).toString(36).substring(length)

const swipeConfidenceThreshold = 5000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export default function BlockRenderer({ group = 'main', blocks = [], components = {} }) {
  const { edit, setBlocks } = useBlock()
  const [items, setItems] = useState(blocks)
  const [history, setHistory] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (!edit) {
      setBlocks(group, items)
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

  const onChange = (blockIndex, item) => {
    console.log("BLOCK ITEMS", blockIndex, item)
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
                  <IconButton onClick={() => onMoveDown(blockIndex)} icon={<TbChevronsDown />} />
                  <IconButton onClick={() => onMoveUp(blockIndex)} icon={<TbChevronsUp />} />
                  <IconButton onClick={() => onRemove(blockIndex)} icon={<TbTrash />} />
                </ButtonGroup>
              </HStack>
              <BlockComponent
                block={block}
                group={group}
                blockIndex={blockIndex}
                onChange={onChange}
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

  }, [edit, group, items, components, onChange])

  return (
    <>
      <BlockOptions />
      {renderBlocks}
    </>
  )
}