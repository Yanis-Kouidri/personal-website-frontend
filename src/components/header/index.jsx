import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
  padding: 15px;
  color: blue;
  font-size: 20px;
`

const StyledNav = styled.nav`
  padding: 15px;
  display: flex;
  justify-content: center;
`

function Header() {
  return (
    <StyledNav>
      <StyledLink to="/">Accueil</StyledLink>
      <StyledLink to="/projects">Projets</StyledLink>
      <StyledLink to="/docs">Documentations</StyledLink>
      <StyledLink to="/about">À propos</StyledLink>
    </StyledNav>
  )
}

export default Header
