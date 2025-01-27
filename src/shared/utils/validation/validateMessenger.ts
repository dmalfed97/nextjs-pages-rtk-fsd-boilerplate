import { conversionMap } from '../conversionMap'

export const validateMessenger = (str: string): string => {
  return str
    .split('')
    .map((char) => conversionMap[char.toLowerCase()] || char)
    .join('')
    .replace(/[^-_A-Za-z0-9]/g, '')
}
