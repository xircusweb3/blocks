import { useState, useEffect } from 'react'
import { useDisclosure, IconButton, Accordion, useColorModeValue as mode } from "@chakra-ui/react";
import { RightDrawer } from "../components/Drawer";
import { TbEdit } from 'react-icons/tb';
import { OutlineCard } from '../components/CustomCard';
import { useBlock } from '../hooks/provider';
import { ThemeItemPanel } from './ThemeItemPanel';
import { ThemeItem } from './ThemeItem';

export default function ThemeEditor({ theme, children, updateTheme, onClose }) {
  const { edit } = useBlock()
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure()
  
  const handleClose = () => {
    onClose()
    closeModal()
  }

  if (edit) {
    return (
      <>
        <RightDrawer size="sm" onClose={handleClose} isOpen={isOpen} header="Edit">
          {children}
          <OutlineCard title="Theme">
            <Accordion allowMultiple={true} borderColor={mode('gray.100', 'gray.900')}>
            {
              Object.keys(theme || {}).map(name => 
                <ThemeItemPanel key={name} title={name}>
                  <ThemeItem name={name} styles={theme[name] || {}} onChange={updateTheme} />
                </ThemeItemPanel>
              )
            }    
            </Accordion>
          </OutlineCard>
        </RightDrawer>
        <IconButton icon={<TbEdit />} size="xs" pos="absolute" zIndex={1399} top="50%" right={2} onClick={onOpen} />
      </>
    )    
  }

}