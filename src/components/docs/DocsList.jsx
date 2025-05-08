import React, { useEffect, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import {
  Loader,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import RecursiveList from './RecursiveList'
import styled from 'styled-components'

const ListContainer = styled.ul`
  padding: 4px 8px 8px 16px;
  margin-bottom: 40px;
  background-color: #fafafa;
  border-radius: 12px;
`

function DocsList() {
  const [listOfDocs, setListOfDocs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const fetchDocs = () => {
    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      setIsFetching,
      onSuccess: (data) => {
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

  return (
    <div>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      <h2>Liste des PDF</h2>
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
