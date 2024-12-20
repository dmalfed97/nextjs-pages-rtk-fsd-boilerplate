import React from 'react'
import type { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { CssBaseline } from '@mui/material'
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter'
import { Toaster } from 'react-hot-toast'
import 'reflect-metadata'

import { AuthProvider } from '~app/providers/Auth'
import { BaseLayout } from '~layouts/BaseLayout'
import { MuiProvider } from '~app/providers/MuiProvider'
import { storeWrapper } from '~app/providers/StoreProvider/store'
import { DeviceProvider } from '~app/providers/Device'

const App = ({ Component, pageProps, userAgent }: AppProps & { userAgent: string }) => {
  const {
    store,
    props: { emotionCache },
  } = storeWrapper.useWrappedStore({ pageProps })

  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <Head>
        <title>NEW PROJECT</title>
      </Head>

      <MuiProvider>
        <Provider store={store}>
          <AuthProvider>
            <DeviceProvider userAgent={userAgent}>
              <CssBaseline />

              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>

              <Toaster
                position="top-right"
                containerStyle={{
                  zIndex: 99999999,
                }}
                reverseOrder={false}
              />
            </DeviceProvider>
          </AuthProvider>
        </Provider>
      </MuiProvider>
    </AppCacheProvider>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  let pageProps = {}

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    props: {
      ...pageProps,
      userAgent: appContext.ctx.req
        ? appContext.ctx.req.headers['user-agent'] || ''
        : navigator.userAgent,
    },
  }
}

export default appWithTranslation(App)
