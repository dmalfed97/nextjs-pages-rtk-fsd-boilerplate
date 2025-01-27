import { DeviceTypeEnum } from '../types/device'

export function detectDevice(userAgent: string): DeviceTypeEnum {
  const ua = userAgent?.toLowerCase()

  const isMobile =
    /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|iemobile|mobile/i.test(ua)

  return isMobile ? DeviceTypeEnum.MOBILE : DeviceTypeEnum.DESKTOP
}
