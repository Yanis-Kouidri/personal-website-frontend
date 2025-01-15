import {
  BasicH2Title,
  BasicWrapper,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
  StyledSuccessMessage,
  StyledErrorMessage,
} from "../../utils/style/CommonStyles"
import { useState } from "react"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const backendUrl = process.env.REACT_APP_BACKEND_URL
  if (!backendUrl) {
    console.log(
      "REACT_APP_BACKEND_URL env variable is empty : connection impossible",
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    setLoading(true)

    const requestBody = {
      username: username,
      password: password,
    }

    try {
      const response = await fetch(backendUrl + "/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      })

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          setSuccessMessage(responseData.message)
          break
        case 401:
          const errorData = await response.json()
          setErrorMessage(errorData.message)
          break
        case 429:
          setErrorMessage("Too many failures, plese wait a while")
          break
        case 500:
          setErrorMessage("Internal server error")
          break
        default:
          throw new Error("Unexpected response from backend")
      }
    } catch (e) {
      setErrorMessage("Internal server error")
      console.error("Server error :" + e)
    } finally {
      setLoading(false)
    }
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
          {loading ? "Chargement..." : "Se connecter"}
        </StyledSubmitButton>
      </StyledForm>
    </BasicWrapper>
  )
}

export default Login
