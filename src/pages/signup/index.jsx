import { useState } from "react"
import {
  BasicH2Title,
  BasicWrapper,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
} from "../../utils/style/CommonStyles"

function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [signupKey, setSignupKey] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const backendUrl = process.env.REACT_APP_BACKEND_URL
  if (!backendUrl) {
    console.log(
      "REACT_APP_BACKEND_URL env variable is empty : connection impossible",
    )
  }

  const handleSubmit = async (e) => { // To improve, currently no resistant to errors
    e.preventDefault()

    const requestBody = {
      username: username,
      password: password,
      signupKey: signupKey,
    }

    try {
      const response = await fetch(backendUrl + "/api/auth/signup", {
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
      <BasicH2Title>Inscription</BasicH2Title>
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
        <StyledInput
          name="signupkey"
          type="password"
          placeholder="Sign-up key"
          value={signupKey}
          onChange={(e) => setSignupKey(e.target.value)}
        />
        <StyledSubmitButton type="submit">S'inscrire</StyledSubmitButton>
      </StyledForm>
    </BasicWrapper>
  )
}

export default Signup
