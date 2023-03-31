import { createContext, useContext, useMemo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { XircusProvider } from '@xircus-web3/react'
import { IntlProvider, useTranslations } from 'use-intl'
import dynamic from 'next/dynamic'

export const SkinContext = createContext()

export const SkinProvider = ({ children, app, pageProps, skin, data, router, chakra, provider, i18n, ...rest }) => {
  const Component = dynamic(() => import(`../../skins/${skin}/pages${router.route}`))
  const messages = require(`../../skins/${skin}/i18n/${router.locale}.json`)
  const theme = require(`../../skins/${skin}/theme`).default

  const ctx = useMemo(() => ({
    app,
    router,
    skin
  }), [
    app,
    router,
    skin
  ])

  return (
    <IntlProvider messages={messages} locale={router.locale || 'en'} {...i18n}>
      <XircusProvider initApp={app} initData={data} autoAuth={true} autoConnect={true} {...provider}>
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

export const usei18n = () => {
  const { router } = useSkin()
  const t = useTranslations(router.route)
  return t
}