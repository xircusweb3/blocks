import { Marquee, MarqueeDefault } from './content/Marquee'
import { CallToAction, CallToActionDefaults } from './main/CallToAction'
import { Hero, HeroDefault } from './content/Hero'
import { AppHeader, AppHeaderDefaults } from './header/AppHeader'
import { Markdown, MarkdownDefault } from './content/Markdown'
import { Sidebar, SidebarDefault } from './left/Sidebar'

export const mainBlocks = {
  Hero: props => <Hero {...props} />,
  Markdown: props => <Markdown {...props} />,  
  Marquee: props => <Marquee {...props} />,
  CallToAction: props => <CallToAction {...props} />,
}

export const sideBlocks = {
  Sidebar: props => <Sidebar {...props} />,
}

export const headerBlocks = {
  AppHeader: props => <AppHeader {...props} />,
}

export const footerBlocks = {

}

export const blockDefaults = {
  Marquee: MarqueeDefault,
  CallToAction: CallToActionDefaults,
  Hero: HeroDefault,
  AppHeader: AppHeaderDefaults,
  Markdown: MarkdownDefault,
  Sidebar: SidebarDefault
}