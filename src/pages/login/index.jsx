import { BasicH2Title, BasicWrapper } from "../../utils/style/CommonStyles"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { useState } from "react"

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

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const backendUrl = process.env.REACT_APP_BACKEND_URL
  if (!backendUrl) {
    console.log(
      "REACT_APP_BACKEND_URL env variable is empty : connection impossible",
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

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
      })

      if (response.status === 401) {
        const errorData = await response.json()
        setErrorMessage(errorData.message)
      } else {
        if (response.status === 200) {
          setErrorMessage("")
          const authData = await response.json()
          console.log(authData)
          //const token = authData.token
          //const userId = authData.userId
        } else {
          throw new Error("Unexpected response from backend")
        }
      }
    } catch (e) {
      console.error("Server error :" + e)
    }
	}

    return (
      <BasicWrapper>
        <BasicH2Title>Connexion</BasicH2Title>
        {errorMessage && <p>{errorMessage}</p>}
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
          <StyledSubmitButton type="submit">Se connecter</StyledSubmitButton>
        </StyledForm>
      </BasicWrapper>
    )
  }

export default Login
