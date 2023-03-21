import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Spacer } from '@chakra-ui/react'

export const ThemeItemPanel = ({ title, children }) => {
  return (
    <AccordionItem>
      <AccordionButton fontSize="sm" p={0} py={2} bg="transparent" _hover={{ bg: 'transparent' }}>
        { title }
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel p={0}>
        {children}
      </AccordionPanel>
    </AccordionItem>    
  )
}