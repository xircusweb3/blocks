import { useMemo } from 'react'
import { 
  Box, 
  Container, 
  Grid, 
  Heading, 
  Select, 
  VStack,
  Button,
  useColorModeValue as mode,
  HStack,
  FormLabel,
  Spacer,
  Text
} from "@chakra-ui/react";
import { useBlock, useBlockItem } from "../../hooks/provider"
import { OutlineCard } from '../../components/CustomCard'
import ThemeEditor from '../../editor/ThemeEditor'

export const AppFooterDefaults = {
  name: 'AppFooter',
  group: 'footer',
  theme: {
    wrap: {},
    container: { maxW: '1440px' }
  },
  data: {}
}

export const FooterLinks = ({ title, links = [] }) => (
  <Box mb={10}>
    <Heading size="sm" mb={4}>{title}</Heading>
    <VStack alignItems="flex-start">
    {
      links.map((link, linkKey) => <Button key={linkKey} variant="link" size="sm" fontWeight="normal" {...link}>{link.label}</Button>)
    }
    </VStack>
  </Box>
)

const socials = [
  { key: 'tg', label: 'Telegram', as: 'a', href: 'https://t.me/xircusnft', target: '_blank' },
  { key: 'tw', label: 'Twitter', as: 'a', href: 'https://twitter.com/xircusnft', target: '_blank' },
  { key: 'fb', label: 'Facebook', as: 'a', href: 'https://facebook.com/xircusnft', target: '_blank' },
  { key: 'ig', label: 'Instagram', as: 'a', href: 'https://instagram.com/xircusnft', target: '_blank' },
  { key: 'dc', label: 'Discord', as: 'a', href: 'https://discord.com/xircusnft', target: '_blank' },
]

export const AppFooter = props => {
  const { app } = useBlock()
  const { data, theme, getEditorActions, handleInput } = useBlockItem(props)

  const renderContent = useMemo(() => {
    return (
      <Box {...theme?.wrap}>
        <Container {...theme?.container}>
          <Grid templateColumns={{ base: 'auto', md: 'repeat(5, 1fr)' }} >
            <Box>
              <HStack mb={8}>
                <Heading size="sm">{app.name}</Heading>
              </HStack>
              <FormLabel color="gray.500" fontSize="sm">Change Language</FormLabel>
              <Select variant="solid" rounded="full" size="sm" w={{ base: 'full', md: `80%` }} mb={10}>
                <option>English</option>
              </Select>
            </Box>
            <Box>
              <FooterLinks
                title="Marketplace"
                links={[
                  { key: 'explore', label: 'Explore', onClick: () => Router.push('/') },
                  { key: 'get-started', label: 'Get Started', onClick: () => Router.push('/get-started') },
                  { key: 'about', label: 'About', onClick: () => Router.push('/about') },
                  // { key: 'token', label: 'Buy Token', as: 'a', href: current ? `https://app.sushi.com/swap?outputCurrency=${current.tokens[0]}` : '#', target: '_blank' },
                  // { key: 'contact', label: 'Contact', onClick: () => Router.push('/contact') }
                ]}
                />
            </Box>
            <Box>
              <FooterLinks
                title="Community"
                links={[
                  // { key: 'charts', label: 'View Charts', as: 'a', href: current ? `https://www.dextools.io/app/bsc/pair-explorer/${current.pairs[0]}` : '#', target: '_blank' },
                  // { key: 'launchpad', label: 'Creator Launchpad', onClick: () => Router.push('/launchpad') },
                  // { key: 'challenges', label: 'Challenges', onClick: () => Router.push('/challenges') },
                  // { key: 'leaderboard', label: 'Leaderboard', onClick: () => Router.push('/leaderboard') },
                  { key: 'earn', label: 'Refer To Earn', onClick: () => Router.push('/earn') },
                ]}
                />            
            </Box>
            <Box>
              <FooterLinks
                title="Socials"
                links={socials}
                />            
            </Box>
            <Box>
              <FooterLinks
                title="About"
                links={[
                  { key: 'blog', label: 'Blog', onClick: () => Router.push('/') },
                  { key: 'resources', label: 'Resources', onClick: () => Router.push('/get-started') },
                  { key: 'terms', label: 'Terms and Conditions', onClick: () => Router.push('/about') },
                  { key: 'privacy', label: 'Privacy', as: 'a', href: '#', target: '_blank' },
                  { key: 'contact', label: 'Contact', onClick: () => Router.push('/contact') }
                ]}
                />
            </Box>          
          </Grid>
          <HStack>
            <Text fontSize="xs" fontWeight="500" color={mode('gray.400', 'gray.600')}>
              Powered by <Button variant="link" size="xs" as="a" href="https://xircus.app" target="_blank" color="gray.500">Xircus</Button>
            </Text>
            <Spacer />
            <Text fontSize="xs">All Rights Reserved 2022</Text>
          </HStack>        
        </Container>
      </Box>
    )
  }, [data, theme])

  return (
    <>
      <ThemeEditor {...getEditorActions}>
        <OutlineCard title="Content">

        </OutlineCard>
      </ThemeEditor>
      {renderContent}
    </>
  )
}