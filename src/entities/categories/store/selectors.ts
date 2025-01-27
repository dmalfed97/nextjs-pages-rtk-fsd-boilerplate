import useAppSelector from '~shared/hooks/useAppSelector'

export const useCategoriesList = () => useAppSelector((store) => store.categories.categories)

export const useCategoriesOptionsList = () =>
  useAppSelector((store) => store.categories.categoriesOptions)
