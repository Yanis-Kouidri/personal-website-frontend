import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FileX } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'

function DeleteFileButton({
  filePath = '',
  setErrorMessage,
  setSuccessMessage,
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    handleApiRequest({
      apiEndPoint: `/api/docs`,
      method: 'DELETE',
      data: { filePath },
      credentials: true,
      setErrorMessage,
      setSuccessMessage,
      setIsFetching: setIsDeleting,
    })
  }
  return (
    <IconActionButton onClick={handleClick} disabled={isDeleting}>
      {isDeleting ? '...' : <FileX size={20} />}
    </IconActionButton>
  )
}

export default DeleteFileButton
