import { Box, Button, Avatar, Grid, Heading, Text, useColorModeValue as mode, useToast } from '@chakra-ui/react'
import { useWalletProviderAuth } from '@xircus-web3/react'
import { useEffect, useMemo, useState } from 'react'
import { TbBrandTwitter } from 'react-icons/tb'
import { AppSpacer } from '../../components/AppContainer'
import { FormInput, FormTextArea } from '../../components/Form'
import AppLayout from '../../layouts/AppLayout'
import { SettingLayout } from '../../layouts/SettingLayout'

// Listed and purchased items
const USER_STATE = {
  name: '',
  bio: '',
  username: '',
  email: '',
  website: '',
  twitter: ''
}

export default function MyAccount() {
  const auth = useWalletProviderAuth()
  const [user, setUser] = useState(USER_STATE)
  const [updating, setUpdating] = useState(false)
  const toast = useToast()
  
  useEffect(() => {
    if (auth.isAuthed) {
      console.log("AUTHED USEr", auth.user)
      const { name, username, bio, email, website, twitter } = auth.user
      setUser({ name, username, bio, email, website, twitter })
    }
  }, [auth.isAuthed])

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setUpdating(true)
    const status = await auth.updateProfile(user)
    if (status) {
      toast({
        title: 'Profile Updated Succesfully',
        isClosable: true,
        status: 'success'
      })
    }
    setUpdating(false)
  }

  return (
    <AppLayout>
      <AppSpacer />
      <SettingLayout title="Account">
        <Box pos="relative" mb={12}>
          <Box w="full" h="200px" bg="gray.500" rounded="lg">
          </Box>
          <Button pos="absolute" top={4} right={4}>Edit Cover</Button>
          <Avatar size="xl" pos="absolute" bottom={-8} left={6} />
        </Box>
        <Grid templateColumns={{ base: 'auto', md: 'auto 240px' }} gap={6}>
          <Box pb={100} as="form" method="POST" onSubmit={handleSubmit}>
            <FormInput 
              label="Display Name"
              name="name"
              variant="filled"
              value={user.name}
              onChange={handleChange}
              control={{ mb: 6, isRequired: true }}
              />
            <FormInput 
              label="Username" 
              name="username"
              value={user.username}              
              left="@"
              variant="filled"
              onChange={handleChange}              
              control={{ mb: 6, isRequired: true }}
              />
            <FormTextArea
              label="Short Bio"
              name="bio"
              value={user.bio}              
              variant="filled"
              onChange={handleChange}              
              control={{ mb: 6, isRequired: true }}              
              />
            <FormInput 
              label="Email" 
              name="email"
              placeholder="Enter your email"
              value={user.email}
              left="@" 
              variant="filled"
              onChange={handleChange}
              right={<Button size="xs">Confirm</Button>}
              control={{ mb: 12, isRequired: true }}
              />   
            <Heading size="md">Social Links</Heading>           
            <Text mb={6} fontSize="sm" color="gray.500">Add your existing social links to build a stronger reputation</Text>              
            <FormInput
              label="Website"
              name="website"
              value={user.website}
              left="https://"
              variant="filled"
              leftProps={{ w: 'auto', pl: 4 }}
              pl={20}
              onChange={handleChange}
              control={{ mb: 6, isRequired: true }}              
              />
            <FormInput
              label="Twitter"
              name="twitter"
              value={user.twitter}
              left={<TbBrandTwitter />}
              right={<Button size="xs">Link</Button>}
              variant="filled"
              onChange={handleChange}
              control={{ mb: 6, isRequired: true }}              
              />    
            <Button size="lg" type="submit" isLoading={updating}>Update</Button>                     
          </Box>
          <Box mb={100}>
            <Box borderWidth={1} borderColor={mode('gray.100', 'gray.900')} p={4} rounded="md">
              <Heading size="md" mb={4}>Verify your account</Heading>
              <Text mb={4} fontSize="sm" color="gray.500">Proceed with verification process to get more visibility and gain trust on Marketplace</Text>
              <Button variant="outline" w="full">Get Verified</Button>
            </Box>
          </Box>
        </Grid>
      </SettingLayout>
    </AppLayout>
  )
}