import { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { TextCursorInput } from 'lucide-react'
import { IconActionButton } from '../../utils/style/CommonStyles'

import type { ItemDocsButton } from './RecursiveList'

function RenameButton({
  itemPath = '',
  setErrorMessage,
  setSuccessMessage,
  refreshDocs,
}: ItemDocsButton) {
  const [isRenaming, setIsRenaming] = useState(false)

  const handleButtonClick = () => {
    let newName = prompt('Fill new item name: ')
    if (!newName) {
      setErrorMessage('You must fill a name')
      return
    } else {
      newName = newName.trim()
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

export default RenameButton
