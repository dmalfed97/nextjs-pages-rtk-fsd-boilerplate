import React, { type FC } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// @ts-expect-error Тип не доходит
import type { GetStaticPagePropsResult, GetStaticProps } from 'next'

import { appConfig } from '~app/config'
import { ProfilePageContent } from '~pages/ProfilePageContent'
import { AuthorizedRoute } from '~shared/ui/AuthorizedRoute'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const ProfilePage: FC<GetStaticPagePropsResult> = () => {
  return (
    <AuthorizedRoute>
      <ProfilePageContent />
    </AuthorizedRoute>
  )
}

export default ProfilePage
