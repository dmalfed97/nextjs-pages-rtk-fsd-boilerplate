export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: unknown[]) => void {
  let inThrottle = false
  let lastFunc: ReturnType<typeof setTimeout> | undefined
  let lastRan: number | undefined

  return function (this: ThisParameterType<T>, ...args: unknown[]): void {
    if (!inThrottle) {
      func.apply(this, args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (lastRan === undefined || Date.now() - lastRan >= delay) {
            func.apply(this, args)
            lastRan = Date.now()
          }
        },
        Math.max(delay - (Date.now() - (lastRan ?? 0)), 0)
      )
    }
  }
}
