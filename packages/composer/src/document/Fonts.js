
export const Fonts = ({ fonts }) => fonts.map(font => <link key={font.name} href={font.url} rel="stylesheet" />)