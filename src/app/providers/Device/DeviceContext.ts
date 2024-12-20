import { createContext, useContext } from 'react'

interface DeviceContextProps {
  isMobile: boolean
}

export const DeviceContext = createContext<DeviceContextProps | undefined>(undefined)

export const useIsMobile = () => {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error('useIsMobile must be used within a DeviceProvider')
  }
  return context.isMobile
}
