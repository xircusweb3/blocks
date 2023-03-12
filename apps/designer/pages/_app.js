import { Box } from '@chakra-ui/react'
import { SkinProvider } from '@xircus-web3/skinner'
import { BlockProvider, LayoutManager } from '@xircus-web3/blocks'
import { useState } from 'react'

const APP_STATE = {
  // mode: 'skin',
  name: 'Shiba',
  url: 'shiba',
  mode: 'block',
  theme: {

  },
  pages: {
    '/': [],
  },
  layout: {
    variant: 'AppLayout',
    theme: {
      wrap: {},
      header: {},
      main: {},
      footer: {},
      left: {},
      right: {}
    },
    header: [],
    footer: [],
    left: [],
    right: [],
    guard: [],
    isGuarded: false,
  },
  locales: {
    en: { '/': { welcome: 'Welcome' } },
    zh: { '/': { welcome: '欢迎' } },
    ar: { '/': { welcome: 'مرحباً' } }
  },
  layouts: {

  },
  fonts: [
    { name: 'Montserrat', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&display=swap' },
    { name: 'Roboto', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap' },   
    { name: 'Poppins', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;700&display=swap' },
    { name: 'Rubik', url: 'https://fonts.googleapis.com/css2?family=Rubik:wght@100;300;500;700&display=swap' },
    { name: 'Ubuntu', url: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;300;500;700&display=swap' },
    { name: 'Exo 2', url: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@100;300;500;700&display=swap' },
    { name: 'Space Grotesk', url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@100;300;500;700&display=swap' }    
  ],
  metas: [
    { name: 'title', content: '' },
    { name: 'description', content: '' },    
    { name: 'og:title', content: '' },
    { name: 'og:type', content: '' },
    { name: 'og:url', content: '' },
    { name: 'og:description', content: '' },
    { name: 'og:image', content: '' },    
  ],

}

function MyApp({ pageProps, router }) {
  const [app, setApp] = useState(APP_STATE)
  // Switch between block editor or skiner

  const handleLoadApp = () => {

  }

  switch(router.query.mode) {
    case 'block':
      return (
        <BlockProvider app={app} router={router}>
          <LayoutManager />
        </BlockProvider>
      )
    case 'skin': 
      return (
        <SkinProvider 
          skin="MarketGeneral"
          router={router}
          app={app}
          onLoadApp={handleLoadApp}
          pageProps={pageProps}
          />
      )

  }
}

export default MyApp
