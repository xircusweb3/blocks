import { Heading } from '@chakra-ui/react'
import { useTranslations } from 'use-intl'
import { LinkButton } from '../../../src/component/Link'
import PublicLayout from '../layout/PublicLayout'

export default function Explore() {
  return (
    <PublicLayout>
      <Heading>Explore</Heading>
      <LinkButton to="/">Back To Index</LinkButton>
    </PublicLayout>
  )
}