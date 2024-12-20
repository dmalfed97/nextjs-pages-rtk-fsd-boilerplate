import type { ReactNode, FC } from 'react'
import React from 'react'

import { DeviceTypeEnum } from '~shared/types/device'
import { detectDevice } from '~shared/utils/detectDevice'

import { DeviceContext } from './DeviceContext'

interface DeviceProviderProps {
  userAgent: string
  children: ReactNode
}

export const DeviceProvider: FC<DeviceProviderProps> = ({ userAgent, children }) => {
  const deviceType = detectDevice(userAgent)

  return (
    <DeviceContext.Provider value={{ isMobile: deviceType === DeviceTypeEnum.MOBILE }}>
      {children}
    </DeviceContext.Provider>
  )
}
