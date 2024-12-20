import { jsonProperty, Serializable } from 'ts-serializable'

export class LogoutDto extends Serializable {
  @jsonProperty(String, null) refreshToken: string | null = null
}
