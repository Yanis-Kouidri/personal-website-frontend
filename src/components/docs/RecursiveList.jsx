import React from 'react'
import config from '../../utils/config'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'
import { useUser } from '../../context/contexts'
import styled from 'styled-components'
import DeleteFileButton from './DeleteFileButton'

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`

const ListItem = styled.li`
  margin: 0;
  padding: 0;
`

const IndentedContainer = styled.div`
  padding-left: ${(props) => props.depth * 14}px;
  display: flex;
  align-items: center;
`

const FileLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: block;
  padding: 4px 0px;
  border-radius: 6px;

  &:hover {
    background-color: #f5f5f5;
  }
`

const DirectoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
  font-weight: 600;
  padding: 0px 0px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`

function RecursiveList({
  folderContent = [],
  setErrorMessage,
  setSuccessMessage,
  depth = 0,
}) {
  const { user } = useUser()

  return (
    <List>
      {folderContent.map((item, index) => {
        switch (item.type) {
          case 'file':
            return (
              <ListItem key={item.path + item.name + index}>
                <IndentedContainer depth={depth + 1}>
                  <FileLink
                    href={`${config.backendUrl}${config.docsRoute}/${item.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </FileLink>
                  {user && (
                    <DeleteFileButton
                      filePath={item.path}
                      setErrorMessage={setErrorMessage}
                      setSuccessMessage={setSuccessMessage}
                    />
                  )}
                </IndentedContainer>
              </ListItem>
            )
          case 'directory':
            return (
              <ListItem key={item.path + item.name + index}>
                <IndentedContainer depth={depth}>
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
                </IndentedContainer>
                <RecursiveList
                  folderContent={item.contents}
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                  depth={depth + 1}
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
