import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import colors from '../../utils/style/colors'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const ErrorContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: ${colors.backgroundColor};
  text-align: center;
  padding: 40px 20px;
  box-sizing: border-box;
  animation: ${fadeIn} 0.5s ease-out;
`

const ErrorCode = styled.h1`
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.third});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`

const Title = styled.h2`
  color: ${colors.fourth};
  font-size: 1.5rem;
  margin: 1rem 0;
`

const Description = styled.p`
  color: #555;
  max-width: 400px;
  line-height: 1.5;
  margin-bottom: 2rem;
`

const StyledLink = styled(Link)`
  background-color: ${colors.primary};
  color: white;
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(15, 30, 245, 0.2);

  &:hover {
    background-color: ${colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(15, 30, 245, 0.3);
  }
`

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
