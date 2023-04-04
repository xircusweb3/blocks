import { Box, HStack, IconButton, Spacer, Text, Input } from "@chakra-ui/react";
import { TbExternalLink, TbTrash } from "react-icons/tb";
import { OutlineCard } from "../components/CustomCard";
import { NameValueForm } from "../components/Form";
import { useBlock } from "../hooks/provider";

export default function MetasManager() {
  const { metas } = useBlock()  

  return (
    <OutlineCard title="Meta Tags" my={2}>
      {
        (Array.isArray(metas) ? metas : []).map((meta, metaKey) => (
          <HStack key={metaKey} mb={2}>
            <Box>{meta?.name}</Box>
            <Spacer />
            <Input size="sm" name={meta?.name} maxW={200} />
          </HStack>
        ))
      }
      <Box mt={4}>
        <NameValueForm />
      </Box>
    </OutlineCard>
  )
}