import { BasicH2Title, BasicWrapper } from "../../utils/style/CommonStyles"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`

const StyledInput = styled.input`
  padding: 0.1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`
const StyledSubmitButton = styled.button`
  padding: 0.6rem;
  font-size: 1rem;
  color: white;
  background-color: ${colors.secondary};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary};
  }
`

function handleSubmit(e) {
  e.preventDefault()
}

function Login() {
  return (
    <BasicWrapper>
      <BasicH2Title>Connexion</BasicH2Title>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput name="username" type="text" placeholder="Username" />
        <StyledInput name="password" type="password" placeholder="Password" />
        <StyledSubmitButton type="submit">Se connecter</StyledSubmitButton>
      </StyledForm>
    </BasicWrapper>
  )
}

export default Login
