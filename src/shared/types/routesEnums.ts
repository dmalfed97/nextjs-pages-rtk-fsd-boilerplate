export enum AuthRoutesEnum {
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGN_UP = '/auth/signup',
  SIGN_UP_CONFIRM = '/auth/signup/confirm',
  RESTORE = '/auth/restore',
  RESTORE_CHANGE_PASSWORD = '/auth/restore/change-password',
}

export enum PrivateRoutesEnum {
  PROFILE = '/profile',
}

export enum CommonRoutesEnum {}

export enum SpecifiedCommonRoutesEnum {}

export const LinksHelper = {
  // Example
  // [SpecifiedCommonRoutesEnum.SPECIFIED_ENTITY]: (entityId: string) => `${CommonRoutesEnum.ENTITY}/${entityId}`,
}
