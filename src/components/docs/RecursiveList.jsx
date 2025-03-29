import React from 'react'

function RecursiveList({ folderContent = [] }) {
  return (
    <ul>
      {folderContent.map((item, index) => {
        switch (item.type) {
          case 'file':
            return <li key={index}>{item.name}</li>
          case 'directory':
            return (
              <li key={index}>
                {item.name}
                <RecursiveList folderContent={item.contents}></RecursiveList>
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
