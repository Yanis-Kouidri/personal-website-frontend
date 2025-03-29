import React, { useEffect, useState } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'
import { Loader, StyledErrorMessage } from '../../utils/style/CommonStyles'
import RecursiveList from './RecursiveList'

function DocsList() {
  const [listOfDocs, setListOfDocs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
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
      <h2>Liste des PDF</h2>
      {isFetching ? (
        <Loader />
      ) : (
        <RecursiveList folderContent={listOfDocs}></RecursiveList>
      )}
    </div>
  )
}

export default DocsList
