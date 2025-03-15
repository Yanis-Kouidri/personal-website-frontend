import React, { useState } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import {
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'

function AddFolders({ setTriggerFetch }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSucessMessage] = useState('')
  const [folderName, setFolderName] = useState('')

  const handleCreateFolder = (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSucessMessage('')

    axios
      .post(
        config.backendUrl + '/api/docs/newfolder',
        {
          folderName,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        setSucessMessage(response.data.message)
        setTriggerFetch((prev) => prev + 1)
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setErrorMessage(error.response.data.message)
              break
            case 401:
            case 500:
              console.error(
                error.response.status +
                  ' error : ' +
                  error.response.data.message,
              )
              setErrorMessage(error.response.data.message)
              break
            default:
              console.error('Unknown error folder creation')
              setErrorMessage('Internal server error')
              break
          }
        } else {
          setErrorMessage('Internal error: Connection to backend failed')
        }
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
