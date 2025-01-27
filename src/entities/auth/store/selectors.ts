import useAppSelector from '~shared/hooks/useAppSelector'

export const useAccessToken = () => useAppSelector((store) => store.auth.data.accessToken)
export const useAccessTokenExpiresAt = () => useAppSelector((store) => store.auth.data.expiresAt)
export const useUploadingStatus = () => useAppSelector((store) => store.auth.uploadingStatus)
export const useConfirmationStatus = () => useAppSelector((store) => store.auth.confirmationStatus)
