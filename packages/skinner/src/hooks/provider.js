import { createContext, useContext, useMemo, lazy } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { XircusProvider } from '@xircus-web3/react'
import { IntlProvider } from 'use-intl'

export const SkinContext = createContext()

export const SkinProvider = ({ children, loader, app, pageProps, skin, router, chakra, provider, i18n, head, ...rest }) => {

  const Component = loader(() => import(`../../bundles/${skin}/pages${router.route}`))
  const messages = require(`../../bundles/${skin}/i18n/${router.locale}.json`)
  const theme = require(`../../bundles/${skin}/theme`).default

  // console.log("ROUTER", router, app, theme)
  // console.log("MESSAGES", messages)

  const ctx = useMemo(() => ({
    app,
    router,
    head
  }), [
    app,
    router,
    head
  ])

  return (
    <IntlProvider messages={messages} locale={router.locale || 'en'} {...i18n}>
      <XircusProvider initApp={app} autoAuth={true} autoConnect={true} {...provider}>
        <ChakraProvider theme={theme} {...chakra}>
          <SkinContext.Provider value={ctx} {...rest}>
            <Component app={app} {...pageProps} />
          </SkinContext.Provider>
        </ChakraProvider>
      </XircusProvider>
    </IntlProvider>    
  )
}

export const useSkin = () => {
  const ctx = useContext(SkinContext)
  return ctx
}

export const useSkinApp = () => {
  const ctx = useContext(SkinContext)
  return ctx.app  
}