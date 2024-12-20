export const getTimeFromUUID = (uuid: string): Date => {
  const hex = uuid.replaceAll('-', '').slice(0, 12)
  const ms = parseInt(hex, 16)

  return new Date(ms)
}
