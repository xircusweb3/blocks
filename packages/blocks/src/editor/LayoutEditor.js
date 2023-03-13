import { Fragment, useMemo, useState } from 'react'
import { Box, Button, ButtonGroup, HStack, IconButton, Select, useColorMode } from '@chakra-ui/react'
import { useBlock } from "../hooks/provider"
import { TbAB, TbAdjustmentsHorizontal, TbApps, TbCheck, TbEdit, TbEye, TbEyeOff, TbHeading, TbLanguage, TbLayout, TbLayout2, TbMoon, TbSun, TbUpload } from 'react-icons/tb'
import { RightDrawer } from '../components/Drawer'
import ThemeEditor from './ThemeEditor'

const LAYOUT_VARIANTS = [
  'StackLayout', 
  'AppLayout', 
  'AppTabLayout', 
  'FullLayout', 
  'SlideLayout', 
  'DocLayout', 
  'MultiColumnLayout',
  'KanbanLayout'
]

export const LayoutEditor = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  const { layout, edit, toggleEdit, changeVariant } = useBlock()
  const [modal, setModal] = useState({ locale: false, variant: false })
  const [panel, setPanel] = useState({ variants: false })
  const [mini, setMini] = useState(false)

  const toggleMini = () => setMini(!mini)
  const handleOpen = (name) => setModal({ ...modal, [name]: true })
  const handleClose = (name) => setModal({ ...modal, [name]: false })  
  const togglePanel = (name) => setPanel({ ...panel, [name]: !panel[name] })

  const renderEditModals = useMemo(() => {
    return (
      <Fragment>
        <RightDrawer size="sm" isOpen={modal.locale} onClose={() => handleClose('locale')}>
          <ThemeEditor />
        </RightDrawer>
        <RightDrawer size="sm" isOpen={modal.variant} onClose={() => handleClose('variant')}>
          <Select onChange={({ target: { value: variant } }) => changeVariant(variant)}>
            {
              LAYOUT_VARIANTS.map(variant => <option key={variant} value={variant}>{variant}</option>)
            }
          </Select>
        </RightDrawer>
      </Fragment>
    )
  }, [modal, handleClose, changeVariant])

  const renderPanels = useMemo(() => {
    if (panel.variants) {
      return (
        <HStack>
  
        </HStack>
      )
    }
  }, [panel])

  const renderEditActions = useMemo(() => {
    return (
      <Box>
        <HStack spacing={1} mt={1}>
          <IconButton onClick={toggleColorMode} size="xs" icon={colorMode == 'dark' ? <TbSun /> : <TbMoon />} />
          <IconButton onClick={() => handleOpen('variant')} size="xs" icon={<TbApps />} />          
          <IconButton onClick={() => handleOpen('locale')} size="xs" icon={<TbLanguage />} />                    
          <IconButton onClick={toggleColorMode} size="xs" icon={<TbAB />} />                    
          <IconButton onClick={toggleColorMode} size="xs" icon={<TbHeading />} />
          <IconButton onClick={toggleColorMode} size="xs" icon={<TbAdjustmentsHorizontal />} />
        </HStack>
      </Box>
    )
  }, [edit, toggleColorMode])

  return (
    <Box pos="fixed" bottom={4} left={4} backdropFilter="blur(20px" p={4} rounded="md">
      <HStack spacing={1}>
        <IconButton size="xs" onClick={toggleEdit} icon={edit ? <TbCheck /> : <TbEdit />} />
        { edit && <IconButton onClick={toggleMini} size="xs" icon={mini ? <TbEyeOff /> : <TbEye />} /> }
      </HStack>
      { (edit && !mini) && renderEditActions }
      { (edit && !mini) && renderEditModals }
    </Box>
  ) 
}

export default LayoutEditor