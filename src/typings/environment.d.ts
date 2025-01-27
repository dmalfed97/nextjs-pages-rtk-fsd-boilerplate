namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_TYPE: typeof process.env.NODE_ENV
    NEXT_PUBLIC_DEV_API_URL: string
    NEXT_PUBLIC_PROD_API_URL: string
    NEXT_PUBLIC_SENTRY_DSN: string

    NEXT_PUBLIC_APPLE_CLIENT_ID: string
    NEXT_PUBLIC_FACEBOOK_APP_ID: string
    NEXT_PUBLIC_GOOGLE_OAUTH_ID: string
    NEXT_PUBLIC_YANDEX_CLIENT_ID: string
  }
}

export { NodeJS }
