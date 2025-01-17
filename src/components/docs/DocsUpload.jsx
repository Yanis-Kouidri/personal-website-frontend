import React, { useState } from "react"
import config from "../../utils/config"
import axios from "axios"

function DocsUpload() {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!file) {
      alert("Veuillez sélectioner un fichier")
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
        alert("File successefuly added")
      })
      .catch((error) => {
        console.error("Error during upload: " + error)
        console.error("Backen response :" + error.response.data.message)
      })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Télécharger</button>
    </form>
  )
}

export default DocsUpload
