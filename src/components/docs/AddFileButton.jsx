import React, { useRef, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'

function AddFileButton({
  folderPath = '',
  setErrorMessage,
  setSuccessMessage,
}) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

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

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <span>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} disabled={isUploading}>
        {isUploading ? '...' : '+'}
      </button>
    </span>
  )
}

export default AddFileButton
