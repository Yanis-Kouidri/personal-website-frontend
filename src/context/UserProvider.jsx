import React, { createContext, useContext, useState, useEffect } from 'react'
import config from '../utils/config.js'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

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
