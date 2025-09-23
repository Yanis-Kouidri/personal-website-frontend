import React, { useState, useEffect, useMemo } from 'react'
import { UserContext } from './contexts.js'
import type { User } from './contexts'
import { handleApiRequest } from '../hooks/useApiRequest.js'

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    handleApiRequest({
      apiEndPoint: '/api/auth/me',
      method: 'GET',
      credentials: true,
      onSuccess: (data: { message: User }) => {
        setUser(data.message)
      },
      onError: () => {
        setUser(null)
      },
    })
  }, [])

  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext value={value}>{children}</UserContext>
}
