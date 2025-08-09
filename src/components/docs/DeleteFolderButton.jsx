import { useState } from 'react'
import { DeleteButton } from '../../utils/style/CommonStyles'
import { Trash2 } from 'lucide-react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import PropTypes from 'prop-types'

function DeleteFolderButton({
  folderPath,
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (
      !confirm(`Are you sure you want to delete the folder "${folderPath}"?`)
    ) {
      return
    }
    handleApiRequest({
      apiEndPoint: `/api/docs`,
      method: 'DELETE',
      data: { path: folderPath },
      credentials: true,
      setIsFetching: setIsDeleting,
      onSuccess: () => {
        refreshDocs?.()
        setSuccessMessage('Folder deleted !')
      },
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
      },
    })
  }

  return (
    <DeleteButton
      onClick={handleDelete}
      disabled={isDeleting}
      title="Delete folder"
    >
      <Trash2 size={16} />
    </DeleteButton>
  )
}

DeleteFolderButton.propTypes = {
  folderPath: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  refreshDocs: PropTypes.func,
}

export default DeleteFolderButton
