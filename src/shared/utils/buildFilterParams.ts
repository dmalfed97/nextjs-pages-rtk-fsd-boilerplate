export function buildFilterParams<
  T extends Record<string, string | string[] | number | number[] | boolean | null | undefined>,
>(filter: T) {
  let resultString = ''

  if (Object.keys(filter).length) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((arrayItem) => {
            resultString += `&filter[${key}]=${arrayItem}`
          })
        } else {
          if (value !== '' && value !== false) {
            resultString += `&filter[${key}]=${String(value)}`
          }
        }
      }
    })
  }

  return resultString
}
