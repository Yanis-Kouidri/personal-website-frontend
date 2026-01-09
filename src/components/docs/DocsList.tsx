import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { handleApiRequest } from '../../hooks/apiRequest'
import {
  Loader,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import type { FolderContent } from './RecursiveList'
import RecursiveList from './RecursiveList'

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

  const fetchDocs = useCallback((signal?: AbortSignal) => {
    setIsFetching(true)

    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      credentials: false,
      onSuccess: (data: FolderContent) => {
        if (signal?.aborted) return
        setErrorMessage('')
        setListOfDocs(data)
        setIsFetching(false)
      },
      onError: (errMsg) => {
        if (signal?.aborted) return
        setSuccessMessage('')
        setErrorMessage(errMsg)
        setIsFetching(false)
      },
    })
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchDocs(controller.signal)
    return () => controller.abort()
  }, [fetchDocs])

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
