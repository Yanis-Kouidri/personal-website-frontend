import React, { useEffect, useState } from "react"
import { Loader, StyledErrorMessage } from "../../utils/style/CommonStyles"
import axios from "axios"
import config from "../../utils/config"

function DocsList( {triggerFetch}) {
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

  return (
    <div>
      <h1>Liste des PDF</h1>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {isFetching ? (
        <Loader />
      ) : (
        <ul>
          {docs &&
            docs.map((doc, index) => (
              <li key={index}>
                <a
                  href={`${backendUrl}/data/docs/${doc}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc}
                </a>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default DocsList
