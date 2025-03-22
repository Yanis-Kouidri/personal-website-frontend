import React, { useEffect, useState } from 'react'
import {
  Loader,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../../utils/style/CommonStyles'
import config from '../../utils/config'
import { handleApiRequest } from '../../hooks/useApiRequest'

function DocsList({ triggerFetch, setTriggerFetch }) {
  const [docs, setDocs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [expandedDirs, setExpandedDirs] = useState({})

  const backendUrl = config.backendUrl

  useEffect(() => {
    setIsFetching(true)

    handleApiRequest({
      apiEndPoint: '/api/docs',
      method: 'GET',
      setErrorMessage,
      setIsFetching,
      setData: setDocs,
    })
  }, [backendUrl, triggerFetch])

  const renderTree = (items) => {
    const toggleDirectory = (path) => {
      setExpandedDirs((prev) => ({
        ...prev,
        [path]: !prev[path],
      }))
    }

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.type === 'directory' ? (
              <>
                <button onClick={() => toggleDirectory(item.path)}>
                  {expandedDirs[item.path] ? '-' : '+'}
                </button>
                <strong>{item.name}</strong>
                {
                  <button
                    onClick={() => {
                      const folderName = prompt('Enter new folder name:')
                      if (folderName) {
                        handleApiRequest({
                          apiEndPoint: '/api/docs/newfolder',
                          data: { folderPath: item.path, folderName },
                          credentials: true,
                          setErrorMessage,
                          setSuccessMessage,
                          setTriggerFetch,
                        })
                      }
                    }}
                  >
                    New
                  </button>
                }
                {expandedDirs[item.path] && renderTree(item.contents)}
              </>
            ) : (
              <a
                href={`${backendUrl}/data/docs/${item.path}`} //FIXME: must not fetch from backendUrl
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <h1>Liste des PDF</h1>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      {isFetching ? <Loader /> : <div>{renderTree(docs)}</div>}
    </div>
  )
}

export default DocsList
