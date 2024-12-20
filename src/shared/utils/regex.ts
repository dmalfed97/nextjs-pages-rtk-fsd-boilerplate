export const EMAIL_REGEX =
  // eslint-disable-next-line max-len
  `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`

export const LOGIN_REGEX = `^[A-Za-z0-9._@]+$`

export const WITHOUT_SPACES_REGEX = `^[^\\s]+$`

export const PASSWORD_REGEX_SPACES = `^[^\\s]+$`

export const PASSWORD_REGEX_CYRILLIC = `^[^А-я]+$`
