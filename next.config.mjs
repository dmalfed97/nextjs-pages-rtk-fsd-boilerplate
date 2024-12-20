// import { withSentryConfig } from '@sentry/nextjs'
// import withBundleAnalyzer from '@next/bundle-analyzer'
// import withPWA from 'next-pwa'
import i18n from './next-i18next.config.js'

// const withPWAConfigured = withPWA({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   runtimeCaching: [
//     {
//       urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'google-fonts',
//         expiration: {
//           maxEntries: 4,
//           maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
//         },
//       },
//     },
//   ],
// })

export default (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    ...defaultConfig,

    i18n: {
      ...i18n.i18n,
      localeDetection: false,
    },

    // Can cause problems in case of loading data on page on SSR step (If you clear redux state on page unmount)
    // reactStrictMode: true,

    swcMinify: true,
    experimental: {
      appDir: false,
      typedRoutes: true,
      optimizePackageImports: [
        'date-fns',
        'reactjs-social-login',
        '@mui/material',
        '@mui/material-nextjs',
        '@mui/icons-material',
        '@mui/lab',
        '@mui/x-date-pickers'
      ]
    },

    env: {
      NEXT_PUBLIC_SERVER_TYPE: process.env.NODE_ENV,

      NEXT_PUBLIC_DEV_API_URL: process.env.NEXT_PUBLIC_DEV_API_URL,
      NEXT_PUBLIC_PROD_API_URL: process.env.NEXT_PUBLIC_PROD_API_URL,

      NEXT_PUBLIC_GOOGLE_OAUTH_ID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
      NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      NEXT_PUBLIC_APPLE_CLIENT_ID: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
    },

    images: {
      remotePatterns: [],
    },

    async redirects() {
      return [
        {
          source: '/auth',
          destination: '/auth/login',
          permanent: true,
        },
      ]
    },
  }

  return config

  // return withSentryConfig(withBundleAnalyzer({
  //   enabled: process.env.ANALYZE === 'true',
  //   openAnalyzer: process.env.ANALYZE === 'true',
  // })(config))
}
