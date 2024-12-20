/**
 * Function to decode JWT token
 * @description Don't forget to wrap with try-catch
 */
interface JWTData {
  [key: string]: string
}

export const parseJWTData = (accessToken: string): JWTData => {
  const payload = accessToken.split('.')[1]

  try {
    const decodedData = JSON.parse(atob(payload))
    return decodedData as JWTData
  } catch (error) {
    console.log(error)
    throw new Error('Invalid JWT token')
  }
}
