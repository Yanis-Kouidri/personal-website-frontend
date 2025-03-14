import { useNavigate } from 'react-router-dom'
import config from '../../utils/config'
import {
  BasicH2Title,
  BasicWrapper,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
  StyledSuccessMessage,
  StyledErrorMessage,
  Loader,
} from '../../utils/style/CommonStyles'
import { useState } from 'react'
import { useUser } from '../../context/UserProvider'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const { setUser } = useUser()

  const backendUrl = config.backendUrl

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)

    const requestBody = {
      username: username,
      password: password,
    }

    axios
      .post(backendUrl + '/api/auth/login', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setSuccessMessage(response.data.message)
        setUser(response.data.username)
        navigate('/')
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setErrorMessage(error.response.data.message)
              break
            case 429:
              setErrorMessage('Too many failures, plese wait a while')
              break
            case 500:
              setErrorMessage('Internal server error')
              break
            default:
              setErrorMessage('Internal server error')
              console.error(
                'Unexpected response from backend, status code :' +
                  error.response.status,
              )
          }
        } else {
          setErrorMessage('Internal error')
          console.error('Login error: ' + error)
        }
      })
      .finally(() => {
        setLoading(false)
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
        <StyledSubmitButton type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Se connecter'}
        </StyledSubmitButton>
      </StyledForm>
      {loading && <Loader />}
    </BasicWrapper>
  )
}

export default Login
