import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { SkinProvider } from '@xircus-web3/skinner'
import { BlockProvider, LayoutManager } from '@xircus-web3/composer'
import { APP_STATE } from '../constants'

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

function AppDesigner({ Component, pageProps, router }) {
  const [app, setApp] = useState(APP_STATE)
  const scaffold = router.query.scaffold || false
  const skin = router.query.skin || 'MarketGeneral'
  
  switch(scaffold) {
    case 'block':
      return (
        <BlockProvider
          app={app}
          head={Head}
          router={router}>
          <LayoutManager />
        </BlockProvider>
      )
    case 'skin': 
      return (
        <SkinProvider 
          pageProps={pageProps}
          skin={skin}
          loader={dynamic}
          router={router}
          app={app}
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
