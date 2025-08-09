import React, { useState, useEffect, useMemo } from 'react'
import config from '../utils/config.js'
import { UserContext } from './contexts.js'
import type { User } from './contexts'

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(null)
  const backendUrl = config.backendUrl

  //TO DO use generic hook
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

  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext value={value}>{children}</UserContext>
}
