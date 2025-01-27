import useAppSelector from '~shared/hooks/useAppSelector'

export const useCurrentUser = () => useAppSelector((store) => store.currentUser.currentUser)
export const useLoadingStatus = () => useAppSelector((store) => store.currentUser.loadingStatus)
export const useUploadingStatus = () => useAppSelector((store) => store.currentUser.uploadingStatus)
