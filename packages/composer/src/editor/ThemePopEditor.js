import { 
  IconButton, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  Accordion, 
  useColorModeValue as mode
} from "@chakra-ui/react";
import { TbEdit } from 'react-icons/tb';
import { OutlineCard } from '../components/CustomCard';
import { ThemeItemPanel } from './ThemeItemPanel';
import { ThemeItem } from './ThemeItem';
import { useBlock } from '../hooks/provider';

export default function ThemePopEditor({ theme, children, updateTheme, onClose }) {
  const { edit } = useBlock()
  if (edit) {
    return (
      <Popover onClose={onClose}>
        <PopoverTrigger>
          <IconButton icon={<TbEdit />} size="xs" pos="absolute" top="50%" right={2} />
        </PopoverTrigger>        
        <PopoverContent backdropFilter="blur(20px)" bg={mode('gray.100', 'gray.900')}>
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
        </PopoverContent>
      </Popover>
    )
  }
  return null
}