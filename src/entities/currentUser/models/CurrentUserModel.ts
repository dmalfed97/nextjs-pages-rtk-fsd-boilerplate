import type { SexEnum } from '~shared/types/sex'

export type CurrentUserModel = {
  id: string | null
  firstName: string | null
  lastName: string | null
  userName: string | null
  dateOfBirth: string | null
  email: string
  sex: SexEnum
  avatar: string | null
  description: string | null
  isConfirmedRegistration: boolean
  createdAt: string
  updatedAt: string
}
