import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SSRConfig } from 'next-i18next'
import React, { type FC } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import { storeWrapper } from '~app/providers/StoreProvider/store'
import { appConfig } from '~app/config'
// import { CategoriesSchema, categoriesApi, categoriesStore, type CategoryModel } from '~entities/categories'
// import { ListLoadingStatus } from '~shared/types/loadingStatus'
// import { HttpApi } from '~shared/api/base'
// import type { LanguageEnum } from '~shared/types/language'

//
// EXAMPLE of usage with server-side data loading
//

// interface MainPageProps extends SSRConfig {
//   categories: CategoryModel[]
// }
//
// export const getServerSideProps: GetServerSideProps<MainPageProps> =
//   storeWrapper.getServerSideProps((storeWrapper) => async ({ locale }) => {
//     let categories: CategoryModel[] = []
//
//     if (locale) {
//       HttpApi.setLanguage(locale as LanguageEnum)
//     }
//
//     try {
//       const response = await categoriesApi.getCategoriesListQuery({ isShownOnMainPage: true })
//
//       categories = response.data.data
//
//       storeWrapper.dispatch(categoriesStore.setCategories(categories))
//     } catch (error) {
//       storeWrapper.dispatch(categoriesStore.setListLoadingStatus(ListLoadingStatus.FAIL))
//     }
//
//     return {
//       props: {
//         ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
//         categories,
//       },
//     }
//   })

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || appConfig.defaultLanguage)),
    },
  }
}

const MainPage: FC<GetServerSidePropsResult<SSRConfig>> = () => {
  // Renders
  return <>Main page content</>
}

export default MainPage
