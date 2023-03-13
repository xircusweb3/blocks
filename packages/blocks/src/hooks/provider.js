import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createContext, useMemo, useState, useContext } from 'react'
import { IntlProvider } from 'use-intl'
import { XircusProvider } from '@xircus-web3/react'

export const BlockContext = createContext()

const DEFAULT_THEME = {
  config: {
    cssVarPrefix: 'xw3',
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  semanticTokens: {
    colors: {
      card: {
        default: 'gray.50',
        _dark: 'gray.800',
      },
      'chakra-body-bg': {
        default: 'white',
        _dark: 'gray.900'
      }
    }
  }
}

export const BlockProvider = ({ app, children, router }) => {
  const page = router?.query?.page || '/'
  const locale = router?.query?.locale || 'en'
  const messages = app?.locales[locale] || {}
  const dir = locale == 'ar' ? 'rtl' : 'ltr'

  console.log("MESSAGES", messages, router)

  const [chain, setChain] = useState(1)
//  const [locale, setLocale] = useState(router?.locale || 'en')
  const [layout, setLayout] = useState(app?.layout || {})
//  const [messages, setMessages] = useState({})
  const [semantics, setSemantics] = useState({})
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [pages, setPages] = useState(app?.pages || {})
  const [edit, setEdit] = useState(false)
  const themer = extendTheme(theme)

  console.log("THEMER", themer)

  const updateTheme = (newTheme) => {
    setTheme({ 
      ...theme, 
      ...newTheme
    })
  }

  const toggleEdit = () => setEdit(!edit)
  
  const addPage = () => {

  }

  const updatePage = () => {
    
  }

  const removePage = () => {

  }

  const changePage = (page = '/') => {
    router.push('/', { ...router.query, page })
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
    page,
    dir,
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
    changeVariant,
    updateTheme
  }), [
    page,
    dir,
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
    updateTheme
  ])

  return (
    <IntlProvider messages={messages} locale={locale}>
      <XircusProvider initApp={app} desiredChain={chain} autoAuth={true} autoConnect={true}>
        <ChakraProvider theme={themer}>
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
