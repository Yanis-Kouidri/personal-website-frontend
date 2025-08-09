import { useState } from 'react'
import PropTypes from 'prop-types'
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

AddFolderButton.propTypes = {
  folderPath: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  refreshDocs: PropTypes.func,
}

export default AddFolderButton
