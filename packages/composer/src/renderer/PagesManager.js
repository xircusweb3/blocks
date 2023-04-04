import { Box, HStack, IconButton, Spacer, Text, Input } from "@chakra-ui/react";
import { TbExternalLink, TbTrash } from "react-icons/tb";
import { OutlineCard } from "../components/CustomCard";
import { useBlock } from "../hooks/provider";

export default function PagesManager() {
  const { pages } = useBlock()
  return (
    <OutlineCard title="Pages" mb={4}>
    </OutlineCard>
  )
}