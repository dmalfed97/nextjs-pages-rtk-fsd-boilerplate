import { configureStore, combineSlices } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { authStore } from '~entities/auth'
import { categoriesStore } from '~entities/categories'
import { currentUserStore } from '~entities/currentUser'
// import { settingsStore } from '~entities/settings'

export interface LazyLoadedSlices {}

export const rootReducer = combineSlices(
  authStore.authSlice,
  categoriesStore.categoriesSlice,
  currentUserStore.currentUserSlice
  // settingsStore.settingsSlice, // Not used yet
).withLazyLoadedSlices<LazyLoadedSlices>()

const makeStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const storeWrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
})
