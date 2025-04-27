import React from 'react'
import config from '../../utils/config'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'
import { useUser } from '../../context/contexts'
import styled from 'styled-components'

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`

const ListItem = styled.li`
  margin: 0;
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`

const FileLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 6px;
  }
`

const DirectoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 600;
  padding: 2px 4px;
  margin: 0;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`

function RecursiveList({
  folderContent = [],
  setErrorMessage,
  setSuccessMessage,
}) {
  const { user } = useUser()

  return (
    <List>
      {folderContent.map((item, index) => {
        switch (item.type) {
          case 'file':
            return (
              <ListItem key={item.path + item.name + index}>
                <FileLink
                  href={`${config.backendUrl}${config.docsRoute}/${item.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </FileLink>
              </ListItem>
            )
          case 'directory':
            return (
              <ListItem key={item.path + item.name + index}>
                <DirectoryItem>
                  <span>{item.name}</span>
                  {user && (
                    <>
                      <AddFileButton
                        folderPath={item.path}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                      />
                      <AddFolderButton
                        folderPath={item.path}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                      />
                    </>
                  )}
                </DirectoryItem>
                <RecursiveList
                  folderContent={item.contents}
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                />
              </ListItem>
            )
          default:
            console.error(
              'From recursiveList unknown item type found : ' + item.type,
            )
            return null
        }
      })}
    </List>
  )
}

export default RecursiveList
