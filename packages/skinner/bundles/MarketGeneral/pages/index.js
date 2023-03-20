import { Box, Button, Heading } from '@chakra-ui/react'
import { useTranslations } from 'use-intl'
import { Head } from '../../../src/component/Head'
import { LinkButton } from '../../../src/component/Link'
import PublicLayout from '../layout/PublicLayout'

export default function Index({ app }) {
  const t = useTranslations('/')

  return (
    <PublicLayout>
      <Head>
        <title>Hello</title>
      </Head>
      <Heading fontFamily="Space Grotesk">{t('welcome')} {app.name}</Heading>
      <LinkButton to="/explore">Explore</LinkButton>
    </PublicLayout>
  )
}