export type SessionModel = {
  id: string
  deleted: boolean
  userId: string
  refreshToken: string
  ua: string
  fingerprint: string
  ip: string
  expiresIn: string
  updatedAt: string
}
