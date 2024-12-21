import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { type FC } from 'react'

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

const SignUpPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return (
    <UnauthorizedRoute>
      <SignUpPageContent />
    </UnauthorizedRoute>
  )
}

export default SignUpPage
