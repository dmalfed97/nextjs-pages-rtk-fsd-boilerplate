import type { SubCategoryModel } from './SubCategoryModel'

export type CategoryModel = {
  id: string
  slug: string
  name: string | null
  description: string | null
  isShownOnMainPage: boolean
  subCategories: SubCategoryModel[]
}
