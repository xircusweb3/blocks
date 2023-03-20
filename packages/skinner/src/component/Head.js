import { useSkin, useSkinApp } from "../hooks/provider"

export const Head = ({ children }) => {
  const { head: Head, app } = useSkin()

  return (
    <Head>
      {children}
    </Head>
  )
}

export const Fonts = () => {
  const { fonts, metas } = useSkinApp()

  return (
    <Head>
      {
        fonts.map(font => <link key={font.name} href={font.url} rel="stylesheet" />)
      }
      {
        metas.map(meta => <meta key={meta.name} property={meta.name} content={meta.content} />)
      }
    </Head>
  )  
}