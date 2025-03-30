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

  useEffect(() => {
    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      setErrorMessage,
      setIsFetching,
      setData: setListOfDocs,
    })
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
        ></RecursiveList>
      )}
    </div>
  )
}

export default DocsList
