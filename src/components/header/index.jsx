import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const StyledLink = styled(Link)`
  padding: 15px;
  color: ${colors.primary};
  font-size: 20px;
  text-decoration: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${colors.secondary};
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &:hover::after {
    visibility: visible;
    width: 100%;
  }
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
