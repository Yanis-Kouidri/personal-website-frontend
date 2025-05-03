import React, { useRef, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FilePlus } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'

function AddFileButton({
  folderPath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
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
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
      },
      setIsFetching: setIsUploading,
      onSuccess: () => {
        refreshDocs?.()
        setSuccessMessage('File upload !')
      },
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
      <IconActionButton onClick={handleButtonClick} disabled={isUploading}>
        {isUploading ? '...' : <FilePlus size={20} />}
      </IconActionButton>
    </span>
  )
}

export default AddFileButton
