import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createContext, useMemo, useState, useContext, useEffect } from 'react'
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
  const [chain, setChain] = useState(1)
  const [locale, setLocale] = useState(router?.query?.locale || router.locale)
  const [locales, setLocales] = useState(app?.locales || {})
  const [layout, setLayout] = useState(app?.layout || {})
  const [fonts, setFonts] = useState(app?.fonts || [])
  const [metas, setMetas] = useState(app?.metas || [])
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [page, setPage] = useState(router?.query?.page || router.route)
  const [pages, setPages] = useState(app?.pages || {})
  const [edit, setEdit] = useState(false)
  const themer = extendTheme(theme)
  const blocks = useMemo(() => pages[page], [page])
  const messages = locales[locale] || {}
  const dir = locale == 'ar' ? 'rtl' : 'ltr'

  console.log("ROUTER", router)

  const [components, setComponents] = useState({})
  const [defaults, setDefaults] = useState({})
  const [semantics, setSemantics] = useState({})

  const addFont = (name, url) => setFonts({ ...fonts, [name]: url })
  const removeFont = (name) => setFonts(fonts.filter(f => f.name != name))
  const updateTheme = (newTheme) => setTheme({ ...theme, ...newTheme })
  const toggleEdit = () => setEdit(!edit)
  const setBlocks = (group, blocks) => setLayout({ ...layout, [group]: blocks })
  const setPageBlocks = (blocks) => setPages({ ...pages, [page]: blocks })
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
    blocks,
    edit,
    setBlocks,
    setPageBlocks,    
    toggleEdit,
    changeVariant,
    updateTheme,
    setPage,
    fonts,
    addFont,
    removeFont,
    metas,
  }), [
    page,
    dir,
    app,
    blocks,
    layout, 
    setBlocks,
    setPageBlocks,
    toggleEdit,
    changeVariant,
    updateTheme,
    setPage,
    fonts,
    addFont,
    removeFont,
    metas,
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

// Manages the block
export const useBlockManager = () => {

}

// Block Renderer Hook
export const useBlocks = ({ group = 'main', blocks = [], components = [] }) => {
  const [items, setItems] = useState(blocks || [])

  const onSave = (blockIndex, item) => {
    let newItems = items
    newItems[blockIndex] = item
    setItems(newItems)
  }

  return {
    items,
    setItems,
    onSave
  }
}

// Block Item Hook for Theme and Data
export const useBlockItem = ({ block = {}, blockIndex = 0, onChange }) => {
  const [theme, setTheme] = useState(block?.theme)
  const [data, setData] = useState(block?.data)

  const onClose = () => {
    onChange && onChange(blockIndex, { ...block, theme, data })
  }

  const updateTheme = (name, values) => {
    setTheme({ ...theme, [name]: values })
  }

  const handleData = (name, value) => {
    setData({ ...data, [name]: value })
  }

  const handleInput = ({ target: { name, value } }) => {
    if (name) {
      setData({ ...data, [name]: value })
    }
  }

  return {
    theme,
    data,
    setTheme,
    setData,
    handleData,
    handleInput,
    getEditorActions: {
      block,
      theme,
      setTheme,
      updateTheme,
      onClose
    }
  }
}