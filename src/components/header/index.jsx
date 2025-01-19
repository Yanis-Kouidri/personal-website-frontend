import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { useUser } from "../../context/UserProvider"
import axios from "axios"
import config from "../../utils/config"

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
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 50px;
`

const CenterLinks = styled.div`
  display: flex;
  gap: 10px;
  position: absolute; /* Positionnement absolu pour centrer */
  left: 50%; /* Aligne horizontalement */
  transform: translateX(-50%); /* Corrige l'alignement central */
`

const RightButtons = styled.div`
  display: flex;
  gap: 10px;
  position: absolute; /* Positionnement absolu pour centrer */
  right: 2%; /* Aligne horizontalement */
`

const Button = styled(Link)`
  padding: 6px 16px;
  color: white;
  font-size: 16px;
  text-decoration: none;
  border-radius: 8px;
  background-color: ${colors.secondary};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.primary};
  }
`

function Header() {
  const backendUrl = config.backendUrl
  const { user, setUser } = useUser()
  const handleClick = () => {
    axios
      .get(backendUrl + "/api/auth/logout", { withCredentials: true })
      .then((response) => {
        console.log("Log-out: " + response.data.message)
        setUser("")
      })
      .catch((error) => {
        console.error("Log-out: " + error)
      })
  }

  return (
    <StyledNav>
      <CenterLinks>
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/projects">Projets</StyledLink>
        <StyledLink to="/docs">Documentations</StyledLink>
        <StyledLink to="/about">À propos</StyledLink>
      </CenterLinks>
      <RightButtons>
        {user ? (
          <>
            <p>Bonjour {user}</p>
            <button onClick={handleClick}> Deconnexion </button>
          </>
        ) : (
          <>
            <Button to="/login">Login</Button>
            <Button to="/sign-up">Sign-Up</Button>
          </>
        )}
      </RightButtons>
    </StyledNav>
  )
}

export default Header
