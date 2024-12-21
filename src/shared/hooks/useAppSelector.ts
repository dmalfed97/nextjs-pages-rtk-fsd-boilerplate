import { useSelector, type TypedUseSelectorHook } from 'react-redux'

import type { RootState } from '~app/providers/StoreProvider/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
