import { Fragment, useMemo, useState } from 'react'
import { Box, Button, Heading, HStack, IconButton, layout, Select, useColorMode } from '@chakra-ui/react'
import { useBlock } from "../hooks/provider"
import { TbAB, TbAdjustmentsHorizontal, TbApps, TbCheck, TbEdit, TbEye, TbEyeOff, TbHeading, TbLanguage, TbLayout, TbLayout2, TbMoon, TbSitemap, TbSun, TbUpload } from 'react-icons/tb'
import { RightDrawer } from '../components/Drawer'
import FontsManager from '../renderer/FontsManager'
import ThemeEditor from './ThemeEditor'
import ThemeList from './ThemeList'
import { OutlineCard } from '../components/Card'

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

const VariantSelector = ({ ...rest }) => {
  const { changeVariant } = useBlock()

  return (
    <OutlineCard title="Layout Variant" mb={4} {...rest}>
      <Select onChange={({ target: { value: variant } }) => changeVariant(variant)}>
      {
        LAYOUT_VARIANTS.map(variant => <option key={variant} value={variant}>{variant}</option>)
      }
      </Select>  
    </OutlineCard>
  )
}
export const LayoutEditor = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  const { layout, edit, toggleEdit, changeVariant, page, setPage } = useBlock()
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
        <RightDrawer 
          header="Locale"
          size="sm"
          isOpen={modal.locale}
          onClose={() => handleClose('locale')}>
          <Heading>Locale</Heading>
        </RightDrawer>
        <RightDrawer 
          header="Site"
          size="sm"
          isOpen={modal.site}
          onClose={() => handleClose('site')}>
          <Heading>Site</Heading>
          <FontsManager />
        </RightDrawer>
        <RightDrawer 
          header="Layout And Pages"
          size="sm" 
          isOpen={modal.variant} onClose={() => handleClose('variant')}>
          <VariantSelector />          
          <OutlineCard title="Page" mb={4}>

          </OutlineCard>
          <ThemeList theme={layout.theme} />
        </RightDrawer>
      </Fragment>
    )
  }, [modal, handleClose, layout])

  const togglePage = () => {
    if (page == '/') {
      setPage('/test')
    } else {
      setPage('/')
    }
  }

  // Layout
  // Locale
  // Meta
  // Layout Theme
  // Fonts A|B
  // Pages

  // <IconButton onClick={() => handleOpen('setting')} size="xs" icon={<TbAdjustmentsHorizontal />} />

  const renderEditActions = useMemo(() => {
    return (
      <Box>
        <HStack spacing={1} mt={1}>
          <IconButton onClick={toggleColorMode} size="xs" icon={colorMode == 'dark' ? <TbSun /> : <TbMoon />} />
          <IconButton onClick={() => handleOpen('variant')} size="xs" icon={<TbApps />} />          
          <IconButton onClick={() => handleOpen('site')} size="xs" icon={<TbSitemap />} />
          <IconButton onClick={() => handleOpen('locale')} size="xs" icon={<TbLanguage />} />                    
        </HStack>
      </Box>
    )
  }, [edit, toggleColorMode, page, togglePage])

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