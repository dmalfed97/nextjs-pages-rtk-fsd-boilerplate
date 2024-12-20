export const validatePhone = (str: string): string => {
  return str.replace(/[^+0-9]/g, '')
}
