import { useMemo } from "react"

export default function Blocks({ blocks = [], components = {} }) {
  const renderBlocks = useMemo(() => {
    return blocks.map((block) => {
      const BlockComponent = components[block.name]
      return BlockComponent
        ? <BlockComponent
            key={block.key}
            block={block}
          />
        : null
    })
  }, [blocks, components])

  return (
    <>
      {renderBlocks}
    </>
  )
}