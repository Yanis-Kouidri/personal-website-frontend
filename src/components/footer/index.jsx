import React from "react"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const FooterWrapper = styled.footer`
  background-color: ${colors.secondary};
  margin: 0;
  padding: 0;
  height: 200px;
`

const StyledParagraph = styled.p`
  color: white;
  text-align: center;
  padding: 20px;
`

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerDescription =
    "Ce site a été entièrement réalisé par Yanis Kouidri en utilisant React et Styled Components."
  const acknowledgments =
    "Merci de m'avoir lu jusqu'ici, j'espère que le site vous plait !"

  return (
    <FooterWrapper>
      <StyledParagraph>&copy; {currentYear} Yanis Kouidri</StyledParagraph>
      <StyledParagraph>
        {footerDescription}
        <br />
        {acknowledgments}
      </StyledParagraph>
    </FooterWrapper>
  )
}

export default Footer
