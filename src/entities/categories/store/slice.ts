import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { ListLoadingStatus } from '~shared/types/loadingStatus'

import { type GetCategoriesListQueryParams, categoriesApi } from '../api'
import type { CategoryModel } from '../models'

interface ICategoriesSlice {
  categories: CategoryModel[]
  categoriesOptions: CategoryModel[]
  listLoadingStatus: ListLoadingStatus
}

const initialState = (): ICategoriesSlice => ({
  categories: [],
  categoriesOptions: [],
  listLoadingStatus: ListLoadingStatus.IDLE,
})

export const getCategoriesOptionsListAction = createAsyncThunk(
  'getCategoriesOptionsList',
  async (filter: GetCategoriesListQueryParams) => {
    const response = await categoriesApi.getCategoriesListQuery(filter)

    return {
      data: response.data.data,
      success: response.data.success,
    }
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState(),
  reducers: {
    setCategories: (state, { payload }: PayloadAction<CategoryModel[]>) => {
      state.categories = payload
    },
    setListLoadingStatus: (state, { payload }: PayloadAction<ListLoadingStatus>) => {
      state.listLoadingStatus = payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Hydrate
      // @ts-expect-error https://github.com/kirill-konshin/next-redux-wrapper/issues/558
      .addCase(HYDRATE, (state, { payload }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (payload.categories) {
          return {
            ...state,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            categories: payload.categories.categories,
          } as ICategoriesSlice
        }
      })

      // getCategoriesOptionsList
      .addCase(getCategoriesOptionsListAction.pending, (state) => {
        state.listLoadingStatus = ListLoadingStatus.FETCHING
      })
      .addCase(getCategoriesOptionsListAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.categoriesOptions = payload.data
          state.listLoadingStatus = ListLoadingStatus.SUCCESS
        } else {
          state.listLoadingStatus = ListLoadingStatus.FAIL
        }
      })
      .addCase(getCategoriesOptionsListAction.rejected, (state) => {
        state.listLoadingStatus = ListLoadingStatus.FAIL
      })
  },
})

export const { setCategories, setListLoadingStatus } = categoriesSlice.actions
