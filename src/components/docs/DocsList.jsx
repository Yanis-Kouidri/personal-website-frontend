import React, { useEffect, useState } from "react"

function DocsList() {
  const [docs, setDocs] = useState([])
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  if (!backendUrl) {
    console.log(
      "REACT_APP_BACKEND_URL env variable is empty : connection impossible",
    )
  }

  useEffect(() => {
    fetch(backendUrl + "/api/docs")
      .then((response) => response.json())
      .then((data) => setDocs(data))
      .catch((error) => console.error("Error fetching docs:", error))
  }, [backendUrl])

  return (
    <div>
      <h1>Liste des PDF</h1>
      <ul>
        {docs.map((doc, index) => (
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
