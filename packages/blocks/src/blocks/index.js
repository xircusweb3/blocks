import { Marquee, MarqueeDefault } from './content/Marquee'

export const mainComponents = {
  Marquee: props => <Marquee {...props} />
}

export const mainDefaults = {
  Marquee: MarqueeDefault,
}