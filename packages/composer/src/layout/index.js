import { useMemo } from 'react'
import { Box } from "@chakra-ui/react"
import { useBlock } from "../hooks/provider"
import { AppLayout } from "./AppLayout"
import { StackLayout } from './StackLayout'
import LayoutEditor from '../editor/LayoutEditor'
import { AppTabLayout } from './AppTabLayout'
import { SlideLayout } from './SlideLayout'

export const LayoutManager = ({ children, renderHead }) => {
  const { layout } = useBlock()

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'AppLayout': return <AppLayout />
      case 'AppTabLayout': return <AppTabLayout />
      case 'StackLayout': return <StackLayout />
      case 'SlideLayout': return <SlideLayout />
    }
  }, [layout.variant])

  const renderChildren = useMemo(() => {
    if (typeof children == 'function') {
      return children({ test: '' })
    }
    if (typeof children == 'object') {
      return children
    }
  }, [children])

  return (
    <>
      {renderChildren}
      {renderLayout}
      <LayoutEditor />
    </>
  )
}

// {renderHead && renderHead({ fonts, metas, app })}
// {
//   fonts.map(font => <link key={font.name} href={font.url} rel="stylesheet" />)
// }

// const renderHead = useMemo(() => {
//   return (
//     <Head>
//       <title>{app?.name}</title>
//       <link rel="preconnect" href="https://fonts.googleapis.com" />
//       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      // {
      //   metas.map(meta => <meta key={meta.name} property={meta.name} content={meta.content} />)
      // }
//     </Head>
//   )
// }, [fonts, metas, app])