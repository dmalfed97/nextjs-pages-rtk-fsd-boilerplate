import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { type FC } from 'react'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SSRConfig } from 'next-i18next'

import { appConfig } from '~app/config'
import { ProfilePageContent } from '~pages/ProfilePageContent'
import { AuthorizedRoute } from '~shared/ui/AuthorizedRoute'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const ProfilePage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  return (
    <AuthorizedRoute>
      <ProfilePageContent />
    </AuthorizedRoute>
  )
}

export default ProfilePage
