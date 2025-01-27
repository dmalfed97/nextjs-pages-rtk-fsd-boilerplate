import { jsonProperty, Serializable } from 'ts-serializable'

export class RestorePasswordDto extends Serializable {
  @jsonProperty(String, null) resetPasswordToken: string | null = null
  @jsonProperty(String, null) password: string | null = null
}
