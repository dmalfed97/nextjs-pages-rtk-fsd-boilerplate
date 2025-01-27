import { DocumentHeadTags } from '@mui/material-nextjs/v14-pagesRouter'
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter'
import { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'
import React from 'react'

import i18nextConfig from '../next-i18next.config'

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  const currentLocale = props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

  // Renders
  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="manifest" href="/manifest.json" />

        <DocumentHeadTags {...props} />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
