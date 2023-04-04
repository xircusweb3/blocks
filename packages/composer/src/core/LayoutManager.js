import { useMemo } from 'react'
import { useBlock } from "../hooks/provider";
import { StackLayout } from "../layout/StackLayout";
import { AppLayout } from "../layout/AppLayout";
import { AppTabLayout } from "../layout/AppTabLayout";
import { SlideLayout } from "../layout/SlideLayout";

export const LayoutManager = () => {
  const { layout, head: Head, fonts, page, metas, app } = useBlock()

  const renderHead = useMemo(() => {
    return (
      <Head>
        <title>{app.name}</title>
        {
          (Array.isArray(fonts) ? fonts : []).map(font => <link key={font.name} href={font.url} rel="stylesheet" />)
        }
        {
          (Array.isArray(metas) ? metas : []).map(meta => <meta key={meta.name} property={meta.name} content={meta.content} />)
        }
      </Head>      
    )
  }, [Head, fonts, metas, app])
  
  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'StackLayout': return <StackLayout /> // stack
      case 'AppLayout': return <AppLayout /> // dashboard
      case 'AppTabLayout': return <AppTabLayout /> // with tabs
      case 'SlideLayout': return <SlideLayout /> // full width
    }
  }, [layout.variant, page])
  
  return (
    <>
      {renderHead}
      {renderLayout}
    </>
  )
}