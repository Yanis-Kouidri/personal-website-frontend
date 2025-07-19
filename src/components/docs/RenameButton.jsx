import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { TextCursorInput } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'
import PropTypes from 'prop-types'

function RenameButton({
  itemPath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}) {
  const [isRenaming, setIsRenaming] = useState(false)

  const handleButtonClick = () => {
    const newName = prompt('Fill new item name: ')
    if (!newName) {
      setErrorMessage('You must fill a name')
      return
    } else {
      newName.trim()
    }

    handleApiRequest({
      apiEndPoint: '/api/docs/rename',
      method: 'PATCH',
      data: { itemPath, newName },
      credentials: true,
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
      },
      setIsFetching: setIsRenaming,
      onSuccess: () => {
        refreshDocs?.()
        setSuccessMessage('Item renamed !')
      },
    })
  }

  return (
    <IconActionButton onClick={handleButtonClick} disabled={isRenaming}>
      {isRenaming ? '...' : <TextCursorInput size={20} />}
    </IconActionButton>
  )
}

RenameButton.propTypes = {
  itemPath: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  refreshDocs: PropTypes.func,
}

export default RenameButton
