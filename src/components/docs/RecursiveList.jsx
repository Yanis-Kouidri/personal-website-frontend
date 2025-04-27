import React from 'react'
import config from '../../utils/config'
import AddFileButton from './AddFileButton'
import { useUser } from '../../context/contexts'
import styled from 'styled-components'

const DirectoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1px; /* Space between name and button */
`

function RecursiveList({
  folderContent = [],
  setErrorMessage,
  setSuccessMessage,
}) {
  const { user } = useUser()

  return (
    <ul>
      {folderContent.map((item, index) => {
        switch (item.type) {
          case 'file':
            return (
              <li key={item.path + item.name + index}>
                <a
                  href={`${config.backendUrl}${config.docsRoute}/${item.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </li>
            )
          case 'directory':
            return (
              <li key={item.path + item.name + index}>
                <DirectoryItem>
                  <span> {item.name} </span>
                  {user && (
                    <AddFileButton
                      folderPath={item.path}
                      setErrorMessage={setErrorMessage}
                      setSuccessMessage={setSuccessMessage}
                    />
                  )}
                </DirectoryItem>

                <RecursiveList
                  folderContent={item.contents}
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                ></RecursiveList>
              </li>
            )
          default:
            console.error(
              'From recursiveList unknown item type found : ' + item.type,
            )
            return null
        }
      })}
    </ul>
  )
}

export default RecursiveList
