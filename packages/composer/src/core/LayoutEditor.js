import { useMemo, useState, Fragment } from 'react'
import { useWallet, useRegistry } from '@xircus-web3/react'
import { Box, Heading, Button, Container, VStack, IconButton, HStack, Spacer, Select, useColorMode } from '@chakra-ui/react'
import { useBlock } from "../hooks/provider";
import { StackLayout } from "../layout/StackLayout";
import { AppLayout } from "../layout/AppLayout";
import { AppTabLayout } from "../layout/AppTabLayout";
import { SlideLayout } from "../layout/SlideLayout";
import { ConnectModal } from '../components/ConnectModal';
import { Wallet } from '../components/Wallet';
import { TbCheck, TbEdit, TbSun, TbMoon, TbApps, TbSitemap, TbLanguage, TbUpload, TbCloudUpload, TbLogout, TbCloudDataConnection } from 'react-icons/tb';
import { RightDrawer } from '../components/Drawer';
import { OutlineCard } from '../components/CustomCard';
import ThemeList from '../editor/ThemeList';
import { LAYOUT_VARIANTS } from '../constants/urls';
import FontsManager from '../renderer/FontsManager';
import MetasManager from '../renderer/MetasManager';
import PagesManager from '../renderer/PagesManager';

const VariantSelector = ({ ...rest }) => {
  const { changeVariant, layout } = useBlock()

  return (
    <OutlineCard title="Layout Variant" mb={4} {...rest}>
      <Select onChange={({ target: { value: variant } }) => changeVariant(variant)} value={layout?.variant}>
      {
        LAYOUT_VARIANTS.map(variant => <option key={variant} value={variant}>{variant}</option>)
      }
      </Select>
    </OutlineCard>
  )
}

export const LayoutEditor = () => {
  const wallet = useWallet()
  const api = useRegistry()
  const { toggleColorMode, colorMode } = useColorMode()
  const { layout, head: Head, fonts, metas, app, edit, toggleEdit, updateTheme, pages } = useBlock()
  const [modal, setModal] = useState({ locale: false, variant: false })
  const [updating, setUpdating] = useState(false)

  const handleOpen = (name) => setModal({ ...modal, [name]: true })
  const handleClose = (name) => setModal({ ...modal, [name]: false })

  const handleSave = async() => {
    setUpdating(true)
    let reply
    reply = await api.mutation('setDraftPages', { appId: app._id.toString(), pages }, false, false)
    reply = await api.mutation('setAppLayout', { appId: app._id.toString(), layout }, false, false)
    reply = await api.mutation('publishAppPages', { appId: app._id.toString() }, false, false)
    console.log("SAVED TEMPALTE", layout, reply)
    setUpdating(false)
  }

  const handlePublish = async() => {
    setUpdating(true)
    const res = await api.mutation('publishAppPages', { appId: app._id.toString() }, false, false)
    console.log("PUBLISHED", res)
    setUpdating(false)
  }

  const handleOk = async() => {
    await handleSave()
    toggleEdit()
  }

  const renderHead = useMemo(() => {
    return (
      <Head>
        <title>{app.name}</title>
        {
          (Array.isArray(fonts) ? fonts : []).map(font => <link key={font.name} href={font.url} rel="stylesheet" />)
        }
        {
          (Array.isArray(metas) ? metas : []).map(meta => <meta key={meta.name} property={meta.name} content={meta.content} />)
        }
      </Head>      
    )
  }, [Head, fonts, metas, app])

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'StackLayout': return <StackLayout /> // stack
      case 'AppLayout': return <AppLayout /> // dashboard
      // case 'AppTabLayout': return <AppTabLayout /> // with tabs
      // case 'SlideLayout': return <SlideLayout /> // full width
    }
  }, [layout.variant])
  
  const renderEditorPanels = useMemo(() => {
    return (
      <Fragment>
        <RightDrawer 
          header="Site"
          size="sm"
          isOpen={modal.site}
          onClose={() => handleClose('site')}>
          <FontsManager />
          <MetasManager />
        </RightDrawer>        
        <RightDrawer 
          header="Layout And Pages"
          size="sm" 
          isOpen={modal.variant} onClose={() => handleClose('variant')}>
          <VariantSelector />       
          <PagesManager /> 
          <ThemeList theme={layout.theme} updateTheme={updateTheme} />
        </RightDrawer>
      </Fragment>
    )
  }, [modal, layout, handleClose, updateTheme])

  // <IconButton onClick={handlePublish} isLoading={updating} size="xs" icon={<TbCloudDataConnection />} />             
  // 
  // <IconButton onClick={() => handleOpen('locale')} size="xs" icon={<TbLanguage />} />

  const renderEditorControl = useMemo(() => {
    return (
      <Box pos="fixed" bottom={4} left={4} backdropFilter="blur(20px)" p={4} rounded="md" zIndex={99999}>
        <HStack spacing={1} mb={1}>
          {
            edit
            ? <IconButton size="xs" onClick={handleOk} isLoading={updating} icon={<TbCheck />} />
            : <IconButton size="xs" onClick={toggleEdit} icon={<TbEdit />} />
          }
          <IconButton onClick={() => handleOpen('variant')} size="xs" icon={<TbApps />} />          
          <IconButton onClick={() => handleOpen('site')} size="xs" icon={<TbSitemap />} />
          <IconButton onClick={handleSave} isLoading={updating} size="xs" icon={<TbCloudUpload />} />   
          {layout.variant}
        </HStack>
        <HStack spacing={1}>
          <IconButton onClick={toggleColorMode} size="xs" icon={colorMode == 'dark' ? <TbSun /> : <TbMoon />} />
          <IconButton onClick={wallet.disconnect} size="xs" icon={<TbLogout />} />
        </HStack>
      </Box>
    )
  }, [toggleColorMode, handleOpen, handleOk, layout, edit, toggleEdit, handleSave, wallet, updating])


  if (wallet.status == 'connected' && wallet.account == app.ownerAddr) {

    return (
      <Box>
        {renderEditorPanels}
        {renderEditorControl}
        {renderHead}
        {renderLayout}
      </Box>
    )
  }

  if (wallet.status == 'connected') {
    return (
      <Container>
        <VStack minH="50vh" justify="center" gap={2}>
          <Heading>Unauthorized Access</Heading>
          <Box>Please connect to your wallet that deployed this app</Box>
          <Button onClick={wallet.disconnect}>Disconnect</Button>
        </VStack>
      </Container>
    )
  }

  return (
    <Container>
      <VStack minH="50vh" justify="center" gap={2}>
        <Heading>Xircus Page Builder</Heading>
        <Box>Connect your wallet to begin editing the site</Box>        
        <ConnectModal btnProps={{ size: 'lg' }}>
          <Wallet />
        </ConnectModal>
      </VStack>
    </Container>
  )
 
}