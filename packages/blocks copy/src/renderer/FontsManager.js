import { Box, HStack, IconButton, Spacer, Text } from "@chakra-ui/react";
import { TbExternalLink, TbTrash } from "react-icons/tb";
import { OutlineCard } from "../components/Card";
import { useBlock } from "../hooks/provider";

export default function FontsManager() {
  const { fonts, addFont, removeFont } = useBlock()  

  return (
    <OutlineCard title="Fonts" my={2}>
      {
        fonts.map((font, fontKey) => (
          <HStack key={fontKey}>
            <Text fontFamily={font.name} fontWeight="bold">{font.name}</Text>
            <Spacer />
            <IconButton size="xs" variant="ghost" icon={<TbExternalLink />} as="a" href={font.url} target="_blank" />
            <IconButton size="xs" variant="ghost" icon={<TbTrash />} onClick={() => removeFont(font.name)} />
          </HStack>
        ))
      }
    </OutlineCard>
  )
}