import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'

function AddFileButton({
  folderPath = '',
  setErrorMessage,
  setSuccessMessage,
}) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    console.log('Folder path = ' + folderPath)

    handleApiRequest({
      apiEndPoint: `/api/docs?path=${encodeURIComponent(folderPath)}`,
      method: 'POST',
      data: formData,
      credentials: true,
      setErrorMessage,
      setSuccessMessage,
      setIsFetching: setIsUploading,
    })
  }

  return (
    <span>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <button
        onClick={() => document.getElementById('fileInput').click()}
        disabled={isUploading}
      >
        {isUploading ? '...' : '+'}
      </button>
    </span>
  )
}

export default AddFileButton
