export function buildParams<
  T extends Record<string, string | string[] | number | number[] | boolean | null | undefined>,
>(filter: T) {
  let resultString = ''

  if (Object.keys(filter).length) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((arrayItem) => {
            resultString += `&${key}=${arrayItem}`
          })
        } else {
          if (value !== '' && value !== false) {
            resultString += `&${key}=${String(value)}`
          }
        }
      }
    })
  }

  return resultString
}
