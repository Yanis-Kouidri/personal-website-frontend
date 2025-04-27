import React, { useRef, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FilePlus } from 'lucide-react'
import styled from 'styled-components'

const FileUploadButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

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
      <FileUploadButton onClick={handleButtonClick} disabled={isUploading}>
        {isUploading ? '...' : <FilePlus size={15} />}
      </FileUploadButton>
    </span>
  )
}

export default AddFileButton
