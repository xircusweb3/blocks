import { createContext, useMemo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { XircusProvider } from '@xircus-web3/react'
import { IntlProvider } from 'use-intl'
import dynamic from 'next/dynamic'

export const BUNDLE_SRC = '../../bundles/'
export const SkinContext = createContext()
export const SkinProvider = ({ pageProps, skin, router, src = BUNDLE_SRC }) => {

  console.log("SRC", `${src}${skin}/pages${router.route}`)

  const Component = dynamic(() => import(`../../bundles/${skin}/pages${router.route}`))
  const messages = dynamic(() => import(`../../bundles/${skin}/i18n/${router.locale}.json`))
  const theme = dynamic(() => import(`../../bundles/${skin}/theme/${router.locale}`))
  const app = {}
  const data = {}
  const chain = 1

  // Component = require(`../skins/${app?.skin || 'MarketGeneral'}/pages${router.route}`).default
  console.log("ROOT:", pageProps, router, skin)
  console.log("Component", Component)

  const ctx = useMemo(() => {

  }, [])

  return (
    <IntlProvider messages={messages} locale={router.locale || 'en'}>
      <XircusProvider initApp={app} initAppData={data} desiredChain={chain} autoAuth={true} autoConnect={true}>
        <ChakraProvider theme={theme}>
          <SkinContext.Provider value={ctx}>
            <Component {...pageProps} />
          </SkinContext.Provider>
        </ChakraProvider>
      </XircusProvider>
    </IntlProvider>    
  )
}