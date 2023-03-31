import { useEffect, useState, useMemo } from 'react'
import Head from 'next/head'
import { SkinProvider } from '@xircus-web3/skinner'
import { BlockProvider, LayoutManager, LayoutEditor } from '@xircus-web3/composer'
import { APP_STATE } from '../constants'

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

function AppDesigner({ Component, pageProps, router }) {
  const [ready, setReady] = useState()
  const [data, setData] = useState(false)
  const app = useMemo(() => data?.app || APP_STATE, [data])  
  const scaffold = useMemo(() => data?.app?.scaffold || 'none', [data])
  const skin = useMemo(() => data?.app?.skin ? data?.app?.skin : 'MarketGeneral', [data])
  
  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && global?.window) {
      console.log("WINDOW LOADED")
      if (window.location.hostname) {
        loadApp()
      }
    }
  }, [ready])  

  const loadApp = async() => {
    const reply = await fetch(window.location.origin + '/api/')
    const res = await reply.json()

    if (res.app) {
      setData(res)
      setReady(true)
    }
  }

  switch(scaffold) {
    case 'block':
      return (
        <BlockProvider
          app={
            router.route == '/editor' 
            ? { ...app, pages: app.draftPages }
            : app
          }
          head={Head}
          router={router}>
          {
            router.route == '/editor'
            ? <LayoutEditor /> 
            : <LayoutManager />
          }
        </BlockProvider>
      )
    case 'skin': 
      return (
        <SkinProvider 
          pageProps={pageProps}
          skin={skin}
          router={router}
          app={app}
          data={data}
          head={Head}
          />
      )
    default: 
      return (
        <Component {...pageProps} />
      )
  }
}

export default AppDesigner
