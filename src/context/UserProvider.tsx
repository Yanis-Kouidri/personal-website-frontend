import React, { useState, useEffect, useMemo } from 'react'
import { UserContext } from './contexts'
import type { User, ApiUserObject } from './contexts'
import { handleApiRequest } from '../hooks/useApiRequest'

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
      onSuccess: (data: { user: ApiUserObject }) => {
        setUser(data.user.username)
      },
      onError: () => {
        setUser(null)
      },
    })
  }, [])

  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext value={value}>{children}</UserContext>
}
