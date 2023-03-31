import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { TbChevronDown } from 'react-icons/tb'

export const Dropdown = ({ action, children, items = [], btnProps }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<TbChevronDown />} {...btnProps}>
        {action}
      </MenuButton>
      <MenuList>
        {children}
        {
          (items || []).map(item => <MenuItem key={item.key} {...item}>{item.content}</MenuItem>)
        }
      </MenuList>
    </Menu>
  )
}