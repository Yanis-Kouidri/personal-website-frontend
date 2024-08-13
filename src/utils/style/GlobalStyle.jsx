import { createGlobalStyle } from "styled-components"

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Poppins', 'Trebuchet MS', Helvetica, sans-serif;
    }

    a {
      text-decoration: none;
    }

    body {
        background-color: #eeeeee;
        margin: 0;
    }
`
function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
