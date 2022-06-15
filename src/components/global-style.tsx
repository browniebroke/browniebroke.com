import { createGlobalStyle } from 'styled-components'
import { SiteThemeProps } from '../utils/theme'
// @ts-ignore
import * as sanitizeCss from 'sanitize.css'

export const GlobalStyle = createGlobalStyle<SiteThemeProps>`
  ${sanitizeCss}
  :root {}
  html {
    --white: ${(props) => props.theme.white};
    --black: ${(props) => props.theme.black};
    --blue: ${(props) => props.theme.blue};
    
    font: 125%/1.4em Cabin Condensed, georgia, sans-serif;
    letter-spacing: .03em;
    overflow-y: scroll;
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: Patua One;
      color: var(--black);
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      text-rendering: optimizeLegibility;
      line-height: 1.1;
    }
  }
  main {
    flex: 1 0 auto;
  }
  p {
    margin: 0 0 1.4rem 0;
  }
  a {
    color: inherit;
  }
  a:active,
  a:hover {
    color: var(--blue);
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.51572rem;
  }
  h3 {
    font-size: 1.31951rem;
  }
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: 0.85028rem;
  }
  h6 {
    font-size: 0.78405rem;
  }
`
