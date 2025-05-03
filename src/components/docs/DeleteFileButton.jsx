import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FileX } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'

function DeleteFileButton({
  filePath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this file?\n' + filePath,
    )
    if (!confirmed) return
    handleApiRequest({
      apiEndPoint: `/api/docs`,
      method: 'DELETE',
      data: { filePath },
      credentials: true,
      setIsFetching: setIsDeleting,
      onSuccess: () => {
        refreshDocs?.()
        setSuccessMessage('File deleted !')
      },
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
      },
    })
  }
  return (
    <IconActionButton onClick={handleClick} disabled={isDeleting}>
      {isDeleting ? '...' : <FileX size={20} />}
    </IconActionButton>
  )
}

export default DeleteFileButton
