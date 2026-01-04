import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { handleApiRequest } from '../../hooks/useApiRequest'
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

  // 1. On utilise useCallback pour stabiliser la fonction
  // 2. On ajoute un signal d'annulation (AbortController)
  const fetchDocs = useCallback((signal?: AbortSignal) => {
    setIsFetching(true)

    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      credentials: false,
      // On passe le signal à ton hook si handleApiRequest le supporte
      // Sinon, on gère la garde ici
      onSuccess: (data: FolderContent) => {
        if (signal?.aborted) return // On ignore si le composant est démonté
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

    // Nettoyage : si le composant est démonté, on annule tout
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
