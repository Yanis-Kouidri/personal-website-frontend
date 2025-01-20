import React, { useState } from "react"
import config from "../../utils/config"
import axios from "axios"
import {
  StyledErrorMessage,
  StyledSuccessMessage,
} from "../../utils/style/CommonStyles"

function DocsUpload({ setTriggerFetch }) {
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSucessMessage] = useState("")

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage("")
    setSucessMessage("")
    if (!file) {
      setErrorMessage("Veuillez sélectioner un fichier")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    axios
      .post(config.backendUrl + "/api/docs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        setSucessMessage(response.data.message)
        setTriggerFetch((prev) => prev + 1)
      })
      .catch((error) => {
        console.error("Error during upload: " + error)
        if (error.response) {
          switch (error.response.status) {
            case 400:
            case 401:
            case 500:
              console.error(
                error.response.status +
                  " error : " +
                  error.response.data.message,
              )
              setErrorMessage(error.response.data.message)
              break
            default:
              console.error("Unknown error during file upload")
              setErrorMessage("Internal server error")
              break
          }
        } else {
          setErrorMessage("Internal error: Connection to backend failed")
        }
      })
  }
  return (
    <div>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default DocsUpload
