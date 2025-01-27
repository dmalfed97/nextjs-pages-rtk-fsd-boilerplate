import { jsonProperty, Serializable } from 'ts-serializable'

export class RefreshTokensDto extends Serializable {
  @jsonProperty(String, null) refreshToken: string | null = null
  @jsonProperty(String, null) fingerprint: string | null = null
}
