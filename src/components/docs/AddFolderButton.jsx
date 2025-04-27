import React, { useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { FolderPlus } from 'lucide-react'
import styled from 'styled-components'

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function AddFolderButton({
  folderPath = '',
  setErrorMessage,
  setSuccessMessage,
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
    })
  }

  return (
    <Button onClick={handleClick} disabled={isCreating}>
      {isCreating ? '...' : <FolderPlus size={20} />}
    </Button>
  )
}

export default AddFolderButton
