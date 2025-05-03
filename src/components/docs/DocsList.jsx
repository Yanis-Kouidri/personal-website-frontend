import React, { useEffect, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import {
  Loader,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import RecursiveList from './RecursiveList'

function DocsList() {
  const [listOfDocs, setListOfDocs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const fetchDocs = () => {
    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      setErrorMessage,
      setIsFetching,
      onSuccess: (data) => {
        setListOfDocs(data)
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
        <RecursiveList
          folderContent={listOfDocs}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          refreshDocs={fetchDocs}
        ></RecursiveList>
      )}
    </div>
  )
}

export default DocsList
