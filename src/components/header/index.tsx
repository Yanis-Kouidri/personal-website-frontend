import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../../context/contexts'
import { useUIContent } from '../../context/UIContentProvider'
import { handleApiRequest } from '../../hooks/apiRequest'
import { StyledParagraph } from '../../utils/style/CommonStyles'
import colors from '../../utils/style/colors'

const StyledLink = styled(Link)`
  padding: 15px;
  color: ${colors.primary};
  font-size: 20px;
  text-decoration: none;
  position: relative;

  &::after {
    content: '';
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
  const { headerData, loading, error } = useUIContent()
  //console.log(headerData)
  const { user, setUser } = useUser()
  const handleLogout = () => {
    handleApiRequest({
      apiEndPoint: '/api/auth/logout',
      method: 'POST',
      credentials: true,
      onError: (errorMessage) => {
        console.error('Logout error:', errorMessage)
      },
      onSuccess: (successMessage) => {
        console.log('Logout success:', successMessage)
        setUser(null) // Logout the user
      },
    })
  }

  if (loading) {
    return <StyledParagraph>Loading...</StyledParagraph>
  }

  if (error) {
    return <StyledParagraph>Error: {error}</StyledParagraph>
  }

  const home = headerData?.home || ''
  const project = headerData?.projects || ''
  const documentations = headerData?.documentations || ''
  const about = headerData?.about || ''
  const login = headerData?.login || ''
  const signup = headerData?.signup || ''

  return (
    <StyledNav>
      <CenterLinks>
        <StyledLink to="/">{home}</StyledLink>
        <StyledLink to="/projects">{project}</StyledLink>
        <StyledLink to="/docs">{documentations}</StyledLink>
        <StyledLink to="/about">{about}</StyledLink>
      </CenterLinks>
      <RightButtons>
        {user ? (
          <>
            <p>Bonjour {user}</p>
            <button type="button" onClick={handleLogout}>
              {' '}
              Deconnexion{' '}
            </button>
          </>
        ) : (
          <>
            <Button to="/login">{login}</Button>
            <Button to="/sign-up">{signup}</Button>
          </>
        )}
      </RightButtons>
    </StyledNav>
  )
}

export default Header
