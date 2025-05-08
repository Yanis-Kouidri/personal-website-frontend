import React from 'react'
import config from '../../utils/config'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'
import DeleteFileButton from './DeleteFileButton'
import DeleteFolderButton from './DeleteFolderButton'
import RenameButton from './RenameButton'
import { useUser } from '../../context/contexts'
import styled from 'styled-components'
import { Folder, File } from 'lucide-react'

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  position: relative;
`

const ListItem = styled.li`
  margin: 0;
  padding: 0;
`

const IndentedContainer = styled.div`
  padding-left: ${({ $depth }) => $depth * 24}px;
  display: flex;
  align-items: center;
  position: relative;
`

const DirectoryContainer = styled.div`
  margin: 8px 0;
  padding-left: 1px;
`

const FileContainer = styled.div`
  margin: 8px 0;
  padding: 0px;
`

const FileLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 0;
  min-height: 20px;

  &:hover {
    background-color: #f5f5f5;
  }
`

const DirectoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  padding: 0;
  border-radius: 6px;
  transition: background-color 0.2s;
  min-height: 30px;

  &:hover {
    background-color: #f5f5f5;
  }
`

const StyledFile = styled(File)`
  margin-right: 8px;
`

function RecursiveList({
  folderContent = [],
  setErrorMessage,
  setSuccessMessage,
  depth = 0,
  refreshDocs,
}) {
  const { user } = useUser()

  return (
    <List>
      {folderContent.map((item, index) => {
        switch (item.type) {
          case 'file':
            return (
              <ListItem key={item.path + item.name + index}>
                <FileContainer>
                  <IndentedContainer $depth={depth}>
                    <FileLink
                      href={`${config.backendUrl}${config.docsRoute}/${item.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <StyledFile size={20} />
                      {item.name}
                    </FileLink>
                    {user && (
                      <>
                        <RenameButton
                          itemPath={item.path}
                          setErrorMessage={setErrorMessage}
                          setSuccessMessage={setSuccessMessage}
                          refreshDocs={refreshDocs}
                        />
                        <DeleteFileButton
                          filePath={item.path}
                          setErrorMessage={setErrorMessage}
                          setSuccessMessage={setSuccessMessage}
                          refreshDocs={refreshDocs}
                        />
                      </>
                    )}
                  </IndentedContainer>
                </FileContainer>
              </ListItem>
            )
          case 'directory':
            return (
              <ListItem key={item.path + item.name + index}>
                <DirectoryContainer>
                  <IndentedContainer $depth={depth}>
                    <DirectoryItem>
                      <Folder size={20} />
                      <span>{item.name}</span>
                      {user && (
                        <>
                          <RenameButton
                            itemPath={item.path}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                            refreshDocs={refreshDocs}
                          />
                          <AddFileButton
                            folderPath={item.path}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                            refreshDocs={refreshDocs}
                          />
                          <AddFolderButton
                            folderPath={item.path}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                            refreshDocs={refreshDocs}
                          />
                          <DeleteFolderButton
                            folderPath={item.path}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                            refreshDocs={refreshDocs}
                          />
                        </>
                      )}
                    </DirectoryItem>
                  </IndentedContainer>
                  <RecursiveList
                    folderContent={item.contents}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                    refreshDocs={refreshDocs}
                    depth={depth + 1}
                  />
                </DirectoryContainer>
              </ListItem>
            )
          default:
            console.error('Unknown item type: ' + item.type)
            return null
        }
      })}
    </List>
  )
}

export default RecursiveList
