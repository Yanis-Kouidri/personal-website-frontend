import { createGlobalStyle } from "styled-components"
import colors from "./colors"

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Poppins', 'Trebuchet MS', Helvetica, sans-serif;
    }

    a {
      text-decoration: none;
    }

    body {
        background-color: ${colors.backgroundColor};
        margin: 0;
    }
`
function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
