interface InputObject {
  [key: string]: string
}

interface OutputObject {
  [key: string]: string
}

export const decodeFilterParams = (query: InputObject): OutputObject => {
  const transformedObj: OutputObject = {}

  for (const key in query) {
    if (key.startsWith('filter[') && key.endsWith(']')) {
      const newKey = key.substring(7, key.length - 1)

      transformedObj[newKey] = query[key]
    }
  }
  return transformedObj
}
