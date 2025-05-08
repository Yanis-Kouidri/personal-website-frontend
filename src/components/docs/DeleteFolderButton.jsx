import React, { useState } from 'react'
import styled from 'styled-components'
import { Trash2 } from 'lucide-react'
import { handleApiRequest } from '../../hooks/useApiRequest'

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: #e53e3e;

  &:hover {
    background-color: #f5f5f5;
  }
`

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

export default DeleteFolderButton
