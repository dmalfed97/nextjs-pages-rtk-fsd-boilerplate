import { useDispatch } from 'react-redux'

import type { AppDispatch } from '~app/providers/StoreProvider/store'

const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch
