import { useEffect, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import {
  Loader,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import RecursiveList from './RecursiveList'
import styled from 'styled-components'

import type { FolderContent } from './RecursiveList'

const ListContainer = styled.ul`
  padding: 4px 8px 8px 16px;
  margin-bottom: 40px;
  background-color: #fafafa;
  border-radius: 12px;
`

function DocsList() {
  const [listOfDocs, setListOfDocs] = useState<FolderContent>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const fetchDocs = () => {
    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      credentials: false,
      setIsFetching,
      onSuccess: (data: FolderContent) => {
        setErrorMessage('')
        setListOfDocs(data)
      },
      onError: (errMsg) => {
        setSuccessMessage('')
        setErrorMessage(errMsg)
      },
    })
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (errorMessage || successMessage) {
      timeout = setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [errorMessage, successMessage])

  return (
    <div>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      {isFetching ? (
        <Loader />
      ) : (
        <ListContainer>
          <RecursiveList
            folderContent={listOfDocs}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
            refreshDocs={fetchDocs}
          ></RecursiveList>
        </ListContainer>
      )}
    </div>
  )
}

export default DocsList
