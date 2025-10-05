import { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { Trash2 } from 'lucide-react'
import { DeleteButton } from '../../utils/style/CommonStyles'

import type { FileDocsButton } from './RecursiveList'

function DeleteFileButton({
  filePath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}: Readonly<FileDocsButton>) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    const confirmed = globalThis.confirm(
      'Are you sure you want to delete this file?\n' + filePath,
    )
    if (!confirmed) return
    handleApiRequest({
      apiEndPoint: `/api/docs`,
      method: 'DELETE',
      data: { path: filePath },
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
    <DeleteButton onClick={handleClick} disabled={isDeleting}>
      {isDeleting ? '...' : <Trash2 size={16} />}
    </DeleteButton>
  )
}

export default DeleteFileButton
