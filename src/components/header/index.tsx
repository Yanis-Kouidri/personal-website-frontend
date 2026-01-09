import { useUser } from '../../context/contexts'
import { useUIContent } from '../../context/UIContentProvider'
import { handleApiRequest } from '../../hooks/apiRequest'
import { StyledParagraph } from '../../utils/style/CommonStyles'
import {
  Button,
  CenterLinks,
  RightButtons,
  StyledLink,
  StyledNav,
} from './index.style'

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
