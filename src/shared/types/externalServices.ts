export enum AuthorizationServiceEnum {
  YANDEX = 'yandex',
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
}

export enum AuthorizationServiceScenarioEnum {
  CODE = 'code',
  ID_TOKEN = 'id_token',
  ACCESS_TOKEN = 'access_token',
}

export type AppleOAuthResponseType = {
  error?: string
  authorization?: {
    state: string
    code: string
    id_token: string
  }
  user?: {
    email: string
    name: {
      firstName: string
      lastName: string
    }
  }
}
