import { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { Trash2 } from 'lucide-react'
import { DeleteButton } from '../../utils/style/CommonStyles'
import PropTypes from 'prop-types'

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

DeleteFileButton.propTypes = {
  filePath: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  refreshDocs: PropTypes.func,
}

export default DeleteFileButton
