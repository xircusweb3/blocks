import { List, Button } from "@chakra-ui/react"
import Link from 'next/link'

export const AppLinksMobile = ({ children, routes = [], ...rest }) => (
  <List w="full" {...rest}>
    {
      routes.map((route) => 
        <Link key={route.path} href={route.path}>
          <Button
            variant="ghost"
            size="lg" 
            justifyContent="flex-start" 
            textAlign="left" 
            w="full">{route.label}</Button>
        </Link>
      )
    }
    {children}
  </List>
)