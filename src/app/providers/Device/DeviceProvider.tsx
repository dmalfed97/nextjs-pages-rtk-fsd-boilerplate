import React, { type FC, type PropsWithChildren } from 'react'

import { DeviceTypeEnum } from '~shared/types/device'
import { detectDevice } from '~shared/utils/detectDevice'

import { DeviceContext } from './DeviceContext'

interface DeviceProviderProps extends PropsWithChildren {
  userAgent: string
}

export const DeviceProvider: FC<DeviceProviderProps> = ({ userAgent, children }) => {
  const deviceType = detectDevice(userAgent)

  return (
    <DeviceContext.Provider value={{ isMobile: deviceType === DeviceTypeEnum.MOBILE }}>
      {children}
    </DeviceContext.Provider>
  )
}
