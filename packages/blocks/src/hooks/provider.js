import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createContext, useMemo, useState, useContext } from 'react'
import { IntlProvider } from 'use-intl'
import { XircusProvider } from '@xircus-web3/react'

export const BlockContext = createContext()

const DEFAULT_THEME = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
})

export const BlockProvider = ({ app, children, router }) => {
  const [chain, setChain] = useState(1)
  const [locale, setLocale] = useState(router?.locale || 'en')
  const [layout, setLayout] = useState(app?.layout || {})
  const [messages, setMessages] = useState({})
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [pages, setPages] = useState(app?.pages || {})
  const [edit, setEdit] = useState(false)

  const toggleEdit = () => setEdit(!edit)
  
  const addPage = () => {

  }

  const updatePage = () => {
    
  }

  const removePage = () => {

  }

  const saveLayout = () => {

  }

  const changeVariant = (variant) => setLayout({ ...layout, variant })

  const getLayout = () => {

  }

  const removeLayout = () => {

  }

  const removeBlock = () => {

  }

  const addBlock = () => {

  }

  const updateBlock = () => {

  }

  const ctx = useMemo(() => ({
    app,
    layout, 
    edit,
    saveLayout,
    getLayout,
    removeLayout,
    addBlock,
    updateBlock,
    removeBlock,
    toggleEdit,
    changeVariant
  }), [
    app, 
    layout, 
    saveLayout, 
    getLayout, 
    removeLayout,
    removeBlock, 
    addBlock, 
    updateBlock,
    toggleEdit,
    changeVariant,
  ])

  return (
    <IntlProvider messages={messages} locale={locale}>
      <XircusProvider initApp={app} desiredChain={chain} autoAuth={true} autoConnect={true}>
        <ChakraProvider theme={theme}>
          <BlockContext.Provider value={ctx}>
            {children}
          </BlockContext.Provider>
        </ChakraProvider>
      </XircusProvider>    
    </IntlProvider>
  )
}

export const useBlock = () => {
  const ctx = useContext(BlockContext)
  return ctx
}
