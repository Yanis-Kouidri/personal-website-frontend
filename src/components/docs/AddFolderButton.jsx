import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FolderPlus } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'

function AddFolderButton({
  folderPath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}) {
  const [isCreating, setIsCreating] = useState(false)

  const handleClick = () => {
    const folderName = prompt('Entrez le nom du nouveau dossier :').trim()

    if (!folderName) {
      return
    }

    handleApiRequest({
      apiEndPoint: `/api/docs/newFolder`,
      method: 'POST',
      data: { folderName, folderPath },
      credentials: true,
      setErrorMessage,
      setSuccessMessage,
      setIsFetching: setIsCreating,
      onSuccess: () => {
        refreshDocs?.()
      },
    })
  }

  return (
    <IconActionButton onClick={handleClick} disabled={isCreating}>
      {isCreating ? '...' : <FolderPlus size={20} />}
    </IconActionButton>
  )
}

export default AddFolderButton
