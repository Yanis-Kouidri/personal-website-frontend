import React, { useState, useEffect } from 'react'
import config from '../utils/config.js'
import { UserContext } from './contexts.js'

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const backendUrl = config.backendUrl

  useEffect(() => {
    fetch(backendUrl + '/api/auth/me', {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          setUser('')
        } else {
          response
            .json()
            .then((data) => {
              setUser(data.user)
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [backendUrl, user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
