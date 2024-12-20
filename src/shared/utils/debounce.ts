export function debounce<T extends (...args: unknown[]) => void>(
  this: ThisParameterType<T>,
  fn: T,
  delay = 300
): (...args: unknown[]) => void {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
