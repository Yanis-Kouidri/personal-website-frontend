import React, { useState } from 'react'
import {
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import { handleApiRequest } from '../../hooks/useApiRequest'

function DocsUpload({ setTriggerFetch }) {
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    if (!file) {
      setErrorMessage('Veuillez sélectioner un fichier')
      return
    }

    const formData = new FormData()
    formData.append('file', file, encodeURIComponent(file.name))

    const headers = { 'content-Type': 'multipart/form-data' }

    handleApiRequest({
      apiEndPoint: '/api/docs',
      data: formData,
      headers,
      credentials: true,
      setErrorMessage,
      setSuccessMessage,
      setTriggerFetch,
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
