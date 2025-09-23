import React, { useState } from 'react'
import {
  BasicH2Title,
  BasicWrapper,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import { handleApiRequest } from '../../hooks/useApiRequest'

type SignUpSuccessData = {
  message: string
}

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    signupKey: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [isFetching, setIsFetching] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.signupKey) {
      setErrorMessage('Tous les champs sont requis')
      return false
    }
    if (formData.password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères')
      return false
    }
    return true
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      setIsFetching(false)
      return
    }

    const requestBody = {
      username: formData.username,
      password: formData.password,
      signupKey: formData.signupKey,
    }

    handleApiRequest({
      apiEndPoint: '/api/auth/signup',
      method: 'POST',
      credentials: false,
      setIsFetching,
      onSuccess: (data: SignUpSuccessData) => {
        setErrorMessage('')
        setSuccessMessage(data.message)
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
      <BasicH2Title>Inscription</BasicH2Title>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          name="signupKey"
          type="password"
          placeholder="Sign-up key"
          value={formData.signupKey}
          onChange={(e) => handleChange(e)}
        />
        <StyledSubmitButton type="submit" disabled={isFetching}>
          {isFetching ? 'Chargement...' : "S'inscrire"}
        </StyledSubmitButton>
      </StyledForm>
    </BasicWrapper>
  )
}

export default Signup
