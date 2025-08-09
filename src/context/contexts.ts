import { createContext, use } from 'react'

export type User = string | null

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
