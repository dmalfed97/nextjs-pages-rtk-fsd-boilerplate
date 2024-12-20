import type { CurrentUserModel } from '../models'

export class CurrentUserHelper {
  static getCurrentUserName = (currentUser: CurrentUserModel): string => {
    return (
      `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || currentUser.email
    )
  }
}
