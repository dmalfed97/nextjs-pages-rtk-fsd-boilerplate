import { jsonProperty, Serializable } from 'ts-serializable'

export class ChangeEmailDto extends Serializable {
  @jsonProperty(String, null) newEmail: string | null = null
}
