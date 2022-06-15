export interface SiteTheme {
  white: string
  black: string
  blue: string
  spacings: string[]
  mdBreakpoint: string
  containerMaxWidth: string
}

export interface SiteThemeProps {
  theme: SiteTheme
}

const baseSpacer = 1
const spacers = [
  0,
  baseSpacer / 4,
  baseSpacer / 2,
  baseSpacer,
  baseSpacer * 1.5,
  baseSpacer * 3,
]

export const theme: SiteTheme = {
  white: '#fffaff',
  black: '#0c2340',
  blue: '#3498DB',
  spacings: spacers.map((s) => `${s}rem`),
  mdBreakpoint: '768px',
  containerMaxWidth: `900px`,
}
