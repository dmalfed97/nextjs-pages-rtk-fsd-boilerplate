import React, { type FC } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SSRConfig } from 'next-i18next'

import { appConfig } from '~app/config'
import { SignUpConfirmPageContent } from '~pages/SignUpConfirmPageContent'
import { UnauthorizedRoute } from '~shared/ui/UnauthorizedRoute'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const SignUpConfirmPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return (
    <UnauthorizedRoute>
      <SignUpConfirmPageContent />
    </UnauthorizedRoute>
  )
}

export default SignUpConfirmPage
