import { Box, Button } from "@chakra-ui/react"
import { useSkin } from "../hooks/provider"

export const LinkButton = ({ to = '/', ...rest }) => {
  const skin = useSkin()
  const handleClick = () => {
    skin.router.push(to)
  }
  return <Button onClick={handleClick} {...rest} />
}