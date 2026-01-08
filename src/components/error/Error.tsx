import {
  Description,
  ErrorCode,
  ErrorContainer,
  StyledLink,
  Title,
} from './Error.style'

const ErrorPage: React.FC = () => {
  return (
    <ErrorContainer>
      <ErrorCode>404</ErrorCode>
      <Title>Page introuvable</Title>
      <Description>
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </Description>
      <StyledLink to="/">Retour à l'accueil</StyledLink>
    </ErrorContainer>
  )
}

export default ErrorPage
