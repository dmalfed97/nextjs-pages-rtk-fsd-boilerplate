import { createContext, useContext } from 'react'

interface IAuthContext {
  isInitialized: boolean
  isAuthorized: boolean
}

export const AuthContext = createContext<IAuthContext>({
  isInitialized: false,
  isAuthorized: false,
})

export const useAuthContext = (): IAuthContext => useContext(AuthContext)
