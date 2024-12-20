import { jsonProperty, Serializable } from 'ts-serializable'

export class LoginDto extends Serializable {
  @jsonProperty(String, null) email: string | null = null
  @jsonProperty(String, null) password: string | null = null
  @jsonProperty(String, null) fingerprint: string | null = null
}
