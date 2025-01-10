export type TranslationResources = {
  auth: typeof import('./auth.json')
  common: typeof import('./common.json')
  profile: typeof import('./profile.json')
  validation: typeof import('./validation.json')
}
