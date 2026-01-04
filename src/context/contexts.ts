import { createContext, use } from 'react'

export type User = string | null

export type ApiUserObject = {
  id: {
    buffer: Record<string, number>
  }
  username: string
  iat: number
  exp: number
}

export type UserContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const defaultValue: UserContextType = {
  user: null,
  setUser: () => {},
}

export const UserContext = createContext<UserContextType>(defaultValue)

export const useUser = () => {
  return use(UserContext)
}
