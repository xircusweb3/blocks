import { useBlock } from "../hooks/provider";

export const HeadManager = ({ Head }) => {
  const { app, fonts, metas } = useBlock()
  if (Head) {
    return (
      <Head>
        <title>{app.name}</title>
        {
          fonts.map(font => <link key={font.name} href={font.url} rel="stylesheet" />)
        }
        {
          metas.map(meta => <meta key={meta.name} property={meta.name} content={meta.content} />)
        }        
      </Head>
    )  
  }
}