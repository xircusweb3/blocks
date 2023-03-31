export const APP_STATE = {
  name: 'Shiba',
  url: 'shiba',
  scaffold: 'block',
  theme: {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false      
    },
  },
  pages: {
    '/': [
      { key: 'mid1', name: 'Marquee', theme: { wrap: { w: 'full' } }, data: { text: 'Xircus made this marquee text customizable so you can always broadcase your message to your users' } },
      { key: 'mid2', name: 'Marquee', theme: { wrap: { w: 'full' } }, data: { text: 'Second Block' } },      
    ],
    '/test': [
      { key: 'midx', name: 'Marquee', theme: { wrap: { w: 'full' } }, data: { text: 'Test Block' } },
    ],
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
    main: [],
    isGuarded: false,
  },
  locales: {
    en: { '/': { welcome: 'Welcome' } },
    zh: { '/': { welcome: '欢迎' } },
    ar: { '/': { welcome: 'مرحباً' } }
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