import Link from 'next/link'
import {
  Button, Menu, MenuList, MenuItem, MenuButton, IconButton, MenuDivider, Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5'

export const menuItemStyle = {
  borderRadius: 'md',
  bg: 'transparent'
}

export const ButtonMenu = ({ label, links = [], menus = [], children, menuProps, btnProps }) => {
  return (
    <Menu closeOnBlur preventOverflow placement="bottom-end" {...menuProps}>
      <MenuButton
        as={Button}
        _focus={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        borderColor={mode('gray.100', 'gray.900')}
        rightIcon={<IoChevronDown size={10} />}
        {...btnProps}>
        {label}
      </MenuButton>
      <MenuList
        zIndex={2000}
        p={2}
        borderColor={mode('gray.100', 'gray.900')}
        bg={mode('#fff', '#000')}
        shadow="none">
        {children}
        {
          menus.map((menu, mId) => 
            menu.divider
            ? <MenuDivider key={`menu-divider-${mId}`} />
            : <MenuItem key={`menu-${mId}`} borderRadius="md" bg="transparent" _hover={{ bg: mode('gray.100', 'gray.900') }} {...menu}>
                {menu.right && <Text float="right" mt={1} fontFamily="mono" fontSize="10px" color="gray.500">{menu.right}</Text>}
                {menu.label}
              </MenuItem>
          )
        }
      </MenuList>
    </Menu>    
  )
}


export const IconMenu = ({ children, icon, menuProps, btnProps }) => (
  <Menu closeOnBlur defaultIsOpen preventOverflow isLazy {...menuProps}>
    <MenuButton icon={icon} as={IconButton} {...btnProps} />
    <MenuList
      p={2}
      borderColor={mode('gray.100', 'gray.900')}
      bg={mode('#fff', '#090909')}
      shadow="none">
      {children}
    </MenuList>
  </Menu>
)
