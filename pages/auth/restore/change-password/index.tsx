import type { FC } from 'react'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SSRConfig } from 'next-i18next'

import { appConfig } from '~app/config'
import { ChangePasswordPageContent } from '~pages/ChangePasswordPageContent'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const RestorePasswordPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return <ChangePasswordPageContent />
}

export default RestorePasswordPage
