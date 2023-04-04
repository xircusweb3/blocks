import { Marquee, MarqueeDefault } from './content/Marquee'
import { CallToAction, CallToActionDefaults } from './main/CallToAction'
import { Hero, HeroDefault } from './content/Hero'
import { AppHeader, AppHeaderDefaults } from './header/AppHeader'
import { Markdown, MarkdownDefault } from './content/Markdown'
import { Sidebar, SidebarDefault } from './left/Sidebar'
import { ItemFeature, ItemFeatureDefault } from './nft/ItemFeature'
import { NFTMinter, NFTMinterDefaults } from './nft/NFTMinter'
import { TokenBalance, TokenBalanceDefaults } from './token/TokenBalance'
import { MarketListing, MarketListingDefaults } from './market/MarketListing'
import { ExchangeSwap, ExchangeSwapDefaults } from './defi/ExchangeSwap'
import { MarketSellersGrid, MarketSellersGridDefaults } from './market/MarketSellersGrid'
import { MarketCollectionsGrid, MarketCollectionsGridDefaults } from './market/MarketCollectionGrid'
import { AppFooter, AppFooterDefaults } from './footer/AppFooter'

export const mainBlocks = {
  Hero: props => <Hero {...props} />,
  Markdown: props => <Markdown {...props} />,  
  Marquee: props => <Marquee {...props} />,
  CallToAction: props => <CallToAction {...props} />,
  ItemFeature: props => <ItemFeature {...props} />,  
  NFTMinter: props => <NFTMinter {...props} />,  
  TokenBalance: props => <TokenBalance {...props} />, 
  MarketListing: props => <MarketListing {...props} />, 
  MarketSellersGrid: props => <MarketSellersGrid {...props} />, 
  MarketCollectionsGrid: props => <MarketCollectionsGrid {...props} />,   
  ExchangeSwap: props => <ExchangeSwap {...props} />, 
}

export const sideBlocks = {
  Sidebar: props => <Sidebar {...props} />,
}

export const headerBlocks = {
  AppHeader: props => <AppHeader {...props} />,
  Marquee: props => <Marquee {...props} />,  
}

export const footerBlocks = {
  AppFooter: props => <AppFooter {...props} />,  
}

export const blockDefaults = {
  Marquee: MarqueeDefault,
  CallToAction: CallToActionDefaults,
  Hero: HeroDefault,
  AppHeader: AppHeaderDefaults,
  AppFooter: AppFooterDefaults,
  Markdown: MarkdownDefault,
  Sidebar: SidebarDefault,
  ItemFeature: ItemFeatureDefault,
  NFTMinter: NFTMinterDefaults,
  TokenBalance: TokenBalanceDefaults,
  MarketListing: MarketListingDefaults,
  MarketCollectionsGrid: MarketCollectionsGridDefaults,
  MarketSellersGrid: MarketSellersGridDefaults,
  ExchangeSwap: ExchangeSwapDefaults
}