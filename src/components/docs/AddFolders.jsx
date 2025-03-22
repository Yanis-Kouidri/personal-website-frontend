import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import {
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'

function AddFolders({ setTriggerFetch }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [folderName, setFolderName] = useState('')
  const folderPath = '/'

  const handleCreateFolder = (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    handleApiRequest({
      apiEndPoint: '/api/docs/newfolder',
      data: { folderName, folderPath },
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
      <form onSubmit={handleCreateFolder}>
        <input
          type="text"
          placeholder="Nom du dossier"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default AddFolders
