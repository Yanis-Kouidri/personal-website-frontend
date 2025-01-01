import React, { useEffect, useState } from "react"

function DocsList() {
  const [docs, setDocs] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const standardErrorMessage =
    "Ooops, il semble qu'il y ait une erreur coté serveur"
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  if (!backendUrl) {
    console.log(
      "REACT_APP_BACKEND_URL env variable is empty : connection impossible",
    )
  }

  useEffect(() => {
    fetch(backendUrl + "/api/docs")
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(standardErrorMessage)
          throw new Error("Connection impossible")
        }
        return response.text()
      })
      .then((text) => {
        try {
          const data = JSON.parse(text) // Try to parse JSON
          setDocs(data)
        } catch (error) {
          setErrorMessage(standardErrorMessage)
          throw new SyntaxError("Error during JSON parsing: " + error.message)
        }
      })
      .catch((error) => {
        console.error("Error fetching docs:", error)
      })
  }, [backendUrl])

  return (
    <div>
      <h1>Liste des PDF</h1>
      {errorMessage && <p>{errorMessage}</p>}
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
    </div>
  )
}

export default DocsList
