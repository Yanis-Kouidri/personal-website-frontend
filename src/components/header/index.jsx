import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
  padding: 15px;
  color: blue;
`

function Header() {
  return (
    <nav>
      <StyledLink to="/">Accueil</StyledLink>
      <StyledLink to="/projects">Projets</StyledLink>
      <StyledLink to="/docs">Documentations</StyledLink>
      <StyledLink to="/about">À propos</StyledLink>
    </nav>
  )
}

export default Header
