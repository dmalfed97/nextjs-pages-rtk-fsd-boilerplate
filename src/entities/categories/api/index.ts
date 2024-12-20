import { HttpApi, type BaseResponseWrapper } from '~shared/api/base'
import { buildParams } from '~shared/utils/buildParams'

import type { CategoryModel } from '../models'

// Query params
export type GetCategoriesListQueryParams = {
  isShownOnMainPage: boolean | null
}

// Requests
const getCategoriesListQuery = (filter: GetCategoriesListQueryParams) => {
  return HttpApi.get<BaseResponseWrapper<CategoryModel[]>>(`categories?${buildParams(filter)}`)
}

export const categoriesApi = {
  getCategoriesListQuery,
}
