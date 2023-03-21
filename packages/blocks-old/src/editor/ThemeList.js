import { Accordion, useColorModeValue as mode } from "@chakra-ui/react";
import { OutlineCard } from "../components/Card";
import { ThemeItem } from "./ThemeItem";
import { ThemeItemPanel } from "./ThemeItemPanel";

export default function ThemeList({ theme, updateTheme, ...rest }) {
  return (
    <OutlineCard title="Theme" {...rest}>
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
  )
}