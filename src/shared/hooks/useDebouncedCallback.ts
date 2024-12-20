import { useRef, useCallback } from 'react'

const useDebouncedCallback = <A, V = void>(callback: (...args: A[]) => V, delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  return useCallback(
    (...args: A[]) => {
      if (timeout.current != null) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}

export default useDebouncedCallback
