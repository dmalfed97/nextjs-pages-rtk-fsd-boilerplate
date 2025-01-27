export const getFingerprint = async () => {
  const FingerprintJS = await import('@fingerprintjs/fingerprintjs')

  const fp = await FingerprintJS.load()

  return await fp.get()
}
