import { jsonProperty, Serializable } from 'ts-serializable'

export class UpdatePasswordDto extends Serializable {
  @jsonProperty(String, null) oldPassword: string | null = null
  @jsonProperty(String, null) newPassword: string | null = null
}
