import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/contexts'
import { handleApiRequest } from '../../hooks/useApiRequest'
import {
  BasicH2Title,
  BasicWrapper,
  Loader,
  StyledErrorMessage,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'

type SuccessLoginData = {
  message: string
  user: {
    username: string
  }
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [isFetching, setIsFetching] = useState(false)

  const { setUser } = useUser()

  const navigate = useNavigate()
  const validate = () => {
    if (!username.trim()) {
      setErrorMessage("Le nom d'utilisateur est requis.")
      return false
    }
    if (!password) {
      setErrorMessage('Le mot de passe est requis.')
      return false
    }
    return true
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!validate()) {
      return
    }
    setIsFetching(true)

    const requestBody = {
      username: username,
      password: password,
    }

    handleApiRequest({
      apiEndPoint: '/api/auth/login',
      method: 'POST',
      credentials: true,
      setIsFetching,
      onSuccess: (data: SuccessLoginData) => {
        setErrorMessage('')
        setSuccessMessage(data.message)
        setUser(data.user.username)
        void (async () => {
          await navigate('/')
        })()
      },
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
      },
      data: requestBody,
    })
  }

  return (
    <BasicWrapper>
      <BasicH2Title>Connexion</BasicH2Title>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledSubmitButton type="submit" disabled={isFetching}>
          {isFetching ? 'Chargement...' : 'Se connecter'}
        </StyledSubmitButton>
      </StyledForm>
      {isFetching && <Loader />}
    </BasicWrapper>
  )
}

export default Login
