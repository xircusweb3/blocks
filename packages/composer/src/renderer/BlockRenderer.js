import { Box, Button, ButtonGroup, Center, Divider, Heading, HStack, IconButton, Spacer, Stack, Tooltip, useColorModeValue as mode, useDisclosure } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { TbTrash, TbChevronsDown, TbChevronsUp } from "react-icons/tb"
import { blockDefaults } from "../blocks"
import { useBlock } from '../hooks/provider'
import BlockAddOptions from "./BlockAddOptions"
import DraggableBlock from "./DraggableBlock"

Array.prototype.move = function(from, to) {
  return this.splice(to, 0, this.splice(from, 1)[0])
}

const createKey = (length = 6) => (Math.random() + 1).toString(36).substring(length) + Date.now()

export default function BlockRenderer({ group = 'main', blocks = [], label, components = {} }) {
  const { edit, setPageBlocks, setBlocks, page } = useBlock()
  const [items, setItems] = useState(blocks)
  const [history, setHistory] = useState([])
  const [counter, setCounter] = useState(0)

  const updateAndPushBlocks = () => {
    console.log("UPDATING APP LAYOUT AND BLOCKS")
    if (group == 'main') {
      setPageBlocks(page, items)
    } else {
      setBlocks(group, items)
    }
  }

  const updateAndPushHistory = () => {
    history.push(items)
    setHistory(history)
    setCounter(counter + 1)
    updateAndPushBlocks()
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

  const renderBlocks = useMemo(() => {
    if (edit) {
      return items.map((block, blockIndex) => {
        if (block == null) { return null }

        const BlockComponent = components[block.name]
        
        return BlockComponent ? 
          <DraggableBlock key={block.key} blockIndex={blockIndex} onUp={onMoveUp} onDown={onMoveDown}>
            <Box borderStyle="dashed" borderWidth={1}>
              <HStack pos="absolute" top="50%" left="50%" zIndex={1399} display="none" _groupHover={{ display: 'block' }}>
                <ButtonGroup size="xs" isAttached bg="#222" rounded="md">
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
          </DraggableBlock>
        : null
      })   
    }

    return items.map((block, blockIndex) => {
      // console.log("BLOCK ", block)
      if (block == null) { return null }

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
      {renderBlocks}
      {
        edit && <BlockAddOptions
                  components={components}
                  blockDefaults={blockDefaults}
                  group="main"
                  onAdd={onAdd}
                  page={page}
                  label={label}
                  />
      }
    </>
  )
}

  // <Box
  // key={block.key}
  // as={motion.div}
  // drag="y"
  // pos="relative"
  // role="group"
  // onDragEnd={(e, o) => handleDragEnd(blockIndex, o)}
  // dragConstraints={{ top: 0, bottom: 0 }}>

  // </Box>