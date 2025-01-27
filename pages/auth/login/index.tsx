import type { GetServerSidePropsResult, GetServerSideProps } from 'next'
import type { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { type FC } from 'react'

import { appConfig } from '~app/config'
import { LoginPageContent } from '~pages/LoginPageContent'
import { UnauthorizedRoute } from '~shared/ui/UnauthorizedRoute'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const LoginPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return (
    <UnauthorizedRoute>
      <LoginPageContent />
    </UnauthorizedRoute>
  )
}

export default LoginPage
