import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { handleApiRequest } from '../hooks/apiRequest'
import type { ApiUserObject, User } from './contexts'
import { UserContext } from './contexts'

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isIgnore = false

    handleApiRequest({
      apiEndPoint: '/api/auth/me',
      method: 'GET',
      credentials: true,
      onSuccess: (data: { user: ApiUserObject }) => {
        // Only update state if the component is still relevant
        if (!isIgnore) {
          setUser(data.user.username)
        }
      },
      onError: () => {
        if (!isIgnore) {
          setUser(null)
        }
      },
    })

    return () => {
      // Cleanup: ignore the result of the request if the component unmounts
      isIgnore = true
    }
  }, [])

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext value={value}>{children}</UserContext>
}
