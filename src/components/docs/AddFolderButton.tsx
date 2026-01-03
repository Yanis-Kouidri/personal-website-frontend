import { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FolderPlus } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'

import type { FolderDocsButton } from './RecursiveList'

function AddFolderButton({
  folderPath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}: Readonly<FolderDocsButton>) {
  const [isCreating, setIsCreating] = useState(false)

  const handleClick = () => {
    let folderName = prompt('Entrez le nom du nouveau dossier :')

    if (!folderName?.trim()) {
      return
    }

    folderName = folderName.trim()

    handleApiRequest({
      apiEndPoint: `/api/docs/folder`,
      method: 'POST',
      data: { folderName, folderPath },
      credentials: true,
      setIsFetching: setIsCreating,
      onSuccess: () => {
        refreshDocs?.()
        setSuccessMessage('Folder created !')
      },
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
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
