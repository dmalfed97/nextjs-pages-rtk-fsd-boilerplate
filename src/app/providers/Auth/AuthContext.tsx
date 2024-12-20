import { createContext, useContext } from 'react'

interface IAuthContext {
  isInitialized: boolean
  isAuthorized: boolean
}

const AuthContext = createContext<IAuthContext>({
  isInitialized: false,
  isAuthorized: false,
})

export { AuthContext }

export const useAuthContext = (): IAuthContext => useContext(AuthContext)
