import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { handleApiRequest } from '../hooks/useApiRequest'
import type { ApiUserObject, User } from './contexts'
import { UserContext } from './contexts'

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
