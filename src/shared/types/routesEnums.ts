export enum AuthRoutesEnum {
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGN_IN = '/auth/signin',
  SIGN_IN_CONFIRM = '/auth/signin/confirm',
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
