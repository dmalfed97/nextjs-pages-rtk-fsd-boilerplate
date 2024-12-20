import type { FC } from 'react'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SSRConfig } from 'next-i18next'

import { appConfig } from '~app/config'
import { SignUpPageContent } from '~pages/SignUpPageContent'
import { UnauthorizedRoute } from '~shared/ui/UnauthorizedRoute'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const SignInPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return (
    <UnauthorizedRoute>
      <SignUpPageContent />
    </UnauthorizedRoute>
  )
}

export default SignInPage
