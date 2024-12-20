import type { FC } from 'react'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSidePropsResult, GetServerSideProps } from 'next'
import type { SSRConfig } from 'next-i18next'

import { appConfig } from '~app/config'
import { RestorePasswordRequestPageContent } from '~pages/RestorePasswordRequestPageContent'
import { UnauthorizedRoute } from '~shared/ui/UnauthorizedRoute'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const RestorePasswordRequestPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return (
    <UnauthorizedRoute>
      <RestorePasswordRequestPageContent />
    </UnauthorizedRoute>
  )
}

export default RestorePasswordRequestPage
