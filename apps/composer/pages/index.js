import { Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { AppHeader, StackLayout, NFT_GENERAL } from 'xw3-blocks'

export default function Home() {
  const [data, setData] = useState(NFT_GENERAL)
  const [edit, setEdit] = useState(false)

  const handleEdit = () => setEdit(!edit)

  const handleSave = (data) => {
    console.log("SAVE DATA")
  }

  return (
    <Box>
      <Button onClick={handleEdit}>{edit ? 'Save' : 'Edit'}</Button>
      <StackLayout edit={edit} data={data} onSave={handleSave}>

      </StackLayout>
    </Box>
  )
}
