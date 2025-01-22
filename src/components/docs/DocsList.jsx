import React, { useEffect, useState } from "react"
import { Loader, StyledErrorMessage } from "../../utils/style/CommonStyles"
import axios from "axios"
import config from "../../utils/config"

function DocsList({ triggerFetch }) {
  const [docs, setDocs] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [isFetching, setIsFetching] = useState(false)

  const backendUrl = config.backendUrl

  useEffect(() => {
    setIsFetching(true)
    axios
      .get(backendUrl + "/api/docs")
      .then((response) => {
        setDocs(response.data)
      })
      .catch((error) => {
        console.error("Error during fetching docs: " + error)
        if (error.response) {
          console.error("Unknown error during docs fetching")
          setErrorMessage("Internal server error")
        } else {
          setErrorMessage("Internal error: Connection to backend failed")
        }
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [backendUrl, triggerFetch])

  const renderTree = (items) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.type === "directory" ? (
              <>
                <strong>{item.name}</strong>
                {renderTree(item.contents)}
              </>
            ) : (
              <a
                href={`${backendUrl}/data/docs/${item.path}`}
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
      {isFetching ? <Loader /> : <div>{renderTree(docs)}</div>}
    </div>
  )
}

export default DocsList
