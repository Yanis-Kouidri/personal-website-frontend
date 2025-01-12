import { useState, useEffect } from "react"
import {
  BasicH2Title,
  BasicWrapper,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
  StyledErrorMessage,
  StyledSuccessMessage,
} from "../../utils/style/CommonStyles"

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    signupKey: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const backendUrl = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    if (!backendUrl) {
      console.error("REACT_APP_BACKEND_URL env variable is empty: connection impossible");
    }
  }, [backendUrl]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.signupKey) {
      setErrorMessage("Tous les champs sont requis")
      return false
    }
    if (formData.password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setInfoMessage("")
    setErrorMessage("")
    if (!validateForm()) {
      setLoading(false)
      return
    }

    const requestBody = {
      username: formData.username,
      password: formData.password,
      signupKey: formData.signupKey,
    }

    try {
      const response = await fetch(backendUrl + "/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (response.status === 400 || response.status === 401) {
        const errorData = await response.json()
        setErrorMessage(errorData.message)
      } else {
        if (response.status === 201) {
          const successData = await response.json()
          setInfoMessage(successData.message)
        } else {
          throw new Error("Unexpected response from backend")
        }
      }
    } catch (e) {
      setErrorMessage("Erreur serveur, veuillez réessayer plus tard.")
      console.error("Server error :" + e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BasicWrapper>
      <BasicH2Title>Inscription</BasicH2Title>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {infoMessage && (
        <StyledSuccessMessage>{infoMessage}</StyledSuccessMessage>
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
        <StyledSubmitButton type="submit" disabled={loading}>
          {loading ? "Chargement..." : "S'inscrire"}
        </StyledSubmitButton>
      </StyledForm>
    </BasicWrapper>
  )
}

export default Signup
