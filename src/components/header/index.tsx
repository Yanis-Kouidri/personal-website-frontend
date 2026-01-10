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

  const { user, setUser } = useUser()

  const handleLogout = () => {
    handleApiRequest({
      apiEndPoint: '/api/auth/logout',
      method: 'POST',
      credentials: true,
      onSuccess: () => {
        setUser(null)
      },
      onError: (errorMessage) => {
        console.error('Logout error:', errorMessage)
      },
    })
  }

  if (loading) {
    return <StyledParagraph>Loading...</StyledParagraph>
  }

  if (error) {
    return <StyledParagraph>Error: {error}</StyledParagraph>
  }

  // Grace au hook useUIContent, TypeScript sait que headerData n'est plus "undefined"
  return (
    <StyledNav>
      <CenterLinks>
        <StyledLink to="/">{headerData?.home || ''}</StyledLink>
        <StyledLink to="/projects">{headerData?.projects || ''}</StyledLink>
        <StyledLink to="/docs">{headerData?.documentations || ''}</StyledLink>
        <StyledLink to="/about">{headerData?.about || ''}</StyledLink>
      </CenterLinks>
      <RightButtons>
        {user ? (
          <>
            <p>Bonjour {user}</p>
            <button type="button" onClick={handleLogout}>
              Deconnexion
            </button>
          </>
        ) : (
          <>
            <Button to="/login">{headerData?.login || ''}</Button>
            <Button to="/sign-up">{headerData?.signup || ''}</Button>
          </>
        )}
      </RightButtons>
    </StyledNav>
  )
}

export default Header
